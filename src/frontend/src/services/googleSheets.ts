import { loadConfig } from "../config";
import type { Order } from "../context/AppContext";

type JsonpResponse<T> = {
  ok: boolean;
  error?: string;
} & T;

type RemoteOrder = Partial<Order> & {
  orderId?: string;
  quantity?: number | string;
};

type OrderUpdate = Pick<
  Order,
  | "status"
  | "paymentStatus"
  | "paymentReference"
  | "razorpayPaymentId"
  | "razorpayOrderId"
>;

const VISITOR_ID_KEY = "megabags_visitor_id";
const SESSION_ID_KEY = "megabags_session_id";

function normalizeRuntimeValue(value?: string): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed && trimmed !== "undefined" ? trimmed : undefined;
}

async function getSheetsConfig(options?: { requireAdminKey?: boolean }) {
  const config = await loadConfig();
  const webhookUrl = normalizeRuntimeValue(config.google_sheets_webhook_url);
  const adminKey = normalizeRuntimeValue(config.google_sheets_admin_key);

  if (!webhookUrl) {
    return null;
  }

  if (options?.requireAdminKey && !adminKey) {
    throw new Error(
      "Google Sheets admin key missing hai. env.json me google_sheets_admin_key set kijiye.",
    );
  }

  return { webhookUrl, adminKey };
}

function safeStorageGet(storage: Storage, key: string) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(storage: Storage, key: string, value: string) {
  try {
    storage.setItem(key, value);
  } catch {}
}

function createClientId(prefix: string) {
  const uuid =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.round(Math.random() * 1_000_000)}`;

  return `${prefix}-${uuid}`;
}

function getTrackingIds() {
  const existingVisitorId = safeStorageGet(localStorage, VISITOR_ID_KEY);
  const existingSessionId = safeStorageGet(sessionStorage, SESSION_ID_KEY);

  const visitorId = existingVisitorId || createClientId("visitor");
  const sessionId = existingSessionId || createClientId("session");

  if (!existingVisitorId) {
    safeStorageSet(localStorage, VISITOR_ID_KEY, visitorId);
  }

  if (!existingSessionId) {
    safeStorageSet(sessionStorage, SESSION_ID_KEY, sessionId);
  }

  return { visitorId, sessionId };
}

function buildUrl(baseUrl: string, params: Record<string, string>) {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
}

async function postWebhook(payload: object) {
  const config = await getSheetsConfig();
  if (!config) {
    return false;
  }

  const body = JSON.stringify(payload);
  const blob = new Blob([body], {
    type: "text/plain;charset=UTF-8",
  });

  try {
    if (navigator.sendBeacon?.(config.webhookUrl, blob)) {
      return true;
    }

    await fetch(config.webhookUrl, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body,
    });

    return true;
  } catch {
    return false;
  }
}

async function jsonpRequest<T>(params: Record<string, string>) {
  const config = await getSheetsConfig();
  if (!config) {
    throw new Error("Google Sheets webhook abhi configure nahi hua hai.");
  }

  return new Promise<JsonpResponse<T>>((resolve, reject) => {
    const callbackName = `megabagsSheetsCallback_${Date.now()}_${Math.round(
      Math.random() * 1_000,
    )}`;
    const globalWindow = window as unknown as Record<string, unknown>;
    const script = document.createElement("script");

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      script.remove();
      delete globalWindow[callbackName];
    };

    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error("Google Sheets se response aane me zyada time lag gaya."));
    }, 15_000);

    globalWindow[callbackName] = (payload: JsonpResponse<T>) => {
      cleanup();
      resolve(payload);
    };

    script.async = true;
    script.src = buildUrl(config.webhookUrl, {
      ...params,
      callback: callbackName,
    });
    script.onerror = () => {
      cleanup();
      reject(new Error("Google Sheets connection load nahi ho paya."));
    };

    document.body.appendChild(script);
  });
}

function normalizeOrder(remoteOrder: RemoteOrder | null | undefined): Order | null {
  if (!remoteOrder?.orderId) {
    return null;
  }

  return {
    orderId: remoteOrder.orderId.toUpperCase(),
    customerName: remoteOrder.customerName ?? "",
    phone: remoteOrder.phone ?? "",
    email: remoteOrder.email ?? "",
    productName: remoteOrder.productName ?? "",
    quantity: Number(remoteOrder.quantity ?? 0),
    address: remoteOrder.address ?? "",
    notes: remoteOrder.notes ?? "",
    status:
      remoteOrder.status === "Processing" ||
      remoteOrder.status === "Dispatched" ||
      remoteOrder.status === "Delivered"
        ? remoteOrder.status
        : "Order Placed",
    paymentMethod:
      remoteOrder.paymentMethod === "Razorpay" ? "Razorpay" : "Google Pay",
    paymentStatus: remoteOrder.paymentStatus === "Paid" ? "Paid" : "Pending",
    paymentReference: remoteOrder.paymentReference || undefined,
    razorpayPaymentId: remoteOrder.razorpayPaymentId || undefined,
    razorpayOrderId: remoteOrder.razorpayOrderId || undefined,
    createdAt: remoteOrder.createdAt ?? new Date().toISOString(),
  };
}

export async function logWebsiteVisit(pagePath: string) {
  const { visitorId, sessionId } = getTrackingIds();

  return postWebhook({
    action: "logVisit",
    visit: {
      visitorId,
      sessionId,
      pagePath,
      pageTitle: document.title || "Mega Bags",
      pageUrl: window.location.href,
      referrer: document.referrer || "",
      language: navigator.language || "",
      screenSize: `${window.screen.width}x${window.screen.height}`,
      userAgent: navigator.userAgent,
      visitedAt: new Date().toISOString(),
    },
  });
}

export async function saveOrderToGoogleSheets(order: Order) {
  const { visitorId, sessionId } = getTrackingIds();

  return postWebhook({
    action: "createOrder",
    order: {
      ...order,
      visitorId,
      sessionId,
      lastEvent: "Order Created",
      updatedAt: new Date().toISOString(),
    },
  });
}

export async function updateOrderInGoogleSheets(
  orderId: string,
  updates: Partial<OrderUpdate>,
) {
  const config = await getSheetsConfig({ requireAdminKey: true });
  if (!config) {
    throw new Error("Google Sheets webhook abhi configure nahi hua hai.");
  }

  return postWebhook({
    action: "updateOrder",
    adminKey: config.adminKey,
    orderId,
    updates: {
      ...updates,
      updatedAt: new Date().toISOString(),
    },
  });
}

export async function findOrderInGoogleSheets(orderId: string) {
  const normalizedOrderId = orderId.trim().toUpperCase();
  if (!normalizedOrderId) {
    return null;
  }

  try {
    const response = await jsonpRequest<{ order?: RemoteOrder | null }>({
      action: "trackOrder",
      orderId: normalizedOrderId,
    });

    if (!response.ok) {
      throw new Error(response.error || "Order lookup failed.");
    }

    return normalizeOrder(response.order);
  } catch (error) {
    console.warn("Track order lookup failed", error);
    return null;
  }
}

export async function fetchAllOrdersFromGoogleSheets() {
  const config = await getSheetsConfig({ requireAdminKey: true });
  if (!config) {
    throw new Error("Google Sheets webhook abhi configure nahi hua hai.");
  }

  const response = await jsonpRequest<{ orders?: RemoteOrder[] }>({
    action: "listOrders",
    adminKey: config.adminKey as string,
  });

  if (!response.ok) {
    throw new Error(response.error || "Orders fetch nahi ho paaye.");
  }

  return (response.orders ?? [])
    .map((order) => normalizeOrder(order))
    .filter((order): order is Order => order !== null);
}

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  fetchAllOrdersFromGoogleSheets,
  rememberVisitorEmail,
  saveOrderToGoogleSheets,
  updateOrderInGoogleSheets,
} from "../services/googleSheets";

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  images: string[];
  specs: string;
  applications: string;
  category: string;
}

export interface Order {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  productName: string;
  quantity: number;
  address: string;
  notes: string;
  status: "Order Placed" | "Processing" | "Dispatched" | "Delivered";
  paymentMethod: "Razorpay" | "Google Pay";
  paymentStatus: "Paid" | "Pending";
  paymentReference?: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  createdAt: string;
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Valve Paper Bags",
    description:
      "High-quality valve paper bags ideal for cement, chemicals, and powder products. Features self-closing valve for easy filling.",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
      "https://images.unsplash.com/photo-1581093458791-9d15482442f6?w=1200&q=80",
      "https://images.unsplash.com/photo-1586880244386-8b3c1f5a13b6?w=1200&q=80",
    ],
    specs:
      "Layers: 2-5 | Weight: 50-100 gsm | Size: Custom | Valve Type: Pasted/Sewn",
    applications: "Cement, Chemicals, Fertilizers, Animal Feed, Flour, Starch",
    category: "valve",
  },
  {
    id: "2",
    name: "Open Mouth Paper Bags",
    description:
      "Versatile open-mouth bags for easy packing of granular materials. Available in various sizes with customizable printing.",
    imageUrl:
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=1200&q=80",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200&q=80",
    ],
    specs:
      "Layers: 1-4 | Weight: 60-120 gsm | Size: 5kg-50kg | Closure: Sewn/Glued",
    applications: "Sugar, Salt, Grains, Seeds, Powders, Pellets",
    category: "open-mouth",
  },
  {
    id: "3",
    name: "Multiwall Paper Bags",
    description:
      "Heavy-duty multiwall construction for maximum strength and moisture resistance. Perfect for bulk industrial packaging.",
    imageUrl:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=1200&q=80",
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=1200&q=80",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&q=80",
    ],
    specs:
      "Layers: 3-6 | Burst Strength: 200+ kPa | Size: 10kg-50kg | Inner: PE liner optional",
    applications:
      "Building Materials, Chemicals, Minerals, Agricultural Products",
    category: "multiwall",
  },
  {
    id: "4",
    name: "HDPE Laminated Paper Bags",
    description:
      "Premium HDPE laminated bags providing superior moisture barrier and durability for sensitive materials.",
    imageUrl:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80",
      "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=1200&q=80",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200&q=80",
    ],
    specs:
      "HDPE Coating: 15-25 gsm | Base Paper: 80-120 gsm | Lamination: Both sides | UV resistant",
    applications:
      "Fertilizers, Soil Amendments, Hazardous Chemicals, Food Ingredients",
    category: "laminated",
  },
  {
    id: "5",
    name: "Aluminium Foil Bags",
    description:
      "Specialized aluminium foil bags for moisture-sensitive and aroma-preserving applications with excellent barrier properties.",
    imageUrl:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1200&q=80",
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1200&q=80",
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&q=80",
    ],
    specs:
      "Foil Thickness: 7-12 microns | Layers: 3-5 | Barrier: O2, moisture, light | Heat sealable",
    applications:
      "Coffee, Tea, Spices, Pharmaceutical Powders, Electronic Components",
    category: "foil",
  },
];

function isLegacyGeneratedAsset(url?: string) {
  return typeof url === "string" && url.startsWith("/assets/generated/");
}

interface AppContextType {
  products: Product[];
  orders: Order[];
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  addOrder: (o: Omit<Order, "orderId" | "status" | "createdAt">) => string;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  updateOrderPayment: (
    orderId: string,
    paymentStatus: Order["paymentStatus"],
    paymentReference?: string,
  ) => void;
  getOrder: (orderId: string) => Order | undefined;
  syncOrdersFromSheet: () => Promise<number>;
}

const AppContext = createContext<AppContextType | null>(null);

function mergeOrders(currentOrders: Order[], incomingOrders: Order[]) {
  const merged = new Map<string, Order>();

  currentOrders.forEach((order) => {
    merged.set(order.orderId, order);
  });

  incomingOrders.forEach((order) => {
    merged.set(order.orderId, order);
  });

  return Array.from(merged.values()).sort((a, b) => {
    if (a.createdAt === b.createdAt) return 0;
    return a.createdAt < b.createdAt ? -1 : 1;
  });
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem("megabags_products");
      if (stored) {
        const parsed: Product[] = JSON.parse(stored);
        // Migrate legacy local image paths and ensure images array exists.
        const migrated = parsed.map((p, i) => ({
          ...p,
          imageUrl: isLegacyGeneratedAsset(p.imageUrl)
            ? (DEFAULT_PRODUCTS[i]?.imageUrl ?? p.imageUrl)
            : p.imageUrl,
          images: p.images?.length
            ? p.images.map((img, imgIndex) =>
                isLegacyGeneratedAsset(img)
                  ? (DEFAULT_PRODUCTS[i]?.images?.[imgIndex] ??
                    DEFAULT_PRODUCTS[i]?.imageUrl ??
                    p.imageUrl)
                  : img,
              )
            : (DEFAULT_PRODUCTS[i]?.images ?? [p.imageUrl]),
        }));
        return migrated;
      }
    } catch {}
    return DEFAULT_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem("megabags_orders");
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<Order>[];
        // Migration: ensure payment fields exist for older saved orders.
        return parsed.map((o) => ({
          ...(o as Order),
          paymentMethod:
            o.paymentMethod ??
            (o.razorpayPaymentId || o.razorpayOrderId
              ? "Razorpay"
              : "Google Pay"),
          paymentStatus:
            o.paymentStatus ?? (o.razorpayPaymentId ? "Paid" : "Pending"),
          paymentReference:
            o.paymentReference ?? o.razorpayPaymentId ?? undefined,
        }));
      }
    } catch {}
    return [];
  });

  useEffect(() => {
    localStorage.setItem("megabags_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("megabags_orders", JSON.stringify(orders));
  }, [orders]);

  const addProduct = (p: Omit<Product, "id">) => {
    const id = Date.now().toString();
    setProducts((prev) => [...prev, { ...p, id }]);
  };

  const updateProduct = (p: Product) => {
    setProducts((prev) => prev.map((x) => (x.id === p.id ? p : x)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((x) => x.id !== id));
  };

  const generateOrderId = (existingOrders: Order[]) => {
    let orderId = "";
    do {
      orderId = `MB${Date.now().toString().slice(-6)}${Math.floor(
        10 + Math.random() * 90,
      )}`;
    } while (existingOrders.some((order) => order.orderId === orderId));
    return orderId;
  };

  const addOrder = (o: Omit<Order, "orderId" | "status" | "createdAt">) => {
    const orderId = generateOrderId(orders);
    const newOrder: Order = {
      ...o,
      orderId,
      status: "Order Placed",
      createdAt: new Date().toISOString(),
    };

    rememberVisitorEmail(newOrder.email);
    setOrders((prev) => [...prev, newOrder]);
    void saveOrderToGoogleSheets(newOrder).catch((error) => {
      console.warn("Order could not be saved to Google Sheets.", error);
    });

    return orderId;
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status } : o)),
    );

    void updateOrderInGoogleSheets(orderId, {
      status,
    }).catch((error) => {
      console.warn("Order status could not be updated in Google Sheets.", error);
    });
  };

  const updateOrderPayment = (
    orderId: string,
    paymentStatus: Order["paymentStatus"],
    paymentReference?: string,
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId
          ? {
              ...order,
              paymentStatus,
              paymentReference:
                paymentReference === undefined
                  ? order.paymentReference
                  : paymentReference,
            }
          : order,
      ),
    );

    void updateOrderInGoogleSheets(orderId, {
      paymentStatus,
      paymentReference,
    }).catch((error) => {
      console.warn("Order payment could not be updated in Google Sheets.", error);
    });
  };

  const getOrder = (orderId: string) =>
    orders.find((o) => o.orderId === orderId);

  const syncOrdersFromSheet = async () => {
    const remoteOrders = await fetchAllOrdersFromGoogleSheets();
    setOrders((prev) => mergeOrders(prev, remoteOrders));
    return remoteOrders.length;
  };

  return (
    <AppContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        updateOrderPayment,
        getOrder,
        syncOrdersFromSheet,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

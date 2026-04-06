import { Check, LogOut, Pencil, Plus, RefreshCw, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import type { Order, Product } from "../context/AppContext";

const ADMIN_USER = "admin";
const ADMIN_PASS = "megabags@123";

const STATUS_OPTIONS: Order["status"][] = [
  "Order Placed",
  "Processing",
  "Dispatched",
  "Delivered",
];

const PAYMENT_STATUS_OPTIONS: Order["paymentStatus"][] = ["Pending", "Paid"];

export default function Admin() {
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateOrderPayment,
    syncOrdersFromSheet,
  } = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem("megabags_admin") === "1",
  );
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSyncingOrders, setIsSyncingOrders] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");
  const [pForm, setPForm] = useState({
    name: "",
    imageUrl: "",
    description: "",
    specs: "",
    applications: "",
    category: "",
  });

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      loginForm.username === ADMIN_USER &&
      loginForm.password === ADMIN_PASS
    ) {
      sessionStorage.setItem("megabags_admin", "1");
      setIsLoggedIn(true);
      setTab("orders");
      void handleRemoteSync();
      return;
    }
    setLoginError("Invalid username or password");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("megabags_admin");
    setIsLoggedIn(false);
  };

  const openAddForm = () => {
    setPForm({
      name: "",
      imageUrl: "",
      description: "",
      specs: "",
      applications: "",
      category: "",
    });
    setEditingProduct(null);
    setShowAddForm(true);
  };

  const openEditForm = (product: Product) => {
    const images = product.images?.length
      ? product.images
      : product.imageUrl
        ? [product.imageUrl]
        : [];

    setPForm({
      name: product.name,
      imageUrl: images.join(", "),
      description: product.description,
      specs: product.specs,
      applications: product.applications,
      category: product.category,
    });
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleSaveProduct = () => {
    if (!pForm.name) return;

    const imageList = pForm.imageUrl
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    const mainImage = imageList[0] ?? "";

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...pForm,
        imageUrl: mainImage,
        images: imageList,
      });
    } else {
      addProduct({
        ...pForm,
        imageUrl: mainImage,
        images: imageList,
      });
    }

    setShowAddForm(false);
    setEditingProduct(null);
  };

  const statusColor = (status: Order["status"]) => {
    if (status === "Delivered") return "bg-green-100 text-green-700";
    if (status === "Dispatched") return "bg-blue-100 text-blue-700";
    if (status === "Processing") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  const paymentStatusColor = (status: Order["paymentStatus"]) => {
    return status === "Paid"
      ? "bg-green-100 text-green-700"
      : "bg-amber-100 text-amber-800";
  };

  const handleRemoteSync = async () => {
    setIsSyncingOrders(true);
    setSyncMessage("");

    try {
      const syncedOrders = await syncOrdersFromSheet();
      setSyncMessage(
        syncedOrders > 0
          ? `${syncedOrders} orders were synced from Google Sheets.`
          : "Google Sheets is connected, but no order records were found yet.",
      );
    } catch (error) {
      setSyncMessage(
        error instanceof Error
          ? error.message
          : "Google Sheets sync could not be completed.",
      );
    } finally {
      setIsSyncingOrders(false);
    }
  };

  if (!isLoggedIn)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0E5A7A]">
              <span className="text-2xl font-black text-white">M</span>
            </div>
            <h1 className="text-xl font-black text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-400">Mega Bags Management</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-username"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                value={loginForm.username}
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    username: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30"
                placeholder="admin"
              />
            </div>
            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30"
                placeholder="Enter password"
              />
            </div>
            {loginError && <p className="text-sm text-red-500">{loginError}</p>}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#0E5A7A] py-3 font-bold text-white transition-colors hover:bg-[#0A4A66]"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between bg-[#0E5A7A] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F97316] font-black text-white">
            M
          </div>
          <div>
            <span className="font-black text-white">MEGA BAGS</span>
            <span className="ml-2 text-xs text-white/60">Admin Panel</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-white/80 hover:text-white"
        >
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8 flex gap-3">
          {(["products", "orders"] as const).map((currentTab) => (
            <button
              type="button"
              key={currentTab}
              onClick={() => {
                setTab(currentTab);
                if (currentTab === "orders") {
                  void handleRemoteSync();
                }
              }}
              className={`rounded-lg px-6 py-2.5 font-semibold capitalize transition-colors ${
                tab === currentTab
                  ? "bg-[#0E5A7A] text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {currentTab}{" "}
              {currentTab === "products"
                ? `(${products.length})`
                : `(${orders.length})`}
            </button>
          ))}
        </div>

        {tab === "products" && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900">
                Product Management
              </h2>
              <button
                type="button"
                onClick={openAddForm}
                className="flex items-center gap-2 rounded-lg bg-[#2DBE6C] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#26A85E]"
              >
                <Plus size={16} /> Add Product
              </button>
            </div>

            {showAddForm && (
              <div className="mb-4 rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {(
                    [
                      "name",
                      "imageUrl",
                      "category",
                      "specs",
                      "applications",
                    ] as const
                  ).map((field) => (
                    <div key={field}>
                      <label
                        htmlFor={`pform-${field}`}
                        className="mb-1 block text-xs font-semibold uppercase text-gray-500"
                      >
                        {field === "imageUrl"
                          ? "Image URLs (comma separated)"
                          : field}
                      </label>
                      <input
                        id={`pform-${field}`}
                        type="text"
                        value={pForm[field]}
                        onChange={(event) =>
                          setPForm((prev) => ({
                            ...prev,
                            [field]: event.target.value,
                          }))
                        }
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="pform-description"
                      className="mb-1 block text-xs font-semibold uppercase text-gray-500"
                    >
                      Description
                    </label>
                    <textarea
                      id="pform-description"
                      rows={3}
                      value={pForm.description}
                      onChange={(event) =>
                        setPForm((prev) => ({
                          ...prev,
                          description: event.target.value,
                        }))
                      }
                      className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProduct}
                    className="flex items-center gap-2 rounded-lg bg-[#0E5A7A] px-4 py-2 text-sm font-semibold text-white"
                  >
                    <Check size={16} /> Save
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-gray-900">
                      {product.name}
                    </div>
                    <div className="truncate text-sm text-gray-400">
                      {product.description}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEditForm(product)}
                      className="rounded-lg p-2 text-[#0E5A7A] hover:bg-blue-50"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProduct(product.id)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  Order Management ({orders.length} orders)
                </h2>
                <p className="text-sm text-gray-500">
                  New online orders and tracking updates can be synced from
                  Google Sheets here.
                </p>
              </div>
              <button
                type="button"
                onClick={() => void handleRemoteSync()}
                disabled={isSyncingOrders}
                className="inline-flex items-center gap-2 rounded-lg border border-[#0E5A7A] px-4 py-2 text-sm font-semibold text-[#0E5A7A] transition-colors hover:bg-[#0E5A7A] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={16}
                  className={isSyncingOrders ? "animate-spin" : ""}
                />
                {isSyncingOrders ? "Syncing..." : "Refresh from Sheet"}
              </button>
            </div>
            {syncMessage && (
              <div className="mb-4 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
                {syncMessage}
              </div>
            )}
            {orders.length === 0 ? (
              <div className="py-16 text-center text-gray-400">
                <p>No orders yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[...orders].reverse().map((order) => (
                  <div
                    key={order.orderId}
                    className="rounded-xl border border-gray-200 bg-white p-5"
                  >
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-lg font-black text-gray-900">
                          {order.orderId}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-bold ${statusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-bold ${paymentStatusColor(order.paymentStatus)}`}
                        >
                          {order.paymentMethod}: {order.paymentStatus}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                      <div>
                        <span className="text-gray-400">Customer: </span>
                        <span className="font-medium">
                          {order.customerName}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Phone: </span>
                        <span className="font-medium">{order.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Product: </span>
                        <span className="font-medium">{order.productName}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Qty: </span>
                        <span className="font-medium">
                          {order.quantity.toLocaleString()} bags
                        </span>
                      </div>
                    </div>

                    {order.paymentReference && (
                      <div className="mb-4 rounded-lg bg-gray-50 px-4 py-3 text-sm">
                        <span className="text-gray-500">
                          Payment Reference:{" "}
                        </span>
                        <span className="break-all font-mono text-gray-900">
                          {order.paymentReference}
                        </span>
                      </div>
                    )}

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                          Update Status:
                        </span>
                        <select
                          value={order.status}
                          onChange={(event) =>
                            updateOrderStatus(
                              order.orderId,
                              event.target.value as Order["status"],
                            )
                          }
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                          Payment Status:
                        </span>
                        <select
                          value={order.paymentStatus}
                          onChange={(event) =>
                            updateOrderPayment(
                              order.orderId,
                              event.target.value as Order["paymentStatus"],
                            )
                          }
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30"
                        >
                          {PAYMENT_STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

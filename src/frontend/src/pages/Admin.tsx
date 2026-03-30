import { Check, LogOut, Pencil, Plus, Trash2, X } from "lucide-react";
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

export default function Admin() {
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
  } = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem("megabags_admin") === "1",
  );
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<"products" | "orders">("products");

  // Product form
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [pForm, setPForm] = useState({
    name: "",
    imageUrl: "",
    description: "",
    specs: "",
    applications: "",
    category: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loginForm.username === ADMIN_USER &&
      loginForm.password === ADMIN_PASS
    ) {
      sessionStorage.setItem("megabags_admin", "1");
      setIsLoggedIn(true);
    } else {
      setLoginError("Invalid username or password");
    }
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

  const openEditForm = (p: Product) => {
    const images = p.images?.length
      ? p.images
      : p.imageUrl
        ? [p.imageUrl]
        : [];
    setPForm({
      name: p.name,
      imageUrl: images.join(", "),
      description: p.description,
      specs: p.specs,
      applications: p.applications,
      category: p.category,
    });
    setEditingProduct(p);
    setShowAddForm(true);
  };

  const handleSaveProduct = () => {
    if (!pForm.name) return;
    const imageList = pForm.imageUrl
      .split(",")
      .map((s) => s.trim())
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

  const statusColor = (s: Order["status"]) => {
    if (s === "Delivered") return "bg-green-100 text-green-700";
    if (s === "Dispatched") return "bg-blue-100 text-blue-700";
    if (s === "Processing") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  if (!isLoggedIn)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-[#0E5A7A] rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-black text-2xl">M</span>
            </div>
            <h1 className="text-xl font-black text-gray-900">Admin Panel</h1>
            <p className="text-gray-400 text-sm">Mega Bags Management</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-username"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm((p) => ({ ...p, username: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30"
                placeholder="admin"
              />
            </div>
            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((p) => ({ ...p, password: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30"
                placeholder="••••••••"
              />
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-[#0E5A7A] hover:bg-[#0a4a66] text-white py-3 rounded-xl font-bold transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <header className="bg-[#0E5A7A] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center text-white font-black">
            M
          </div>
          <div>
            <span className="text-white font-black">MEGA BAGS</span>
            <span className="text-white/60 text-xs ml-2">Admin Panel</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 text-white/80 hover:text-white text-sm"
        >
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {(["products", "orders"] as const).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-lg font-semibold capitalize transition-colors ${
                tab === t
                  ? "bg-[#0E5A7A] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t}{" "}
              {t === "products" ? `(${products.length})` : `(${orders.length})`}
            </button>
          ))}
        </div>

        {/* Products tab */}
        {tab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black text-gray-900">
                Product Management
              </h2>
              <button
                type="button"
                onClick={openAddForm}
                className="flex items-center gap-2 bg-[#2DBE6C] hover:bg-[#26a85e] text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                <Plus size={16} /> Add Product
              </button>
            </div>

            {/* Add/Edit form */}
            {showAddForm && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
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
                <div className="grid md:grid-cols-2 gap-4">
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
                        className="block text-xs font-semibold text-gray-500 mb-1 uppercase"
                      >
                    {field === "imageUrl" ? "Image URLs (comma separated)" : field}
                      </label>
                      <input
                        id={`pform-${field}`}
                        type="text"
                        value={pForm[field]}
                        onChange={(e) =>
                          setPForm((p) => ({ ...p, [field]: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="pform-description"
                      className="block text-xs font-semibold text-gray-500 mb-1 uppercase"
                    >
                      Description
                    </label>
                    <textarea
                      id="pform-description"
                      rows={3}
                      value={pForm.description}
                      onChange={(e) =>
                        setPForm((p) => ({ ...p, description: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30 resize-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProduct}
                    className="flex items-center gap-2 bg-[#0E5A7A] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    <Check size={16} /> Save
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900">{p.name}</div>
                    <div className="text-gray-400 text-sm truncate">
                      {p.description}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEditForm(p)}
                      className="p-2 text-[#0E5A7A] hover:bg-blue-50 rounded-lg"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProduct(p.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders tab */}
        {tab === "orders" && (
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-4">
              Order Management ({orders.length} orders)
            </h2>
            {orders.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">📦</div>
                <p>No orders yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[...orders].reverse().map((o) => (
                  <div
                    key={o.orderId}
                    className="bg-white border border-gray-200 rounded-xl p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="font-black text-gray-900 text-lg">
                          {o.orderId}
                        </span>
                        <span
                          className={`ml-3 px-2 py-0.5 rounded-full text-xs font-bold ${statusColor(o.status)}`}
                        >
                          {o.status}
                        </span>
                      </div>
                      <div className="text-gray-400 text-xs">
                        {new Date(o.createdAt).toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                      <div>
                        <span className="text-gray-400">Customer: </span>
                        <span className="font-medium">{o.customerName}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Phone: </span>
                        <span className="font-medium">{o.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Product: </span>
                        <span className="font-medium">{o.productName}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Qty: </span>
                        <span className="font-medium">
                          {o.quantity.toLocaleString()} bags
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">
                        Update Status:
                      </span>
                      <select
                        value={o.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            o.orderId,
                            e.target.value as Order["status"],
                          )
                        }
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
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

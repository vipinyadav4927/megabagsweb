import { CheckCircle, Circle } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

const STATUSES = [
  "Order Placed",
  "Processing",
  "Dispatched",
  "Delivered",
] as const;

export default function TrackOrder() {
  const { getOrder } = useApp();
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState<
    ReturnType<typeof getOrder> | "not-found" | null
  >(null);

  const handleSearch = () => {
    if (!orderId.trim()) return;
    const order = getOrder(orderId.trim().toUpperCase());
    setResult(order || "not-found");
  };

  const statusIndex =
    result && result !== "not-found" ? STATUSES.indexOf(result.status) : -1;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          Track Your Order
        </h1>
        <p className="text-gray-500">Enter your Order ID to check status</p>
        <div className="w-16 h-1 bg-[#F97316] rounded mt-3" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="e.g. MB12345"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30 text-lg font-mono uppercase"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-[#F97316] hover:bg-[#e8660e] text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            Track
          </button>
        </div>
      </div>

      {result === "not-found" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">😕</div>
          <h3 className="font-bold text-red-800 mb-1">Order Not Found</h3>
          <p className="text-red-600 text-sm">
            No order found with ID "{orderId}". Please check and try again.
          </p>
        </div>
      )}

      {result && result !== "not-found" && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-black text-xl text-gray-900">
                {result.orderId}
              </h2>
              <p className="text-gray-400 text-sm">
                Placed on{" "}
                {new Date(result.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-bold ${
                result.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : result.status === "Dispatched"
                    ? "bg-blue-100 text-blue-700"
                    : result.status === "Processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
              }`}
            >
              {result.status}
            </span>
          </div>

          {/* Order info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-gray-400">Product</div>
                <div className="font-semibold text-gray-900">
                  {result.productName}
                </div>
              </div>
              <div>
                <div className="text-gray-400">Quantity</div>
                <div className="font-semibold text-gray-900">
                  {result.quantity.toLocaleString()} bags
                </div>
              </div>
              <div>
                <div className="text-gray-400">Customer</div>
                <div className="font-semibold text-gray-900">
                  {result.customerName}
                </div>
              </div>
              <div>
                <div className="text-gray-400">Phone</div>
                <div className="font-semibold text-gray-900">
                  {result.phone}
                </div>
              </div>
            </div>
          </div>

          {/* Status timeline */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Order Timeline</h3>
            <div className="space-y-3">
              {STATUSES.map((s, i) => (
                <div key={s} className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      i <= statusIndex ? "bg-[#2DBE6C]" : "bg-gray-200"
                    }`}
                  >
                    {i <= statusIndex ? (
                      <CheckCircle size={18} className="text-white" />
                    ) : (
                      <Circle size={18} className="text-gray-400" />
                    )}
                  </div>
                  {i < STATUSES.length - 1 && (
                    <div className="absolute ml-4 mt-8 w-0.5 h-3 bg-gray-200" />
                  )}
                  <div>
                    <div
                      className={`font-semibold text-sm ${i <= statusIndex ? "text-gray-900" : "text-gray-400"}`}
                    >
                      {s}
                    </div>
                    {i === statusIndex && (
                      <div className="text-xs text-[#2DBE6C] font-medium">
                        Current Status
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { CheckCircle, Circle, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { findOrderInGoogleSheets } from "../services/googleSheets";

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
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    const normalizedOrderId = orderId.trim().toUpperCase();
    if (!normalizedOrderId) return;

    setIsSearching(true);

    const localOrder = getOrder(normalizedOrderId);
    const remoteOrder = await findOrderInGoogleSheets(normalizedOrderId);

    setResult(remoteOrder || localOrder || "not-found");
    setIsSearching(false);
  };

  const statusIndex =
    result && result !== "not-found" ? STATUSES.indexOf(result.status) : -1;

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-black text-gray-900">
          Track Your Order
        </h1>
        <p className="text-gray-500">Enter your Order ID to check status</p>
        <div className="mt-3 h-1 w-16 rounded bg-[#F97316]" />
      </div>

      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
        <div className="flex gap-3">
          <input
            type="text"
            value={orderId}
            onChange={(event) => setOrderId(event.target.value.toUpperCase())}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                void handleSearch();
              }
            }}
            placeholder="e.g. MB12345"
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-lg font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30"
          />
          <button
            type="button"
            onClick={() => void handleSearch()}
            disabled={isSearching}
            className="rounded-xl bg-[#F97316] px-6 py-3 font-bold text-white transition-colors hover:bg-[#E8660E] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSearching ? (
              <span className="flex items-center gap-2">
                <LoaderCircle size={18} className="animate-spin" />
                Tracking...
              </span>
            ) : (
              "Track"
            )}
          </button>
        </div>
      </div>

      {result === "not-found" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h3 className="mb-1 font-bold text-red-800">Order Not Found</h3>
          <p className="text-sm text-red-600">
            No order found with ID "{orderId}". Please check and try again.
          </p>
        </div>
      )}

      {result && result !== "not-found" && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-black text-gray-900">
                {result.orderId}
              </h2>
              <p className="text-sm text-gray-400">
                Placed on{" "}
                {new Date(result.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`rounded-full px-3 py-1 text-sm font-bold ${
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
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  result.paymentStatus === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {result.paymentMethod}: {result.paymentStatus}
              </span>
            </div>
          </div>

          <div className="mb-6 rounded-xl bg-gray-50 p-4">
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

          <div className="mb-6 rounded-xl border border-gray-100 bg-white p-4">
            <div className="mb-2 text-sm font-semibold text-gray-400">
              Payment Details
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">Method</span>
                <span className="font-medium text-gray-900">
                  {result.paymentMethod}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-gray-900">
                  {result.paymentStatus}
                </span>
              </div>
              {result.paymentReference && (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Reference</span>
                  <span className="break-all font-mono text-sm text-gray-900">
                    {result.paymentReference}
                  </span>
                </div>
              )}
              {result.razorpayPaymentId && (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Razorpay Payment ID</span>
                  <span className="break-all font-mono text-sm text-gray-900">
                    {result.razorpayPaymentId}
                  </span>
                </div>
              )}
              {result.razorpayOrderId && (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Razorpay Order ID</span>
                  <span className="break-all font-mono text-sm text-gray-900">
                    {result.razorpayOrderId}
                  </span>
                </div>
              )}
            </div>
          </div>

          {result.paymentMethod === "Google Pay" &&
            result.paymentStatus === "Pending" && (
              <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                This is an older Google Pay order that is still marked as
                pending.
              </div>
            )}

          <div>
            <h3 className="mb-4 font-bold text-gray-900">Order Timeline</h3>
            <div className="space-y-3">
              {STATUSES.map((status, index) => (
                <div key={status} className="flex items-center gap-4">
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                      index <= statusIndex ? "bg-[#2DBE6C]" : "bg-gray-200"
                    }`}
                  >
                    {index <= statusIndex ? (
                      <CheckCircle size={18} className="text-white" />
                    ) : (
                      <Circle size={18} className="text-gray-400" />
                    )}
                  </div>
                  {index < STATUSES.length - 1 && (
                    <div className="absolute ml-4 mt-8 h-3 w-0.5 bg-gray-200" />
                  )}
                  <div>
                    <div
                      className={`text-sm font-semibold ${
                        index <= statusIndex ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {status}
                    </div>
                    {index === statusIndex && (
                      <div className="text-xs font-medium text-[#2DBE6C]">
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

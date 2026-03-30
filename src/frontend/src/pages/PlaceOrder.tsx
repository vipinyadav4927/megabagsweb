import {
  AlertCircle,
  CheckCircle,
  CreditCard,
  Lock,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

const RAZORPAY_KEY = "rzp_test_1DP5mmOlF5G5ag";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PlaceOrder() {
  const { products, addOrder } = useApp();
  const [searchParams] = useSearchParams();
  const prefilledProduct = searchParams.get("product") || "";

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    productName: prefilledProduct,
    quantity: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successOrderId, setSuccessOrderId] = useState("");
  const [successPaymentId, setSuccessPaymentId] = useState<string | undefined>(
    undefined,
  );
  const [paymentError, setPaymentError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.customerName.trim()) e.customerName = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^[0-9+\-\s]{8,15}$/.test(form.phone))
      e.phone = "Enter a valid phone number";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.productName) e.productName = "Select a product";
    if (!form.quantity) e.quantity = "Quantity is required";
    else if (Number.parseInt(form.quantity) < 1000)
      e.quantity = "Minimum order quantity is 1000 bags";
    if (!form.address.trim()) e.address = "Address is required";
    return e;
  };

  const openRazorpay = async () => {
    setPaymentError("");
    setIsProcessing(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setPaymentError(
        "Failed to load payment gateway. Please check your internet connection.",
      );
      setIsProcessing(false);
      return;
    }

    const qty = Number.parseInt(form.quantity);
    const pricePerBag = 10; // ₹10 per bag
    const amountInPaise = Math.min(qty * pricePerBag * 100, 50000000); // cap at ₹5 lakh

    const options: Record<string, unknown> = {
      key: RAZORPAY_KEY,
      amount: amountInPaise,
      currency: "INR",
      name: "Mega Bags",
      description: form.productName,
      image: "/assets/logo.png",
      prefill: {
        name: form.customerName,
        email: form.email,
        contact: form.phone,
      },
      theme: { color: "#0E5A7A" },
      modal: {
        ondismiss: () => {
          setPaymentError(
            "Payment was cancelled. Please try again to complete your order.",
          );
          setIsProcessing(false);
        },
      },
      handler: (_response: Record<string, unknown>) => {
        const paymentResponse = _response as Partial<{
          razorpay_payment_id: string;
          razorpay_order_id: string;
        }>;
        const id = addOrder({
          customerName: form.customerName,
          phone: form.phone,
          email: form.email,
          productName: form.productName,
          quantity: qty,
          address: form.address,
          notes: form.notes,
          paymentStatus: "Paid",
          razorpayPaymentId: paymentResponse.razorpay_payment_id,
          razorpayOrderId: paymentResponse.razorpay_order_id,
        });
        setSuccessOrderId(id);
        setSuccessPaymentId(paymentResponse.razorpay_payment_id);
        setIsProcessing(false);
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      setPaymentError("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    openRazorpay();
  };

  const qty = Number.parseInt(form.quantity) || 0;
  const estimatedAmount = qty * 10;

  const field = (
    id: string,
    label: string,
    type = "text",
    placeholder = "",
  ) => (
    <div>
      <label
        htmlFor={`field-${id}`}
        className="block text-sm font-semibold text-gray-700 mb-1.5"
      >
        {label}
      </label>
      <input
        id={`field-${id}`}
        type={type}
        value={(form as Record<string, string>)[id]}
        onChange={(ev) => {
          setForm((prev) => ({ ...prev, [id]: ev.target.value }));
          setErrors((prev) => ({ ...prev, [id]: "" }));
        }}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30 transition-all ${
          errors[id]
            ? "border-red-400 bg-red-50"
            : "border-gray-200 hover:border-gray-300"
        }`}
      />
      {errors[id] && (
        <p className="text-red-500 text-xs mt-1" data-ocid={`${id}_error`}>
          {errors[id]}
        </p>
      )}
    </div>
  );

  if (successOrderId)
    return (
      <div className="max-w-lg mx-auto px-6 py-16 text-center page-enter">
        <div className="bg-white rounded-2xl shadow-lg p-10">
          {/* Animated success icon */}
          <div className="success-bounce inline-block mb-6">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle
                className="text-green-500"
                size={56}
                strokeWidth={1.5}
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <ShieldCheck size={16} />
            Payment Successful
          </div>

          <h2 className="text-2xl font-black text-gray-900 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-500 mb-6">
            Your order has been received and payment is confirmed. Track it
            using your Order ID.
          </p>

          <div className="bg-[#0E5A7A] text-white rounded-xl p-6 mb-4">
            <div className="text-sm text-white/70 mb-1">Your Order ID</div>
            <div className="text-3xl font-black tracking-wider mb-3">
              {successOrderId}
            </div>
            <div className="inline-flex items-center gap-1.5 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              <CheckCircle size={12} />
              PAID
            </div>
          </div>

          {successPaymentId && (
            <div className="mt-3 text-left bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
              <div className="text-xs text-gray-500 mb-1">Razorpay Payment ID</div>
              <div className="font-mono text-sm text-gray-900 break-all">
                {successPaymentId}
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              <Smartphone size={12} /> UPI
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              <CreditCard size={12} /> Card
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              <Wallet size={12} /> Net Banking
            </span>
          </div>

          <p className="text-gray-400 text-sm mb-6">
            Save this Order ID to track your order status.
          </p>
          <a
            href="/track"
            data-ocid="track_order.link"
            className="block bg-[#F97316] text-white py-3 rounded-xl font-bold hover:bg-[#e8660e] transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-200"
          >
            Track Your Order
          </a>
        </div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 page-enter">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Place Order</h1>
        <p className="text-gray-500">Minimum order quantity: 1000 bags</p>
        <div className="w-16 h-1 bg-[#F97316] rounded mt-3" />
      </div>

      {/* Payment Error Banner */}
      {paymentError && (
        <div
          data-ocid="payment.error_state"
          className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 error-shake"
        >
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-sm">Payment Failed or Cancelled</p>
            <p className="text-xs mt-0.5 text-red-600">{paymentError}</p>
          </div>
          <button
            type="button"
            data-ocid="payment.retry_button"
            onClick={openRazorpay}
            disabled={isProcessing}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <RefreshCw size={12} />
            Retry Payment
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            {field("customerName", "Customer Name *", "text", "Your full name")}
            {field("phone", "Phone Number *", "tel", "+91 XXXXX XXXXX")}
          </div>
          {field("email", "Email Address *", "email", "your@email.com")}

          <div>
            <label
              htmlFor="product-name"
              className="block text-sm font-semibold text-gray-700 mb-1.5"
            >
              Product Name *
            </label>
            <select
              id="product-name"
              data-ocid="order.select"
              value={form.productName}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, productName: e.target.value }));
                setErrors((prev) => ({ ...prev, productName: "" }));
              }}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30 transition-all ${
                errors.productName
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <option value="">Select a product</option>
              {products.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.productName && (
              <p
                className="text-red-500 text-xs mt-1"
                data-ocid="productName_error"
              >
                {errors.productName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-semibold text-gray-700 mb-1.5"
            >
              Quantity (bags) *
            </label>
            <input
              id="quantity"
              data-ocid="order.input"
              type="number"
              min="1000"
              value={form.quantity}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, quantity: e.target.value }));
                setErrors((prev) => ({ ...prev, quantity: "" }));
              }}
              placeholder="Minimum 1000"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30 transition-all ${
                errors.quantity
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            />
            {errors.quantity && (
              <p
                className="text-red-500 text-xs mt-1"
                data-ocid="quantity_error"
              >
                {errors.quantity}
              </p>
            )}
            {form.quantity &&
              Number.parseInt(form.quantity) < 1000 &&
              !errors.quantity && (
                <p className="text-orange-500 text-xs mt-1">
                  ⚠ Minimum order is 1000 bags
                </p>
              )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-gray-700 mb-1.5"
            >
              Delivery Address *
            </label>
            <textarea
              id="address"
              data-ocid="order.textarea"
              rows={3}
              value={form.address}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, address: e.target.value }));
                setErrors((prev) => ({ ...prev, address: "" }));
              }}
              placeholder="Full delivery address with city, state, pincode"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30 resize-none transition-all ${
                errors.address
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            />
            {errors.address && (
              <p
                className="text-red-500 text-xs mt-1"
                data-ocid="address_error"
              >
                {errors.address}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-semibold text-gray-700 mb-1.5"
            >
              Additional Notes
            </label>
            <textarea
              id="notes"
              rows={2}
              value={form.notes}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Any special requirements, print details, etc."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30 resize-none hover:border-gray-300 transition-all"
            />
          </div>

          {/* Razorpay Payment Info Box */}
          <div className="rounded-2xl border border-[#0E5A7A]/20 bg-gradient-to-br from-[#0E5A7A]/5 to-blue-50 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#0E5A7A] p-1.5 rounded-lg">
                <Lock size={14} className="text-white" />
              </div>
              <span className="font-bold text-[#0E5A7A] text-sm">
                Secure Payment via Razorpay
              </span>
              <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
                <ShieldCheck size={12} className="text-green-500" />
                256-bit SSL
              </span>
            </div>

            {/* Payment Method Icons */}
            <div className="flex flex-wrap gap-2">
              {[
                {
                  icon: <Smartphone size={13} className="text-[#0E5A7A]" />,
                  label: "UPI",
                },
                {
                  icon: <CreditCard size={13} className="text-[#0E5A7A]" />,
                  label: "Debit / Credit Card",
                },
                {
                  icon: (
                    <svg
                      role="img"
                      aria-label="Net Banking"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-[#0E5A7A]"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  ),
                  label: "Net Banking",
                },
                {
                  icon: <Wallet size={13} className="text-[#0E5A7A]" />,
                  label: "Wallets",
                },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md hover:border-[#0E5A7A]/30 transition-all"
                >
                  {icon}
                  {label}
                </span>
              ))}
            </div>

            {/* Order Total */}
            <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 px-4 py-3">
              <span className="text-sm text-gray-500">Order Total (Est.)</span>
              <span className="text-lg font-black text-[#0E5A7A]">
                {qty > 0 ? `₹${estimatedAmount.toLocaleString("en-IN")}` : "—"}
              </span>
            </div>

            {/* Test Mode Note */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <p className="text-xs text-amber-700 font-medium">
                🧪 <strong>Test Mode:</strong> Use test card:{" "}
                <span className="font-mono tracking-wide">
                  4111 1111 1111 1111
                </span>{" "}
                | CVV: <span className="font-mono">123</span> | Expiry: any
                future date
              </p>
            </div>
          </div>

          <button
            type="submit"
            data-ocid="order.submit_button"
            disabled={isProcessing}
            className="w-full bg-[#F97316] hover:bg-[#e8660e] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-orange-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg
                  role="img"
                  aria-label="Loading"
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Opening Payment Gateway...
              </>
            ) : (
              <>
                <Lock size={18} />
                Proceed to Payment
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

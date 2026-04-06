import {
  CheckCircle,
  CreditCard,
  Lock,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { PAYMENT_CONFIG } from "../paymentConfig";

type CheckoutResult = {
  orderId: string;
  paymentMethod: "Razorpay" | "Google Pay";
  paymentStatus: "Paid" | "Pending";
  paymentReference?: string;
};

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
  const [processingMethod, setProcessingMethod] = useState<"gpay" | null>(null);
  const [checkoutResult, setCheckoutResult] = useState<CheckoutResult | null>(
    null,
  );

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.customerName.trim()) nextErrors.customerName = "Name is required";
    if (!form.phone.trim()) nextErrors.phone = "Phone is required";
    else if (!/^[0-9+\-\s]{8,15}$/.test(form.phone))
      nextErrors.phone = "Enter a valid phone number";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      nextErrors.email = "Enter a valid email";
    if (!form.productName) nextErrors.productName = "Select a product";
    if (!form.quantity) nextErrors.quantity = "Quantity is required";
    else if (Number.parseInt(form.quantity, 10) < 1000)
      nextErrors.quantity = "Minimum order quantity is 1000 bags";
    if (!form.address.trim()) nextErrors.address = "Address is required";

    return nextErrors;
  };

  const qty = Number.parseInt(form.quantity, 10) || 0;
  const estimatedAmount = qty * PAYMENT_CONFIG.pricePerBag;

  const validateBeforePayment = () => {
    const nextErrors = validate();
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const createOrder = (
    paymentMethod: "Razorpay" | "Google Pay",
    paymentStatus: "Paid" | "Pending",
    extraFields?: Partial<Parameters<typeof addOrder>[0]>,
  ) => {
    return addOrder({
      customerName: form.customerName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      productName: form.productName,
      quantity: Number.parseInt(form.quantity, 10),
      address: form.address.trim(),
      notes: form.notes.trim(),
      paymentMethod,
      paymentStatus,
      ...extraFields,
    });
  };

  const openGooglePay = () => {
    if (!validateBeforePayment()) return;

    setProcessingMethod("gpay");

    const paymentReference = `${PAYMENT_CONFIG.googlePay.demoReferencePrefix}-${Date.now()}`;
    const orderId = createOrder("Google Pay", "Paid", {
      paymentReference,
    });

    setCheckoutResult({
      orderId,
      paymentMethod: "Google Pay",
      paymentStatus: "Paid",
      paymentReference,
    });
    setProcessingMethod(null);
  };

  const field = (
    id: string,
    label: string,
    type = "text",
    placeholder = "",
  ) => (
    <div>
      <label
        htmlFor={`field-${id}`}
        className="mb-1.5 block text-sm font-semibold text-gray-700"
      >
        {label}
      </label>
      <input
        id={`field-${id}`}
        type={type}
        value={(form as Record<string, string>)[id]}
        onChange={(event) => {
          setForm((prev) => ({ ...prev, [id]: event.target.value }));
          setErrors((prev) => ({ ...prev, [id]: "" }));
        }}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30 ${
          errors[id]
            ? "border-red-400 bg-red-50"
            : "border-gray-200 hover:border-gray-300"
        }`}
      />
      {errors[id] && (
        <p className="mt-1 text-xs text-red-500" data-ocid={`${id}_error`}>
          {errors[id]}
        </p>
      )}
    </div>
  );

  if (checkoutResult)
    return (
      <div className="page-enter mx-auto max-w-lg px-6 py-16 text-center">
        <div className="rounded-2xl bg-white p-10 shadow-lg">
          <div className="success-bounce mb-6 inline-block">
            <div
              className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full ${
                checkoutResult.paymentStatus === "Paid"
                  ? "bg-green-100"
                  : "bg-amber-100"
              }`}
            >
              <CheckCircle
                className={
                  checkoutResult.paymentStatus === "Paid"
                    ? "text-green-500"
                    : "text-amber-600"
                }
                size={56}
                strokeWidth={1.5}
              />
            </div>
          </div>

          <div
            className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold ${
              checkoutResult.paymentStatus === "Paid"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-amber-200 bg-amber-50 text-amber-700"
            }`}
          >
            <ShieldCheck size={16} />
            {checkoutResult.paymentStatus === "Paid"
              ? "Payment Successful"
              : "Payment Pending"}
          </div>

          <h2 className="mb-2 text-2xl font-black text-gray-900">
            {checkoutResult.paymentStatus === "Paid"
              ? "Order Placed Successfully!"
              : "Order Created. Complete Payment in Google Pay."}
          </h2>
          <p className="mb-6 text-gray-500">
            {checkoutResult.paymentStatus === "Paid"
              ? "Your order has been received and payment is confirmed. Track it using your Order ID."
              : "Your order is saved with pending payment. Open Google Pay, complete the payment, then share the screenshot or UTR for confirmation."}
          </p>

          <div className="mb-4 rounded-xl bg-[#0E5A7A] p-6 text-white">
            <div className="mb-1 text-sm text-white/70">Your Order ID</div>
            <div className="mb-3 text-3xl font-black tracking-wider">
              {checkoutResult.orderId}
            </div>
            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                checkoutResult.paymentStatus === "Paid"
                  ? "bg-green-500 text-white"
                  : "bg-amber-400 text-amber-950"
              }`}
            >
              <CheckCircle size={12} />
              {checkoutResult.paymentStatus === "Paid" ? "PAID" : "PENDING"}
            </div>
          </div>

          <div className="mb-6 grid gap-3 text-left">
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <div className="mb-1 text-xs text-gray-500">Payment Method</div>
              <div className="font-medium text-gray-900">
                {checkoutResult.paymentMethod}
              </div>
            </div>

            {checkoutResult.paymentReference && (
              <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <div className="mb-1 text-xs text-gray-500">
                  Payment Reference
                </div>
                <div className="break-all font-mono text-sm text-gray-900">
                  {checkoutResult.paymentReference}
                </div>
              </div>
            )}
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <span className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
              <Smartphone size={12} /> UPI
            </span>
            <span className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
              <CreditCard size={12} /> Card
            </span>
            <span className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
              <Wallet size={12} /> Net Banking
            </span>
          </div>

          <p className="mb-6 text-sm text-gray-400">
            Save this Order ID to track your order status.
          </p>
          <Link
            to="/track"
            data-ocid="track_order.link"
            className="block rounded-xl bg-[#F97316] py-3 font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#E8660E] hover:shadow-lg hover:shadow-orange-200"
          >
            Track Your Order
          </Link>
        </div>
      </div>
    );

  return (
    <div className="page-enter mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-black text-gray-900">Place Order</h1>
        <p className="text-gray-500">Minimum order quantity: 1000 bags</p>
        <div className="mt-3 h-1 w-16 rounded bg-[#F97316]" />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            openGooglePay();
          }}
          className="space-y-5"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {field("customerName", "Customer Name *", "text", "Your full name")}
            {field("phone", "Phone Number *", "tel", "+91 XXXXX XXXXX")}
          </div>
          {field("email", "Email Address *", "email", "your@email.com")}

          <div>
            <label
              htmlFor="product-name"
              className="mb-1.5 block text-sm font-semibold text-gray-700"
            >
              Product Name *
            </label>
            <select
              id="product-name"
              data-ocid="order.select"
              value={form.productName}
              onChange={(event) => {
                setForm((prev) => ({
                  ...prev,
                  productName: event.target.value,
                }));
                setErrors((prev) => ({ ...prev, productName: "" }));
              }}
              className={`w-full rounded-xl border px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30 ${
                errors.productName
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
            {errors.productName && (
              <p
                className="mt-1 text-xs text-red-500"
                data-ocid="productName_error"
              >
                {errors.productName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="mb-1.5 block text-sm font-semibold text-gray-700"
            >
              Quantity (bags) *
            </label>
            <input
              id="quantity"
              data-ocid="order.input"
              type="number"
              min="1000"
              value={form.quantity}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, quantity: event.target.value }));
                setErrors((prev) => ({ ...prev, quantity: "" }));
              }}
              placeholder="Minimum 1000"
              className={`w-full rounded-xl border px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30 ${
                errors.quantity
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            />
            {errors.quantity && (
              <p
                className="mt-1 text-xs text-red-500"
                data-ocid="quantity_error"
              >
                {errors.quantity}
              </p>
            )}
            {form.quantity &&
              Number.parseInt(form.quantity, 10) < 1000 &&
              !errors.quantity && (
                <p className="mt-1 text-xs text-orange-500">
                  Minimum order is 1000 bags
                </p>
              )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="mb-1.5 block text-sm font-semibold text-gray-700"
            >
              Delivery Address *
            </label>
            <textarea
              id="address"
              data-ocid="order.textarea"
              rows={3}
              value={form.address}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, address: event.target.value }));
                setErrors((prev) => ({ ...prev, address: "" }));
              }}
              placeholder="Full delivery address with city, state, pincode"
              className={`w-full resize-none rounded-xl border px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30 ${
                errors.address
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            />
            {errors.address && (
              <p
                className="mt-1 text-xs text-red-500"
                data-ocid="address_error"
              >
                {errors.address}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="notes"
              className="mb-1.5 block text-sm font-semibold text-gray-700"
            >
              Additional Notes
            </label>
            <textarea
              id="notes"
              rows={2}
              value={form.notes}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, notes: event.target.value }))
              }
              placeholder="Any special requirements, print details, etc."
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30 hover:border-gray-300"
            />
          </div>

          <div className="space-y-4 rounded-2xl border border-[#0E5A7A]/20 bg-gradient-to-br from-[#0E5A7A]/5 to-blue-50 p-5">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#0E5A7A] p-1.5">
                <Lock size={14} className="text-white" />
              </div>
              <span className="text-sm font-bold text-[#0E5A7A]">
                Choose Payment Method
              </span>
              <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
                <ShieldCheck size={12} className="text-green-500" />
                Secure checkout
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                {
                  icon: <Smartphone size={13} className="text-[#0E5A7A]" />,
                  label: "UPI Apps",
                },
                {
                  icon: <CreditCard size={13} className="text-[#0E5A7A]" />,
                  label: "Cards",
                },
                {
                  icon: <Wallet size={13} className="text-[#0E5A7A]" />,
                  label: "Wallets",
                },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm transition-all hover:border-[#0E5A7A]/30 hover:shadow-md"
                >
                  {icon}
                  {label}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3">
              <span className="text-sm text-gray-500">Order Total (Est.)</span>
              <span className="text-lg font-black text-[#0E5A7A]">
                {qty > 0
                  ? `INR ${estimatedAmount.toLocaleString("en-IN")}`
                  : "--"}
              </span>
            </div>

            <div className="grid gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm text-gray-600">
              <p>
                Razorpay checkout abhi {PAYMENT_CONFIG.razorpay.statusLabel.toLowerCase()} hai.
              </p>
              <p>
                Google Pay demo mode active hai. Click karte hi paid order ban
                jayega aur tracking turant start ho jayegi.
              </p>
              <p>
                Har successful demo order Google Sheet me save hoga aur Track
                Order page par mil jayega.
              </p>
            </div>

            <div className="rounded-lg border border-[#0E5A7A]/15 bg-white px-3 py-2">
              <p className="text-xs font-medium text-[#0E5A7A]">
                Tracking system live hai. Abhi Google Pay demo checkout active
                hai aur Razorpay soon aayega.
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <button
              type="button"
              data-ocid="order.submit_button"
              disabled
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-100 py-4 text-lg font-bold text-gray-500 opacity-90"
            >
              <Lock size={18} />
              Razorpay - {PAYMENT_CONFIG.razorpay.statusLabel}
            </button>

            <button
              type="submit"
              disabled={processingMethod !== null}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#0E5A7A] bg-white py-4 text-lg font-bold text-[#0E5A7A] transition-all hover:scale-[1.01] hover:bg-[#0E5A7A] hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {processingMethod === "gpay" ? (
                <>
                  <svg
                    role="img"
                    aria-label="Loading"
                    className="h-5 w-5 animate-spin"
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
                  Confirming Google Pay...
                </>
              ) : (
                <>
                  <Smartphone size={18} />
                  Pay with Google Pay
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

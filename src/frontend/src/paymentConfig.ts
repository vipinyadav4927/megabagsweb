export const PAYMENT_CONFIG = {
  pricePerBag: 10,
  merchantName: "Mega Bags",
  razorpayKey: "rzp_test_1DP5mmOlF5G5ag",
  googlePay: {
    // Add your real Google Pay UPI ID here, for example: yourname@okaxis
    upiId: "",
    payeeName: "Mega Bags",
    notePrefix: "Mega Bags bulk order",
  },
} as const;

export function isGooglePayConfigured() {
  return PAYMENT_CONFIG.googlePay.upiId.trim().length > 0;
}

export function buildGooglePayLink(options: {
  amount: number;
  productName: string;
  customerName: string;
}) {
  const params = new URLSearchParams({
    pa: PAYMENT_CONFIG.googlePay.upiId.trim(),
    pn: PAYMENT_CONFIG.googlePay.payeeName,
    am: options.amount.toFixed(2),
    cu: "INR",
    tn: `${PAYMENT_CONFIG.googlePay.notePrefix}: ${options.productName} for ${options.customerName}`,
  });

  return `tez://upi/pay?${params.toString()}`;
}

export function buildUpiFallbackLink(options: {
  amount: number;
  productName: string;
  customerName: string;
}) {
  const params = new URLSearchParams({
    pa: PAYMENT_CONFIG.googlePay.upiId.trim(),
    pn: PAYMENT_CONFIG.googlePay.payeeName,
    am: options.amount.toFixed(2),
    cu: "INR",
    tn: `${PAYMENT_CONFIG.googlePay.notePrefix}: ${options.productName} for ${options.customerName}`,
  });

  return `upi://pay?${params.toString()}`;
}

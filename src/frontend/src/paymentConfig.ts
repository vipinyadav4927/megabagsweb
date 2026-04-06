export const PAYMENT_CONFIG = {
  pricePerBag: 10,
  merchantName: "Mega Bags",
  razorpay: {
    statusLabel: "Upcoming",
  },
  googlePay: {
    demoMode: true,
    demoReferencePrefix: "GPayDemo",
  },
} as const;

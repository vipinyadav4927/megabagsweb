export default function CallUs() {
  const contacts = [
    {
      label: "Sales Enquiry",
      number: "+91 98765 43210",
      hours: "Mon-Sat, 9AM–6PM",
    },
    {
      label: "Order Support",
      number: "+91 87654 32109",
      hours: "Mon-Sat, 9AM–7PM",
    },
    {
      label: "Bulk Orders",
      number: "+91 76543 21098",
      hours: "Mon-Fri, 10AM–5PM",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Call Us</h1>
        <p className="text-gray-500">
          We're here to help with your bulk order requirements
        </p>
        <div className="w-16 h-1 bg-[#F97316] rounded mt-3" />
      </div>

      <div className="space-y-4 mb-8">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={`tel:${c.number.replace(/\s/g, "")}`}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#0E5A7A] hover:shadow-md transition-all group"
          >
            <div>
              <div className="font-bold text-gray-900 mb-1">{c.label}</div>
              <div className="text-[#0E5A7A] text-xl font-black">
                {c.number}
              </div>
              <div className="text-gray-400 text-xs mt-1">⏰ {c.hours}</div>
            </div>
            <div className="w-12 h-12 bg-[#2DBE6C] rounded-full flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform">
              📞
            </div>
          </a>
        ))}
      </div>

      <div className="bg-[#0E5A7A] rounded-2xl p-6 text-white text-center">
        <div className="text-3xl mb-2">💬</div>
        <h2 className="text-xl font-bold mb-2">WhatsApp Us</h2>
        <p className="text-white/70 text-sm mb-4">
          For quick queries and bulk order discussions
        </p>
        <a
          href="https://wa.me/919876543210?text=Hello%2C%20I%27m%20interested%20in%20your%20industrial%20paper%20bags."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#25D366] hover:bg-[#20b85a] text-white px-8 py-3 rounded-xl font-bold transition-colors"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}

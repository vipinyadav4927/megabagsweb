export default function CallUs() {
  const contacts = [
    {
      label: "Sales Enquiry",
      number: "+91 9161722416",
      hours: "Mon-Sat, 9AM-6PM",
    },
    {
      label: "Order Support",
      number: "+91 9161722416",
      hours: "Mon-Sat, 9AM-7PM",
    },
    {
      label: "Bulk Orders",
      number: "+91 9161722416",
      hours: "Mon-Fri, 10AM-5PM",
    },
  ];

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-black text-gray-900">Call Us</h1>
        <p className="text-gray-500">
          We're here to help with your bulk order requirements
        </p>
        <div className="mt-3 h-1 w-16 rounded bg-[#F97316]" />
      </div>

      <div className="mb-8 space-y-4">
        {contacts.map((contact) => (
          <a
            key={contact.label}
            href={`tel:${contact.number.replace(/\s/g, "")}`}
            className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-[#0E5A7A] hover:shadow-md"
          >
            <div>
              <div className="mb-1 font-bold text-gray-900">
                {contact.label}
              </div>
              <div className="text-xl font-black text-[#0E5A7A]">
                {contact.number}
              </div>
              <div className="mt-1 text-xs text-gray-400">
                Hours: {contact.hours}
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2DBE6C] text-sm font-bold text-white transition-transform group-hover:scale-110">
              Call
            </div>
          </a>
        ))}
      </div>

      <div className="rounded-2xl bg-[#0E5A7A] p-6 text-center text-white">
        <h2 className="mb-2 text-xl font-bold">WhatsApp Us</h2>
        <p className="mb-4 text-sm text-white/70">
          For quick queries and bulk order discussions
        </p>
        <a
          href="https://wa.me/919161722416?text=Hello%2C%20I%27m%20interested%20in%20your%20industrial%20paper%20bags."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-xl bg-[#25D366] px-8 py-3 font-bold text-white transition-colors hover:bg-[#20B85A]"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}

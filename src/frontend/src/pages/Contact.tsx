import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Contact Us</h1>
        <div className="w-16 h-1 bg-[#F97316] rounded" />
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Send a Message
          </h2>
          {sent ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-500">
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "email", "phone"].map((id) => (
                <div key={id}>
                  <label
                    htmlFor={`cf-${id}`}
                    className="block text-sm font-semibold text-gray-700 mb-1.5 capitalize"
                  >
                    {id} *
                  </label>
                  <input
                    id={`cf-${id}`}
                    type={
                      id === "email" ? "email" : id === "phone" ? "tel" : "text"
                    }
                    required
                    value={(form as Record<string, string>)[id]}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [id]: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30"
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0E5A7A] hover:bg-[#0a4a66] text-white py-3 rounded-xl font-bold transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="bg-[#0E5A7A] text-white rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-4">
              {[
                {
                  icon: "📍",
                  label: "Address",
                  value:
                    "Plot No. 45, Industrial Area, Bhosari, Pune - 411026, Maharashtra",
                },
                { icon: "📞", label: "Phone", value: "+91 98765 43210" },
                { icon: "✉", label: "Email", value: "info@megabags.in" },
                {
                  icon: "🕐",
                  label: "Working Hours",
                  value: "Monday – Saturday: 9:00 AM – 6:00 PM",
                },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <div className="text-white/60 text-xs mb-0.5">{label}</div>
                    <div className="text-sm font-medium">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.174!2d73.8477!3d18.6298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM3JzQ3LjMiTiA3M8KwNTAnNTEuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mega Bags Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

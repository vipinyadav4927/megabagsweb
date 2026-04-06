import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Contact Us</h1>
        <div className="h-1 w-16 rounded bg-[#F97316]" />
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Send a Message
          </h2>
          {sent ? (
            <div className="py-10 text-center">
              <h3 className="mb-2 text-xl font-bold text-gray-900">
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
                    className="mb-1.5 block text-sm font-semibold capitalize text-gray-700"
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
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        [id]: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30"
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-semibold text-gray-700"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      message: event.target.value,
                    }))
                  }
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-[#0E5A7A] py-3 font-bold text-white transition-colors hover:bg-[#0A4A66]"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-[#0E5A7A] p-6 text-white">
            <h2 className="mb-4 text-xl font-bold">Contact Information</h2>
            <div className="space-y-4">
              {[
                {
                  label: "Address",
                  value:
                    "Plot No. 45, Industrial Area, Bhosari, Pune - 411026, Maharashtra",
                },
                { label: "Phone", value: "+91 9161722416" },
                { label: "Email", value: "vipinyadav4926@gmail.com" },
                {
                  label: "Working Hours",
                  value: "Monday - Saturday: 9:00 AM - 6:00 PM",
                },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="mb-0.5 text-xs text-white/60">{label}</div>
                  <div className="text-sm font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-64 overflow-hidden rounded-2xl border border-gray-200">
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

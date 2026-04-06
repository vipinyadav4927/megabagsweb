import { Award, CheckCircle, Factory, Truck, Users } from "lucide-react";

const certificationCards = [
  {
    title: "ISO 9001:2015",
    code: "9001:2015",
    short: "ISO",
    description:
      "Quality management processes audited for consistent manufacturing and dispatch standards.",
    accent: "from-[#0E5A7A] via-[#14789E] to-[#2F9DC7]",
  },
  {
    title: "BIS Certified",
    code: "IS",
    short: "BIS",
    description:
      "Aligned with Indian packaging quality benchmarks for dependable industrial supply.",
    accent: "from-[#0D4A42] via-[#147569] to-[#2DBE6C]",
  },
  {
    title: "FSSAI Approved",
    code: "SAFE",
    short: "FSSAI",
    description:
      "Suitable compliance support for food and ingredient handling applications.",
    accent: "from-[#7B341E] via-[#C05621] to-[#F97316]",
  },
  {
    title: "GST Registered",
    code: "TAX",
    short: "GST",
    description:
      "Fully registered business billing for transparent invoicing and bulk procurement.",
    accent: "from-[#3A2A78] via-[#5B49A8] to-[#8B5CF6]",
  },
  {
    title: "MSME Registered",
    code: "MSME",
    short: "INDIA",
    description:
      "Recognized small enterprise credentials that support trusted commercial operations.",
    accent: "from-[#4B5563] via-[#6B7280] to-[#9CA3AF]",
  },
  {
    title: "Export License",
    code: "GLOBAL",
    short: "EX",
    description:
      "Ready for international documentation, shipment workflows, and export-facing buyers.",
    accent: "from-[#1E3A5F] via-[#245E7A] to-[#2F8CA8]",
  },
] as const;

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
          About Mega Bags
        </h1>
        <div className="w-16 h-1 bg-[#F97316] rounded" />
      </div>

      {/* Hero info */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <img
            src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=700&q=80"
            alt="Factory"
            className="w-full h-72 object-cover rounded-2xl"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-black text-gray-900 mb-4">
            India's Premier Industrial Paper Bag Manufacturer
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Mega Bags has been a trusted name in industrial packaging for over
            15 years. Founded with a vision to provide high-quality, durable,
            and eco-friendly packaging solutions, we have grown to become one of
            India's leading manufacturers of industrial paper bags.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our state-of-the-art manufacturing facility in Pune, Maharashtra, is
            equipped with the latest machinery and technology to produce a wide
            range of paper bags for various industrial applications.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          ["5,00,000+", "Bags Per Month", "#F97316"],
          ["15+", "Years Experience", "#0E5A7A"],
          ["500+", "Happy Clients", "#2DBE6C"],
          ["50+", "Export Countries", "#8B5CF6"],
        ].map(([n, l, c]) => (
          <div
            key={l}
            className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100"
          >
            <div className="text-3xl font-black mb-1" style={{ color: c }}>
              {n}
            </div>
            <div className="text-gray-600 text-sm font-medium">{l}</div>
          </div>
        ))}
      </div>

      {/* Manufacturing */}
      <div className="bg-[#0E5A7A] rounded-2xl p-8 text-white mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Factory size={28} className="text-[#F97316]" />
          <h2 className="text-2xl font-black">
            Manufacturing Capacity & Facilities
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-[#2DBE6C]">
              Production Capacity
            </h3>
            <ul className="space-y-2 text-white/80">
              {[
                "Monthly output: 5,00,000+ bags",
                "24/7 production capability",
                "Multiple production lines",
                "Quality-controlled batches",
                "Custom size & print production",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle
                    size={16}
                    className="text-[#2DBE6C] flex-shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-[#2DBE6C]">
              Machinery & Equipment
            </h3>
            <ul className="space-y-2 text-white/80">
              {[
                "Automatic paper bag making machines",
                "HD multicolor printing presses",
                "HDPE lamination units",
                "Aluminium foil coating lines",
                "Automated quality inspection",
                "Computer-controlled cutting",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle
                    size={16}
                    className="text-[#2DBE6C] flex-shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <h2 className="text-2xl font-black text-gray-900 mb-6">
        Why Choose Mega Bags?
      </h2>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {[
          {
            icon: Award,
            title: "High Quality",
            desc: "ISO 9001:2015 certified. Every batch goes through rigorous quality testing before dispatch.",
            color: "#F97316",
          },
          {
            icon: Users,
            title: "Competitive Pricing",
            desc: "Direct manufacturer pricing with no middlemen. The best rates in the market for bulk orders.",
            color: "#0E5A7A",
          },
          {
            icon: Factory,
            title: "Bulk Production",
            desc: "5,00,000+ bags per month production capacity. We scale with your business needs.",
            color: "#2DBE6C",
          },
          {
            icon: Truck,
            title: "Timely Delivery",
            desc: "Pan-India logistics network ensures your orders reach on time, every time.",
            color: "#8B5CF6",
          },
        ].map(({ icon: Icon, title, desc, color }) => (
          <div
            key={title}
            className="bg-white border border-gray-200 rounded-xl p-6 flex gap-4 hover:shadow-md transition-shadow"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon size={24} style={{ color }} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-xl font-black text-gray-900 mb-2">
          Certifications & Standards
        </h2>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-gray-500">
          A quick snapshot of the registrations and compliance benchmarks that
          support every Mega Bags order.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {certificationCards.map(({ title, code, short, description, accent }) => (
            <article
              key={title}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className={`relative h-32 bg-gradient-to-br ${accent} p-5 text-white`}>
                <div className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white/90">
                  Verified
                </div>
                <div className="flex h-full flex-col justify-end">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75">
                    {code}
                  </div>
                  <div className="text-3xl font-black tracking-[0.16em]">
                    {short}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-lg font-black text-gray-900">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Award, CheckCircle, Factory, Truck, Users } from "lucide-react";

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
        <h2 className="text-xl font-black text-gray-900 mb-4">
          Certifications & Standards
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            "ISO 9001:2015",
            "BIS Certified",
            "FSSAI Approved",
            "GST Registered",
            "MSME Registered",
            "Export License",
          ].map((cert) => (
            <span
              key={cert}
              className="bg-[#0E5A7A] text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

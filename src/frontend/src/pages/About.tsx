import {
  Award,
  CheckCircle,
  Factory,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import { complianceBadges } from "../data/compliance";

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-black text-gray-900 md:text-4xl">
          About Mega Bags
        </h1>
        <div className="h-1 w-16 rounded bg-[#F97316]" />
      </div>

      <div className="mb-12 grid gap-8 md:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <img
            src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=700&q=80"
            alt="Mega Bags manufacturing facility"
            className="h-72 w-full rounded-[28px] object-cover shadow-[0_18px_50px_rgba(11,61,99,0.10)]"
          />
        </div>
        <div className="flex flex-col justify-center rounded-[28px] border border-gray-200 bg-white p-6 shadow-[0_18px_50px_rgba(11,61,99,0.08)] md:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#0E5A7A]/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#0E5A7A]">
            <ShieldCheck size={14} />
            Trusted Manufacturing Profile
          </div>
          <h2 className="mb-4 text-2xl font-black text-gray-900">
            India's Premier Industrial Paper Bag Manufacturer
          </h2>
          <p className="mb-4 leading-relaxed text-gray-600">
            Mega Bags has been a trusted name in industrial packaging for over
            15 years. Founded with a vision to provide high-quality, durable,
            and eco-friendly packaging solutions, we have grown into a reliable
            manufacturing partner for modern businesses.
          </p>
          <p className="leading-relaxed text-gray-600">
            Our production facility in Pune, Maharashtra, is built for
            professional output, responsive service, and supply continuity
            across industrial, food, and export-facing packaging needs.
          </p>
        </div>
      </div>

      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ["5,00,000+", "Bags Per Month", "#F97316"],
          ["15+", "Years Experience", "#0E5A7A"],
          ["500+", "Happy Clients", "#2DBE6C"],
          ["50+", "Export Countries", "#8B5CF6"],
        ].map(([n, l, c]) => (
          <div
            key={l}
            className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
          >
            <div className="mb-1 text-3xl font-black" style={{ color: c }}>
              {n}
            </div>
            <div className="text-sm font-medium text-gray-600">{l}</div>
          </div>
        ))}
      </div>

      <div className="mb-12 rounded-[30px] bg-[#0E5A7A] p-8 text-white shadow-[0_22px_60px_rgba(11,61,99,0.16)]">
        <div className="mb-6 flex items-center gap-3">
          <Factory size={28} className="text-[#F97316]" />
          <h2 className="text-2xl font-black">
            Manufacturing Capacity & Facilities
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-lg font-bold text-[#2DBE6C]">
              Production Capacity
            </h3>
            <ul className="space-y-2 text-white/80">
              {[
                "Monthly output: 5,00,000+ bags",
                "24/7 production capability",
                "Multiple production lines",
                "Quality-controlled batches",
                "Custom size and print production",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle
                    size={16}
                    className="shrink-0 text-[#2DBE6C]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-bold text-[#2DBE6C]">
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
                    className="shrink-0 text-[#2DBE6C]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <h2 className="mb-6 text-2xl font-black text-gray-900">
        Why Choose Mega Bags?
      </h2>
      <div className="mb-12 grid gap-4 md:grid-cols-2">
        {[
          {
            icon: Award,
            title: "High Quality",
            desc: "ISO-led quality discipline with careful production checks before dispatch.",
            color: "#F97316",
          },
          {
            icon: Users,
            title: "Competitive Pricing",
            desc: "Direct manufacturer pricing that helps businesses control costs in bulk procurement.",
            color: "#0E5A7A",
          },
          {
            icon: Factory,
            title: "Bulk Production",
            desc: "A factory setup designed to handle larger volume demand with consistency.",
            color: "#2DBE6C",
          },
          {
            icon: Truck,
            title: "Timely Delivery",
            desc: "Dispatch planning and communication that support repeat purchase confidence.",
            color: "#8B5CF6",
          },
        ].map(({ icon: Icon, title, desc, color }) => (
          <div
            key={title}
            className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon size={24} style={{ color }} />
            </div>
            <div>
              <h3 className="mb-1 font-bold text-gray-900">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[30px] border border-gray-200 bg-white p-6 shadow-[0_18px_50px_rgba(11,61,99,0.08)] md:p-8">
        <h2 className="mb-2 text-xl font-black text-gray-900 md:text-2xl">
          Certifications & Standards
        </h2>
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-gray-500 md:text-base">
          Presented with logo-style compliance badges so buyers immediately feel
          they are dealing with a serious, organized, and trustworthy company.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {complianceBadges.map((badge) => (
            <article
              key={badge.id}
              className="overflow-hidden rounded-[28px] border border-gray-200 bg-[#FBFCFD] shadow-[0_12px_35px_rgba(11,61,99,0.06)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(11,61,99,0.10)]"
            >
              <div className="border-b border-gray-200 bg-white px-5 py-5">
                <img
                  src={badge.logoSrc}
                  alt={badge.title}
                  className="h-24 w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-5">
                <div className="mb-2 inline-flex rounded-full bg-[#0E5A7A]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0E5A7A]">
                  {badge.subtitle}
                </div>
                <h3 className="mb-2 text-lg font-black text-gray-900">
                  {badge.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {badge.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

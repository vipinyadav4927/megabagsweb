import {
  ArrowRight,
  Award,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Factory,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { complianceBadges } from "../data/compliance";

export default function Home() {
  const { products } = useApp();
  const [slideIndex, setSlideIndex] = useState(0);

  const trustHighlights = [
    { value: "15+", label: "Years in industrial packaging" },
    { value: "500+", label: "Business buyers served" },
    { value: "5L+", label: "Bags produced monthly" },
    { value: "Pan India", label: "Delivery and dispatch support" },
  ];

  const operationalPromises = [
    {
      icon: Factory,
      title: "Built for bulk manufacturing",
      detail:
        "Flexible production for valve, laminated, open-mouth, and multiwall bags.",
    },
    {
      icon: ShieldCheck,
      title: "Compliance-first operations",
      detail:
        "Trust-building registrations and standards that buyers expect from serious suppliers.",
    },
    {
      icon: Clock3,
      title: "Responsive order handling",
      detail:
        "Clear communication for quotation, dispatch, and repeat order planning.",
    },
  ];

  useEffect(() => {
    const featuredProducts = products.slice(0, 4);
    if (featuredProducts.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setSlideIndex((index) => (index + 1) % featuredProducts.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [products]);

  const featured = products.slice(0, 4);

  return (
    <div className="page-enter">
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(5,35,57,0.94)_0%,rgba(8,55,86,0.88)_48%,rgba(10,70,96,0.68)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.28),transparent_28%),radial-gradient(circle_at_left_center,rgba(47,157,199,0.18),transparent_34%)]" />

        <div className="relative z-10 mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-6 py-16 md:min-h-[680px] md:py-20 lg:grid-cols-[minmax(0,1.08fr)_360px]">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-white/90 shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur">
              Premium Industrial Packaging
            </div>
            <h1 className="max-w-3xl text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl">
              Trusted Paper Bag
              <br />
              Supply for Growing
              <br />
              Industries
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/78 md:text-lg">
              Mega Bags helps manufacturers, exporters, and distributors source
              dependable industrial paper bags with cleaner branding, serious
              compliance signals, and responsive bulk-order support.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="flex items-center gap-2 rounded-full bg-[#2DBE6C] px-6 py-3 font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#26a85e]"
              >
                View Products <ArrowRight size={18} />
              </Link>
              <Link
                to="/order"
                className="rounded-full bg-[#F97316] px-6 py-3 font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#e8660e]"
              >
                Place Order
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {trustHighlights.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/14 bg-white/10 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur"
                >
                  <div className="text-2xl font-black text-[#FDBA74]">
                    {value}
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-white/72">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-white/55">
                Compliance Signals
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {complianceBadges.slice(0, 4).map((badge) => (
                  <div
                    key={badge.id}
                    className="rounded-2xl border border-white/14 bg-white/95 p-3 shadow-[0_14px_35px_rgba(0,0,0,0.12)]"
                  >
                    <img
                      src={badge.logoSrc}
                      alt={badge.title}
                      className="h-14 w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/14 bg-white/10 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <div className="rounded-[26px] bg-white p-6 shadow-[0_18px_50px_rgba(11,61,99,0.10)]">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#0E5A7A]/50">
                    Operational Snapshot
                  </div>
                  <h2 className="mt-2 text-2xl font-black text-[#0B2132]">
                    Professional supply that looks dependable at first glance
                  </h2>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F97316]/10 text-[#F97316]">
                  <Factory size={22} />
                </div>
              </div>

              <div className="space-y-3">
                {operationalPromises.map(({ icon: Icon, title, detail }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-gray-100 bg-[#F8FBFD] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0E5A7A]/10 text-[#0E5A7A]">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#10293B]">{title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-gray-500">
                          {detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  ["MOQ", "1000+"],
                  ["Support", "Fast"],
                  ["Reach", "India"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl bg-[#0B2132] px-4 py-3 text-center text-white"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                      {label}
                    </div>
                    <div className="mt-1 text-lg font-black">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-6 px-6 pb-4 md:-mt-10 md:pb-8">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-[28px] bg-white p-5 shadow-[0_24px_70px_rgba(11,61,99,0.10)] md:grid-cols-4 md:p-6">
          {[
            ["5,00,000+", "Bags / Month"],
            ["15+", "Years Experience"],
            ["500+", "Happy Clients"],
            ["5", "Product Lines"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="rounded-2xl bg-[#F8FBFD] px-4 py-4 text-center"
            >
              <div className="text-2xl font-black text-[#F97316] md:text-3xl">
                {number}
              </div>
              <div className="mt-1 text-sm font-medium text-gray-500">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#0E5A7A]/50">
              Product Spotlight
            </div>
            <h2 className="text-2xl font-black text-gray-900 md:text-3xl">
              Featured Products
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500 md:text-base">
              Explore the bag formats buyers ask for most often across
              industrial, food, and export packaging requirements.
            </p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1 text-sm font-semibold text-[#0E5A7A] hover:underline"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-gray-200 bg-white p-3 shadow-[0_18px_50px_rgba(11,61,99,0.08)] md:p-4">
          <div className="overflow-hidden rounded-[24px]">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${slideIndex * 100}%)` }}
            >
              {featured.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="relative h-[340px] overflow-hidden rounded-[22px] md:h-[430px]">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,33,50,0.06)_0%,rgba(11,33,50,0.82)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between md:p-8">
                      <div className="max-w-2xl">
                        <div className="mb-3 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white/80 backdrop-blur">
                          Mega Bags Range
                        </div>
                        <h3 className="mb-2 text-2xl font-black text-white md:text-3xl">
                          {product.name}
                        </h3>
                        <p className="max-w-xl text-sm leading-relaxed text-white/78 md:text-base">
                          {product.description}
                        </p>
                      </div>
                      <Link
                        to={`/products/${product.id}`}
                        className="self-start rounded-full bg-[#F97316] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#e8660e]"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {featured.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setSlideIndex(
                    (index) => (index - 1 + featured.length) % featured.length,
                  )
                }
                className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/92 p-2.5 text-gray-800 shadow-lg transition-colors hover:bg-white"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setSlideIndex((index) => (index + 1) % featured.length)
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/92 p-2.5 text-gray-800 shadow-lg transition-colors hover:bg-white"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {featured.length > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {featured.map((product, index) => (
                <button
                  type="button"
                  key={product.id}
                  onClick={() => setSlideIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    index === slideIndex ? "bg-[#0E5A7A]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#0E5A7A]/50">
                Full Catalog
              </div>
              <h2 className="text-2xl font-black text-gray-900 md:text-3xl">
                Our Product Range
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-gray-500 md:text-base">
              Purpose-built paper bag formats for cement, chemicals,
              fertilizers, minerals, food ingredients, and export supply chains.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group rounded-[24px] border border-gray-200 bg-white p-4 shadow-[0_10px_30px_rgba(11,61,99,0.05)] transition-all duration-200 hover:-translate-y-1 hover:border-[#0E5A7A]/20 hover:shadow-[0_16px_40px_rgba(11,61,99,0.10)]"
              >
                <div className="mb-3 aspect-square overflow-hidden rounded-[18px] bg-[#F4F7F8]">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-1 text-sm font-bold leading-tight text-gray-900">
                  {product.name}
                </h3>
                <span className="text-xs font-semibold text-[#0E5A7A]">
                  View Details
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/products"
              className="inline-block rounded-full border-2 border-[#0E5A7A] px-8 py-3 font-bold text-[#0E5A7A] transition-all hover:bg-[#0E5A7A] hover:text-white"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 md:py-12">
        <div className="mx-auto max-w-7xl rounded-[34px] bg-[linear-gradient(140deg,#0C314D_0%,#0E5A7A_52%,#15708F_100%)] p-6 text-white shadow-[0_26px_70px_rgba(11,61,99,0.20)] md:p-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-white/55">
                Trust and Compliance
              </div>
              <h2 className="text-2xl font-black md:text-3xl">
                Certifications that help your company feel credible from the first visit
              </h2>
            </div>
            <Link
              to="/about"
              className="text-sm font-semibold text-white/80 transition-colors hover:text-white"
            >
              View Company Profile
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {complianceBadges.slice(0, 4).map((badge) => (
              <div
                key={badge.id}
                className="rounded-[26px] border border-white/12 bg-white/96 p-4 text-[#10293B] shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
              >
                <img
                  src={badge.logoSrc}
                  alt={badge.title}
                  className="h-20 w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <div className="mt-4 text-lg font-black">{badge.title}</div>
                <div className="mt-1 text-sm text-gray-500">
                  {badge.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:py-14">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-gray-200 bg-white p-6 shadow-[0_18px_50px_rgba(11,61,99,0.08)] md:p-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#0E5A7A]/50">
                Why Mega Bags
              </div>
              <h2 className="text-2xl font-black text-gray-900 md:text-3xl">
                Reliable enough for repeat orders
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-gray-500 md:text-base">
              The site now presents your business more like a serious supplier:
              cleaner structure, stronger trust cues, and better mobile balance.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: Award,
                title: "High Quality",
                desc: "Controlled production and inspection before dispatch.",
              },
              {
                icon: Users,
                title: "Competitive Pricing",
                desc: "Manufacturer-direct value for repeat and bulk orders.",
              },
              {
                icon: CheckCircle,
                title: "Bulk Production",
                desc: "Production planning suited for larger monthly demand.",
              },
              {
                icon: Truck,
                title: "Timely Delivery",
                desc: "Dispatch support built for operational reliability.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-[26px] bg-[#F8FBFD] p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0E5A7A]/10">
                  <Icon className="text-[#0E5A7A]" size={24} />
                </div>
                <h3 className="mb-2 font-bold text-gray-900">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0E5A7A] py-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-2xl font-black text-white md:text-3xl">
            Ready to Place a Bulk Order?
          </h2>
          <p className="mb-8 text-white/70">
            Minimum order quantity: 1000 bags. Get competitive pricing for your
            business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/order"
              className="rounded-full bg-[#F97316] px-8 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-[#e8660e]"
            >
              Place Order Now
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3 font-bold text-white transition-all hover:bg-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

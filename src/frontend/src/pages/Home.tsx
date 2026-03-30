import {
  ArrowRight,
  Award,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Truck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Home() {
  const { products } = useApp();
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setSlideIndex((i) => (i + 1) % products.slice(0, 4).length),
      3500,
    );
    return () => clearInterval(t);
  }, [products]);

  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[520px] md:min-h-[600px] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D63]/90 via-[#0B3D63]/70 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-xl">
            <div className="inline-block bg-[#F97316] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              India's Trusted Manufacturer
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase leading-tight mb-4">
              CARRIES
              <br />
              YOUR TRUST
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-8 leading-relaxed">
              Premium industrial paper bags for cement, chemicals, fertilizers
              and more. 5,00,000+ bags manufactured every month.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                className="bg-[#2DBE6C] hover:bg-[#26a85e] text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all hover:scale-105"
              >
                View Products <ArrowRight size={18} />
              </Link>
              <Link
                to="/order"
                className="bg-[#F97316] hover:bg-[#e8660e] text-white px-6 py-3 rounded-lg font-bold transition-all hover:scale-105"
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#0E5A7A] text-white py-4">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ["5,00,000+", "Bags / Month"],
            ["15+", "Years Experience"],
            ["500+", "Happy Clients"],
            ["5", "Product Lines"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="text-2xl md:text-3xl font-black text-[#F97316]">
                {n}
              </div>
              <div className="text-xs text-white/70 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Slider */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="text-[#0E5A7A] font-semibold text-sm hover:underline flex items-center gap-1"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${slideIndex * 100}%)` }}
            >
              {featured.map((p) => (
                <div key={p.id} className="w-full flex-shrink-0">
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-white text-xl font-bold mb-1">
                        {p.name}
                      </h3>
                      <p className="text-white/80 text-sm mb-3 line-clamp-2">
                        {p.description}
                      </p>
                      <Link
                        to={`/products/${p.id}`}
                        className="self-start bg-[#F97316] hover:bg-[#e8660e] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              setSlideIndex((i) => (i - 1 + featured.length) % featured.length)
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => setSlideIndex((i) => (i + 1) % featured.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
          <div className="flex justify-center gap-2 mt-3">
            {featured.map((p, i) => (
              <button
                type="button"
                key={p.id}
                onClick={() => setSlideIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === slideIndex ? "bg-[#0E5A7A]" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-8">
            Our Product Range
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-3">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1">
                  {p.name}
                </h3>
                <span className="text-xs text-[#0E5A7A] font-semibold">
                  View Details →
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-block border-2 border-[#0E5A7A] text-[#0E5A7A] hover:bg-[#0E5A7A] hover:text-white px-8 py-3 rounded-lg font-bold transition-all"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-10">
            Why Choose Mega Bags?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: "High Quality",
                desc: "ISO certified manufacturing with strict quality control",
              },
              {
                icon: Users,
                title: "Competitive Pricing",
                desc: "Best rates for bulk orders with no compromise on quality",
              },
              {
                icon: CheckCircle,
                title: "Bulk Production",
                desc: "5,00,000+ bags per month capacity to meet any demand",
              },
              {
                icon: Truck,
                title: "Timely Delivery",
                desc: "Pan-India delivery with guaranteed timelines",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#0E5A7A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-[#0E5A7A]" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-[#0E5A7A] py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Ready to Place a Bulk Order?
          </h2>
          <p className="text-white/70 mb-8">
            Minimum order quantity: 1000 bags. Get competitive pricing for your
            business.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/order"
              className="bg-[#F97316] hover:bg-[#e8660e] text-white px-8 py-3 rounded-lg font-bold transition-all hover:scale-105"
            >
              Place Order Now
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-lg font-bold transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

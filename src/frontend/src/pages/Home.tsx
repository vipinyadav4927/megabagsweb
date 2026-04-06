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
import BrandLogo from "../components/BrandLogo";
import { useApp } from "../context/AppContext";

export default function Home() {
  const { products } = useApp();
  const [slideIndex, setSlideIndex] = useState(0);

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
    <div>
      <section
        className="relative flex min-h-[520px] items-center bg-cover bg-center md:min-h-[600px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D63]/90 via-[#0B3D63]/72 to-transparent" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-2xl">
            <div className="mb-4 inline-block rounded-full bg-[#F97316] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              India's Trusted Manufacturer
            </div>
            <BrandLogo variant="hero" className="mb-6" />
            <h1 className="mb-4 text-4xl font-black uppercase leading-tight text-white md:text-5xl">
              Bulk Packaging
              <br />
              Built for Trust
            </h1>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Premium industrial paper bags for cement, chemicals,
              fertilizers, food ingredients, and export-ready supply chains.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                className="flex items-center gap-2 rounded-lg bg-[#2DBE6C] px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-[#26a85e]"
              >
                View Products <ArrowRight size={18} />
              </Link>
              <Link
                to="/order"
                className="rounded-lg bg-[#F97316] px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-[#e8660e]"
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0E5A7A] py-4 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 text-center md:grid-cols-4">
          {[
            ["5,00,000+", "Bags / Month"],
            ["15+", "Years Experience"],
            ["500+", "Happy Clients"],
            ["5", "Product Lines"],
          ].map(([number, label]) => (
            <div key={label}>
              <div className="text-2xl font-black text-[#F97316] md:text-3xl">
                {number}
              </div>
              <div className="mt-0.5 text-xs text-white/70">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 md:text-3xl">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="flex items-center gap-1 text-sm font-semibold text-[#0E5A7A] hover:underline"
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
              {featured.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="relative h-64 overflow-hidden rounded-xl md:h-80">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="mb-1 text-xl font-bold text-white">
                        {product.name}
                      </h3>
                      <p className="mb-3 line-clamp-2 text-sm text-white/80">
                        {product.description}
                      </p>
                      <Link
                        to={`/products/${product.id}`}
                        className="self-start rounded-lg bg-[#F97316] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#e8660e]"
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
              setSlideIndex((index) => (index - 1 + featured.length) % featured.length)
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 shadow-lg transition-colors hover:bg-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() =>
              setSlideIndex((index) => (index + 1) % featured.length)
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 shadow-lg transition-colors hover:bg-white"
          >
            <ChevronRight size={20} />
          </button>
          <div className="mt-3 flex justify-center gap-2">
            {featured.map((product, index) => (
              <button
                type="button"
                key={product.id}
                onClick={() => setSlideIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === slideIndex ? "bg-[#0E5A7A]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-8 text-center text-2xl font-black text-gray-900 md:text-3xl">
            Our Product Range
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-3 aspect-square overflow-hidden rounded-lg">
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
              className="inline-block rounded-lg border-2 border-[#0E5A7A] px-8 py-3 font-bold text-[#0E5A7A] transition-all hover:bg-[#0E5A7A] hover:text-white"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-center text-2xl font-black text-gray-900 md:text-3xl">
            Why Choose Mega Bags?
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
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
                className="rounded-xl bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0E5A7A]/10">
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
              className="rounded-lg bg-[#F97316] px-8 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-[#e8660e]"
            >
              Place Order Now
            </Link>
            <Link
              to="/contact"
              className="rounded-lg border border-white/30 bg-white/10 px-8 py-3 font-bold text-white transition-all hover:bg-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

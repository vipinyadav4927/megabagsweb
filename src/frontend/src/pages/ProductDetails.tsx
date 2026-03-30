import { ChevronLeft, Package, Star } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

const REVIEWS = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    date: "Jan 2025",
    text: "Excellent quality bags. We use them for cement packaging and they hold up perfectly even in humid conditions.",
  },
  {
    name: "Priya Sharma",
    rating: 5,
    date: "Dec 2024",
    text: "Best bulk packaging supplier. Timely delivery, great quality, and competitive pricing. Highly recommended.",
  },
  {
    name: "Amit Patel",
    rating: 4,
    date: "Nov 2024",
    text: "Good product quality and fast delivery. The bags are strong and printed clearly. Will order again.",
  },
  {
    name: "Sunita Verma",
    rating: 5,
    date: "Oct 2024",
    text: "We've been using Mega Bags for 3 years. Consistent quality and excellent customer service every time.",
  },
  {
    name: "Dinesh Mehta",
    rating: 4,
    date: "Sep 2024",
    text: "Great value for money. The HDPE laminated bags are perfect for our fertilizer products. No moisture issues.",
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useApp();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [imgVisible, setImgVisible] = useState(true);

  if (!product)
    return (
      <div className="text-center py-20 page-enter">
        <p className="text-gray-500 mb-4">Product not found</p>
        <Link to="/products" className="text-[#0E5A7A] font-semibold">
          ← Back to Products
        </Link>
      </div>
    );

  const images = product.images?.length ? product.images : [product.imageUrl];

  const switchImage = (idx: number) => {
    if (idx === activeImage) return;
    setImgVisible(false);
    setTimeout(() => {
      setActiveImage(idx);
      setImgVisible(true);
    }, 200);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 page-enter">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-[#0E5A7A] font-semibold mb-6 hover:underline transition-all hover:-translate-x-1"
      >
        <ChevronLeft size={18} /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        {/* Image Gallery */}
        <div>
          {/* Main Image with zoom on hover */}
          <div className="aspect-square rounded-2xl overflow-hidden mb-4 border border-gray-200 shadow-md bg-gray-50 relative group">
            <img
              key={activeImage}
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              style={{
                opacity: imgVisible ? 1 : 0,
                transition: "opacity 0.2s ease-in-out, transform 0.4s ease",
              }}
            />
            {/* Image counter badge */}
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
              {activeImage + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {images.map((img, idx) => (
              <button
                type="button"
                key={img}
                onClick={() => switchImage(idx)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 hover:scale-105 focus:outline-none ${
                  activeImage === idx
                    ? "border-[#0E5A7A] shadow-lg shadow-[#0E5A7A]/20 ring-2 ring-[#0E5A7A]/30"
                    : "border-gray-200 hover:border-[#0E5A7A]/50"
                }`}
              >
                <img
                  src={img}
                  alt={`View ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {activeImage === idx && (
                  <div className="absolute inset-0 bg-[#0E5A7A]/10" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
            {product.name}
          </h1>
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="text-gray-500 text-sm ml-1">(5 reviews)</span>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3 mb-6 hover:shadow-md transition-shadow">
            <Package className="text-[#F97316]" size={24} />
            <div>
              <div className="font-bold text-gray-900">
                Minimum Order Quantity
              </div>
              <div className="text-[#F97316] font-black text-lg">1000 Bags</div>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-2">Specifications</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              {product.specs.split(" | ").map((spec) => {
                const [key, val] = spec.split(": ");
                return (
                  <div
                    key={spec}
                    className="flex justify-between py-1.5 border-b border-gray-200 last:border-0"
                  >
                    <span className="text-gray-500 text-sm">{key}</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {val}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-2">Applications</h3>
            <div className="flex flex-wrap gap-2">
              {product.applications.split(", ").map((app) => (
                <span
                  key={app}
                  className="bg-[#0E5A7A]/10 text-[#0E5A7A] px-3 py-1 rounded-full text-sm font-medium hover:bg-[#0E5A7A]/20 transition-colors cursor-default"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          <Link
            to={`/order?product=${encodeURIComponent(product.name)}`}
            className="block w-full bg-[#F97316] hover:bg-[#e8660e] text-white text-center py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-200 active:scale-[0.98]"
          >
            🛒 Place Order (Min. 1000 bags)
          </Link>
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-xl font-black text-gray-900 mb-6">
          Customer Reviews
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-gray-900">{r.name}</div>
                  <div className="text-gray-400 text-xs">{r.date}</div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={
                        s <= r.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

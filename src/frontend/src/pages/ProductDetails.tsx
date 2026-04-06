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
  const product = products.find((item) => item.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [imageVisible, setImageVisible] = useState(true);

  if (!product)
    return (
      <div className="page-enter py-20 text-center">
        <p className="mb-4 text-gray-500">Product not found</p>
        <Link to="/products" className="font-semibold text-[#0E5A7A]">
          Back to Products
        </Link>
      </div>
    );

  const images = product.images?.length ? product.images : [product.imageUrl];

  const switchImage = (index: number) => {
    if (index === activeImage) return;

    setImageVisible(false);
    setTimeout(() => {
      setActiveImage(index);
      setImageVisible(true);
    }, 200);
  };

  return (
    <div className="page-enter mx-auto max-w-6xl px-6 py-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-1 font-semibold text-[#0E5A7A] transition-all hover:-translate-x-1 hover:underline"
      >
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-12 grid gap-10 md:grid-cols-2">
        <div>
          <div className="group relative mb-4 aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-md">
            <img
              key={activeImage}
              src={images[activeImage]}
              alt={product.name}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
              style={{
                opacity: imageVisible ? 1 : 0,
                transition: "opacity 0.2s ease-in-out, transform 0.4s ease",
              }}
            />
            <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {activeImage + 1} / {images.length}
            </div>
          </div>

          <div className="flex gap-3">
            {images.map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => switchImage(index)}
                className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all duration-200 hover:scale-105 focus:outline-none ${
                  activeImage === index
                    ? "border-[#0E5A7A] shadow-lg shadow-[#0E5A7A]/20 ring-2 ring-[#0E5A7A]/30"
                    : "border-gray-200 hover:border-[#0E5A7A]/50"
                }`}
              >
                <img
                  src={image}
                  alt={`View ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                {activeImage === index && (
                  <div className="absolute inset-0 bg-[#0E5A7A]/10" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="mb-3 text-2xl font-black text-gray-900 md:text-3xl">
            {product.name}
          </h1>
          <div className="mb-4 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="ml-1 text-sm text-gray-500">(5 reviews)</span>
          </div>
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 transition-shadow hover:shadow-md">
            <Package className="text-[#F97316]" size={24} />
            <div>
              <div className="font-bold text-gray-900">
                Minimum Order Quantity
              </div>
              <div className="text-lg font-black text-[#F97316]">1000 Bags</div>
            </div>
          </div>
          <p className="mb-6 leading-relaxed text-gray-600">
            {product.description}
          </p>

          <div className="mb-6">
            <h3 className="mb-2 font-bold text-gray-900">Specifications</h3>
            <div className="rounded-xl bg-gray-50 p-4">
              {product.specs.split(" | ").map((spec) => {
                const [key, value] = spec.split(": ");
                return (
                  <div
                    key={spec}
                    className="flex justify-between border-b border-gray-200 py-1.5 last:border-0"
                  >
                    <span className="text-sm text-gray-500">{key}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-2 font-bold text-gray-900">Applications</h3>
            <div className="flex flex-wrap gap-2">
              {product.applications.split(", ").map((application) => (
                <span
                  key={application}
                  className="cursor-default rounded-full bg-[#0E5A7A]/10 px-3 py-1 text-sm font-medium text-[#0E5A7A] transition-colors hover:bg-[#0E5A7A]/20"
                >
                  {application}
                </span>
              ))}
            </div>
          </div>

          <Link
            to={`/order?product=${encodeURIComponent(product.name)}`}
            className="block w-full rounded-xl bg-[#F97316] py-4 text-center text-lg font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#E8660E] hover:shadow-lg hover:shadow-orange-200 active:scale-[0.98]"
          >
            Place Order (Min. 1000 bags)
          </Link>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-xl font-black text-gray-900">
          Customer Reviews
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="font-bold text-gray-900">{review.name}</div>
                  <div className="text-xs text-gray-400">{review.date}</div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

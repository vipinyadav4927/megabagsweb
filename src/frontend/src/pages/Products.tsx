import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const categories = [
  { id: "all", label: "All" },
  { id: "valve", label: "Valve Bags" },
  { id: "open-mouth", label: "Open Mouth" },
  { id: "multiwall", label: "Multiwall" },
  { id: "laminated", label: "Laminated" },
  { id: "foil", label: "Foil Bags" },
];

export default function Products() {
  const { products } = useApp();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = products.filter((product) => {
    const matchSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "all" || product.category === activeCategory;

    return matchSearch && matchCategory;
  });

  return (
    <div className="page-enter mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-black text-gray-900 md:text-4xl">
          Our Range
        </h1>
        <p className="text-gray-500">
          Industrial paper bags for every application
        </p>
        <div className="mt-3 h-1 w-16 rounded bg-[#F97316]" />
      </div>

      <div className="relative mb-6">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 transition-shadow hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeCategory === category.id
                ? "scale-105 bg-[#0E5A7A] text-white shadow-md shadow-[#0E5A7A]/30"
                : "border border-gray-200 bg-white text-gray-600 hover:border-[#0E5A7A] hover:text-[#0E5A7A] hover:shadow-sm"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p className="font-medium">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-[#0E5A7A]/30 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#0E5A7A]/0 transition-colors duration-300 group-hover:bg-[#0E5A7A]/5" />
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-sm font-bold leading-tight text-gray-900 transition-colors duration-200 group-hover:text-[#0E5A7A] md:text-base">
                  {product.name}
                </h3>
                <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-gray-500 md:text-sm">
                  {product.description}
                </p>
                <div className="flex gap-2">
                  <Link
                    to={`/products/${product.id}`}
                    className="flex-1 rounded-lg bg-[#0E5A7A] py-2 text-center text-xs font-semibold text-white transition-all hover:shadow-md active:scale-95 md:text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

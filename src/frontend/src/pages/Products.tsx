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

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 page-enter">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
          Our Range
        </h1>
        <p className="text-gray-500">
          Industrial paper bags for every application
        </p>
        <div className="w-16 h-1 bg-[#F97316] rounded mt-3" />
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E5A7A]/30 bg-white transition-shadow hover:shadow-sm"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button
            type="button"
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === c.id
                ? "bg-[#0E5A7A] text-white shadow-md shadow-[#0E5A7A]/30 scale-105"
                : "bg-white border border-gray-200 text-gray-600 hover:border-[#0E5A7A] hover:text-[#0E5A7A] hover:shadow-sm"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-4xl mb-3">📦</div>
          <p className="font-medium">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-2 hover:border-[#0E5A7A]/30 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0E5A7A]/0 group-hover:bg-[#0E5A7A]/5 transition-colors duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight mb-2 group-hover:text-[#0E5A7A] transition-colors duration-200">
                  {p.name}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">
                  {p.description}
                </p>
                <div className="flex gap-2">
                  <Link
                    to={`/products/${p.id}`}
                    className="flex-1 bg-[#0E5A7A] hover:bg-[#0a4a66] text-white text-center py-2 rounded-lg text-xs md:text-sm font-semibold transition-all hover:shadow-md active:scale-95"
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

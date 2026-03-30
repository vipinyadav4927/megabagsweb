import { Home, MapPin, Package, Phone, ShoppingCart } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ChatBot from "./ChatBot";
import WhatsAppButton from "./WhatsAppButton";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Our Range" },
  { to: "/order", label: "Place Order" },
  { to: "/track", label: "Track Order" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

const mobileNav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/products", label: "Products", icon: Package },
  { to: "/order", label: "Order", icon: ShoppingCart },
  { to: "/track", label: "Track", icon: MapPin },
  { to: "/contact", label: "Contact", icon: Phone },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Desktop Navbar */}
      <header className="hidden md:block sticky top-0 z-50">
        <div className="bg-[#0B3D63] py-1.5 px-4 text-xs text-white/80 flex justify-end gap-6">
          <a
            href="tel:+919161722416"
            className="hover:text-white transition-colors"
          >
            📞 +91 9161722416
          </a>
          <a
            href="mailto:vipinyadav4926@gmail.com"
            className="hover:text-white transition-colors"
          >
            ✉ vipinyadav4926@gmail.com
          </a>
          <Link to="/call" className="hover:text-white transition-colors">
            Call Us
          </Link>
        </div>
        <nav className="bg-[#0E5A7A] px-6 py-3 flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 mr-6">
            <div className="w-9 h-9 bg-[#F97316] rounded-lg flex items-center justify-center text-white font-black text-lg leading-none">
              M
            </div>
            <div>
              <div className="text-white font-black text-lg leading-tight tracking-wide">
                MEGA BAGS
              </div>
              <div className="text-white/60 text-[10px] leading-tight">
                Industrial Packaging
              </div>
            </div>
          </Link>
          <div className="flex-1 flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  location.pathname === l.to
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            to="/call"
            className="bg-[#2DBE6C] hover:bg-[#26a85e] text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            📞 Call Us
          </Link>
        </nav>
      </header>

      {/* Mobile Navbar */}
      <header className="md:hidden sticky top-0 z-50 bg-[#0E5A7A] px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center text-white font-black text-base">
            M
          </div>
          <span className="text-white font-black text-base tracking-wide">
            MEGA BAGS
          </span>
        </Link>
        <Link
          to="/call"
          className="bg-[#2DBE6C] text-white px-3 py-1.5 rounded-lg text-xs font-bold"
        >
          📞 Call Us
        </Link>
      </header>

      {/* Page content */}
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Footer - desktop only */}
      <footer className="hidden md:block bg-[#1F2328] text-white pt-12 pb-6">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center font-black">
                M
              </div>
              <span className="font-black text-lg">MEGA BAGS</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Premium industrial paper bags manufacturer. Trusted by thousands
              of businesses across India.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-white/90">Products</h4>
            <div className="space-y-2 text-sm text-white/60">
              {[
                "Valve Paper Bags",
                "Open Mouth Paper Bags",
                "Multiwall Paper Bags",
                "HDPE Laminated Bags",
                "Aluminium Foil Bags",
              ].map((p) => (
                <div key={p}>
                  <Link
                    to="/products"
                    className="hover:text-white transition-colors"
                  >
                    {p}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-white/90">Company</h4>
            <div className="space-y-2 text-sm text-white/60">
              {(
                [
                  ["About Us", "/about"],
                  ["Our Range", "/products"],
                  ["Place Order", "/order"],
                  ["Track Order", "/track"],
                ] as [string, string][]
              ).map(([l, t]) => (
                <div key={t}>
                  <Link to={t} className="hover:text-white transition-colors">
                    {l}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-white/90">Contact</h4>
            <div className="space-y-2 text-sm text-white/60">
              <div>📍 Industrial Area, Pune, Maharashtra</div>
              <div>📞 +91 9161722416</div>
              <div>✉ vipinyadav4926@gmail.com</div>
              <div>🕐 Mon–Sat: 9AM–6PM</div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 border-t border-white/10 pt-6 flex justify-between items-center text-sm text-white/40">
          <span>
            © {new Date().getFullYear()} Mega Bags. All rights reserved.
          </span>
          <span>Manufacturer | Supplier | Exporter</span>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex">
        {mobileNav.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium transition-colors ${
              location.pathname === to
                ? "text-[#0E5A7A]"
                : "text-gray-500 hover:text-[#0E5A7A]"
            }`}
          >
            <Icon
              size={20}
              className={
                location.pathname === to ? "text-[#0E5A7A]" : "text-gray-400"
              }
            />
            {label}
          </Link>
        ))}
      </nav>

      {/* Floating Widgets */}
      <WhatsAppButton />
      <ChatBot />
    </div>
  );
}

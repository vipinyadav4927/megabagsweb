import { Home, MapPin, Package, Phone, ShoppingCart } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";
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
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-50 hidden md:block">
        <div className="flex justify-end gap-6 bg-[#0B3D63] px-4 py-1.5 text-xs text-white/80">
          <a
            href="tel:+919161722416"
            className="transition-colors hover:text-white"
          >
            Call: +91 9161722416
          </a>
          <a
            href="mailto:vipinyadav4926@gmail.com"
            className="transition-colors hover:text-white"
          >
            Email: vipinyadav4926@gmail.com
          </a>
          <Link to="/call" className="transition-colors hover:text-white">
            Call Us
          </Link>
        </div>
        <nav className="flex items-center gap-6 bg-[#0E5A7A] px-6 py-3">
          <Link to="/" className="mr-4 block">
            <BrandLogo variant="nav" />
          </Link>
          <div className="flex flex-1 items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            to="/call"
            className="rounded-lg bg-[#2DBE6C] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#26A85E]"
          >
            Call Us
          </Link>
        </nav>
      </header>

      <header className="sticky top-0 z-50 flex items-center justify-between bg-[#0E5A7A] px-4 py-3 md:hidden">
        <Link to="/" className="block">
          <BrandLogo variant="mobile" />
        </Link>
        <Link
          to="/call"
          className="rounded-lg bg-[#2DBE6C] px-3 py-1.5 text-xs font-bold text-white"
        >
          Call Us
        </Link>
      </header>

      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>

      <footer className="hidden bg-[#1F2328] pb-6 pt-12 text-white md:block">
        <div className="mx-auto mb-8 grid max-w-6xl grid-cols-4 gap-8 px-6">
          <div>
            <BrandLogo variant="footer" className="mb-4" />
            <p className="text-sm leading-relaxed text-white/60">
              Carries your trust with premium industrial paper bags,
              dependable bulk supply, and responsive service across India.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-bold text-white/90">Products</h4>
            <div className="space-y-2 text-sm text-white/60">
              {[
                "Valve Paper Bags",
                "Open Mouth Paper Bags",
                "Multiwall Paper Bags",
                "HDPE Laminated Bags",
                "Aluminium Foil Bags",
              ].map((product) => (
                <div key={product}>
                  <Link
                    to="/products"
                    className="transition-colors hover:text-white"
                  >
                    {product}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-bold text-white/90">Company</h4>
            <div className="space-y-2 text-sm text-white/60">
              {(
                [
                  ["About Us", "/about"],
                  ["Our Range", "/products"],
                  ["Place Order", "/order"],
                  ["Track Order", "/track"],
                ] as [string, string][]
              ).map(([label, to]) => (
                <div key={to}>
                  <Link to={to} className="transition-colors hover:text-white">
                    {label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-bold text-white/90">Contact</h4>
            <div className="space-y-2 text-sm text-white/60">
              <div>Industrial Area, Pune, Maharashtra</div>
              <div>+91 9161722416</div>
              <div>vipinyadav4926@gmail.com</div>
              <div>Mon-Sat: 9AM-6PM</div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-white/10 px-6 pt-6 text-sm text-white/40">
          <span>
            Copyright {new Date().getFullYear()} Mega Bags. All rights reserved.
          </span>
          <span>Manufacturer | Supplier | Exporter</span>
        </div>
      </footer>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-gray-200 bg-white md:hidden">
        {mobileNav.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
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

      <WhatsAppButton />
      <ChatBot />
    </div>
  );
}

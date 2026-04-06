type BrandLogoVariant = "hero" | "nav" | "mobile" | "footer";

const variantClasses: Record<BrandLogoVariant, string> = {
  hero: "h-[140px] w-full max-w-[520px] rounded-[28px]",
  nav: "h-14 w-[220px] rounded-[18px]",
  mobile: "h-11 w-[168px] rounded-2xl",
  footer: "h-16 w-[240px] rounded-[22px]",
};

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
}

export default function BrandLogo({
  variant = "nav",
  className = "",
}: BrandLogoProps) {
  return (
    <div
      className={`overflow-hidden border border-white/20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.18),_rgba(129,147,158,0.9)_62%,_rgba(78,95,107,0.96)_100%)] shadow-[0_16px_42px_rgba(11,61,99,0.22)] ${variantClasses[variant]} ${className}`}
    >
      <img
        src="/megabags-logo.webp"
        alt="Mega Bags logo"
        className="h-full w-full object-cover object-center"
        decoding="async"
        loading={variant === "hero" ? "eager" : "lazy"}
      />
    </div>
  );
}

type BrandLogoVariant = "hero" | "nav" | "mobile" | "footer";

const variantClasses: Record<BrandLogoVariant, string> = {
  hero: "h-[108px] w-full max-w-[520px] md:h-[132px]",
  nav: "h-[52px] w-[236px]",
  mobile: "h-[40px] w-[176px]",
  footer: "h-[58px] w-[248px]",
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
    <img
      src="/megabags-logo.webp"
      alt="Mega Bags logo"
      className={`h-full w-full object-contain object-left ${variantClasses[variant]} ${className}`}
      decoding="async"
      loading={variant === "hero" ? "eager" : "lazy"}
    />
  );
}

type BrandLogoVariant = "hero" | "nav" | "mobile" | "footer";

const variantClasses: Record<BrandLogoVariant, string> = {
  hero: "h-[108px] w-full max-w-[520px] md:h-[132px]",
  nav: "h-[60px] w-[290px]",
  mobile: "h-[44px] w-[212px]",
  footer: "h-[68px] w-[320px]",
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
    <span
      className={`inline-flex shrink-0 items-center ${variantClasses[variant]} ${className}`}
    >
      <img
        src="/megabags-logo-cropped.webp"
        alt="Mega Bags logo"
        className="block max-h-full w-auto max-w-full object-contain object-left"
        decoding="async"
        loading={variant === "hero" ? "eager" : "lazy"}
      />
    </span>
  );
}

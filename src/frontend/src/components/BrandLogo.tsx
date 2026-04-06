type BrandLogoVariant = "hero" | "nav" | "mobile" | "footer";

const variantClasses: Record<BrandLogoVariant, string> = {
  hero: "h-[108px] w-full max-w-[520px] md:h-[132px]",
  nav: "h-[56px] w-[264px] lg:h-[66px] lg:w-[316px]",
  mobile: "h-[48px] w-[230px]",
  footer: "h-[64px] w-[288px] md:h-[72px] md:w-[332px]",
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

export default function BrandsStrip() {
  const brands = [
    { name: "Versace", src: "/images/brands/versace.webp", className: "h-7 sm:h-8 md:h-9" },
    { name: "Zara", src: "/images/brands/zara.webp", className: "h-7 sm:h-8 md:h-9" },
    { name: "Gucci", src: "/images/brands/gucci.webp", className: "h-7 sm:h-8 md:h-9" },
    { name: "Prada", src: "/images/brands/prada.webp", className: "h-6 sm:h-7 md:h-8" },
    { name: "Calvin Klein", src: "/images/brands/calvinklein.webp", className: "h-6 sm:h-7 md:h-8" },
  ];

  return (
    <section className="bg-black py-9 sm:py-11">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-8 gap-y-6 px-6 sm:px-12 lg:px-24">
        {brands.map((brand) => (
          <div key={brand.name} className="flex items-center justify-center">
            <img
              src={brand.src}
              alt={brand.name}
              className={`w-auto object-contain transition-opacity duration-200 hover:opacity-80 ${brand.className}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

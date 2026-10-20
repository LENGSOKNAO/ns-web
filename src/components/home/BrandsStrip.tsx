import { brandNames } from "@/mocks/homepage";

export default function BrandsStrip() {
  return (
    <section className="bg-black px-5 py-5 sm:px-2">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-10 gap-y-5 md:justify-between md:gap-x-6">
        {brandNames.map((brand, index) => (
          <span
            key={brand}
            className={`text-2xl font-bold tracking-tight text-white sm:text-2xl lg:text-4xl ${
              index === 1 || index === 2 || index === 3 ? "font-serif" : ""
            } ${brand === "Calvin Klein" ? "font-light tracking-tighter" : ""}`}
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}

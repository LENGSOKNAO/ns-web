import Link from "next/link";
import { dressStyles } from "@/mocks/dressStyles";

export default function BrowseByStyle() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 py-0 sm:px-6 lg:px-10 lg:py-4">
      <div className="rounded-[24px] bg-[#f0f0f0] px-4 py-10 sm:rounded-[32px] sm:px-8 sm:py-12 lg:px-12">
        <h2 className="mb-5 text-center text-2xl font-black uppercase tracking-tight text-black sm:mb-10 sm:text-2xl lg:text-3xl">
          Browse by Dress Style
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {dressStyles.map((style) => (
            <Link
              key={style.id}
              href={`/products?style=${style.name.toLowerCase()}`}
              className={`group relative h-[190px] overflow-hidden rounded-2xl bg-white sm:h-[230px] ${style.gridClass}`}
            >
              <img
                src={style.image}
                alt={style.name}
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />

              <h3 className="absolute left-5 top-5 z-10 text-xl font-semibold text-black sm:left-6 sm:top-5 sm:text-2xl">
                {style.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

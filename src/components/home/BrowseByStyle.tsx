import Link from "next/link";
import { dressStyles } from "@/mocks/dressStyles";

export default function BrowseByStyle() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:py-12">
      <div className="rounded-[32px] bg-[#F0F0F0] px-6 py-10 sm:rounded-[40px] sm:px-10 sm:py-14 md:px-16 md:py-16">
        <h2 className="font-integral mb-8 text-center text-3xl font-black uppercase tracking-tight text-black sm:mb-12 sm:text-4xl lg:text-5xl">
          Browse by dress style
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          {dressStyles.map((style) => (
            <Link
              key={style.id}
              href={`/category/men?style=${style.name.toLowerCase()}`}
              className={`group relative h-[200px] overflow-hidden rounded-[20px] bg-white sm:h-[250px] md:h-[289px] ${style.gridClass}`}
            >
              <h3 className="absolute left-6 top-5 z-10 text-2xl font-bold text-black sm:left-8 sm:top-6 sm:text-3xl">
                {style.name}
              </h3>

              <img
                src={style.image}
                alt={style.name}
                className="absolute inset-0 h-full w-full object-cover object-[80%_center] md:object-[85%_top] transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

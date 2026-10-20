import type { Product } from "@/types/catalog";

type ProductSectionProps = {
  title: string;
  products: Product[];
};

export default function ProductSection({
  title,
  products,
}: ProductSectionProps) {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-10 sm:px-2">
      <h2 className="mb-2 text-center text-2xl font-black uppercase text-black sm:text-3xl md:mb-8">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <article key={product.id} className="min-w-0">
            <div className="aspect-square overflow-hidden rounded-2xl bg-[#f0eeed]">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain p-3"
              />
            </div>

            <h3 className="mt-3 truncate text-sm font-bold text-black">
              {product.name}
            </h3>

            <p className="mt-1 text-sm text-yellow-500">
              ★★★★★{" "}
              <span className="text-xs text-gray-500">{product.rating}/5</span>
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="font-bold text-black">${product.price}</span>

              {product.originalPrice && (
                <span className="text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}

              {product.discount && (
                <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-500">
                  -{product.discount}%
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:mt-5">
        <button
          type="button"
          className="min-w-40 rounded-full border border-gray-200 px-8 py-3 text-sm transition hover:bg-gray-100"
        >
          View All
        </button>
      </div>
    </section>
  );
}

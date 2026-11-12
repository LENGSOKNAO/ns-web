import Link from "next/link";
import { productsData } from "@/mocks/products";

interface RelatedProductsProps {
  currentProductId: string | number;
  category?: string;
}

export default function RelatedProducts({
  currentProductId,
  category,
}: RelatedProductsProps) {
  const relatedProducts = productsData
    .filter((product) => String(product.id) !== String(currentProductId))
    .sort((a, b) => {
      if (category) {
        const aSameCategory = a.category === category;
        const bSameCategory = b.category === category;

        return Number(bSameCategory) - Number(aSameCategory);
      }

      return b.rating - a.rating;
    })
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-6 w-full pb-1">
      <h2 className="mb-8 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
        YOU MIGHT ALSO LIKE
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {relatedProducts.map((product) => {
          const discount =
            product.oldPrice && product.oldPrice > product.price
              ? Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100,
                )
              : 0;

          return (
            <Link
              key={product.id}
              href={`/products/${product.public_id}`}
              className="group min-w-0"
            >
              {/* Product image */}
              <div className="aspect-square overflow-hidden rounded-xl bg-[#F0EEED]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Product information */}
              <div className="mt-3">
                <h3 className="truncate font-semibold text-black">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="mt-1 flex items-center gap-1">
                  <div className="flex text-sm text-amber-400">
                    {"★".repeat(Math.round(product.rating))}
                  </div>

                  <span className="text-xs text-gray-500">
                    {product.rating}/5
                  </span>
                </div>

                {/* Price */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="font-bold text-black">${product.price}</span>

                  {discount > 0 && (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        ${product.oldPrice}
                      </span>

                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-500">
                        -{discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

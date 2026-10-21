import Link from "next/link";
import type { Product } from "@/types/catalog";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <Link
      href={`/products/${slug}`}
      className="group flex flex-col justify-between"
    >
      <div>
        {/* Product Image Container matching Figma */}
        <div className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-[#F0EEED] flex items-center justify-center p-4 sm:p-6">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
            loading="lazy"
          />
        </div>

        {/* Product Title */}
        <h3 className="mt-4 truncate text-base font-bold capitalize text-black sm:text-lg">
          {product.name}
        </h3>

        {/* Rating Stars */}
        <div className="mt-1.5 flex items-center gap-2 text-sm">
          <div className="flex text-[#FFC633]">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-base leading-none">
                {i < Math.floor(product.rating) ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span className="text-xs font-normal text-black/60 sm:text-sm">
            {product.rating}/<span className="text-black/40">5</span>
          </span>
        </div>
      </div>

      {/* Pricing */}
      <div className="mt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
        <span className="text-xl font-bold text-black sm:text-2xl">
          ${product.price}
        </span>

        {product.originalPrice && (
          <span className="text-xl font-bold text-black/40 line-through sm:text-2xl">
            ${product.originalPrice}
          </span>
        )}

        {product.discount && (
          <span className="rounded-full bg-[#FF3333]/10 px-3 py-1 text-xs font-semibold text-[#FF3333]">
            -{product.discount}%
          </span>
        )}
      </div>
    </Link>
  );
}

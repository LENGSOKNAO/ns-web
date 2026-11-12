import Link from "next/link";
import type { ShopProduct } from "@/mocks/products";

interface ProductCardProps {
  product: ShopProduct;
  imageRatio?: "3/4" | "2/3";
}

export default function ProductCard({
  product,
  imageRatio = "3/4",
}: ProductCardProps) {
  const primaryImage = product.images?.[0] ?? "/images/placeholder.png";
  const secondaryImage = product.images?.[1];

  return (
    <Link
      href={`/products/${product.public_id}`}
      className="group block min-w-0"
    >
      {/* Product Image */}
      <div
        className={`relative w-full overflow-hidden rounded-2xl bg-[#f0eeed] ${
          imageRatio === "3/4" ? "aspect-[3/4]" : "aspect-[2/3]"
        }`}
      >
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          className={`absolute inset-0 h-full w-full object-contain p-4 mix-blend-multiply transition-opacity duration-300 ${
            secondaryImage ? "group-hover:opacity-0" : ""
          }`}
        />

        {/* Secondary Image on Hover */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 h-full w-full object-contain p-4 opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {/* Discount Badge */}
        {product.sale && product.oldPrice != null && (
          <span className="absolute right-2 top-2 z-10 rounded-full bg-red-200 px-2.5 py-1 text-xs font-medium text-red-700">
            Sale
          </span>
        )}
      </div>

      {/* Product Information */}
      <h3 className="mt-3 min-h-5 truncate text-sm font-bold text-black">
        {product.name}
      </h3>

      <div className="mt-1 flex min-h-6 items-center gap-2">
        <span className="font-bold text-black">${product.price}</span>

        {product.oldPrice != null && (
          <span className="text-sm text-gray-400 line-through">
            ${product.oldPrice}
          </span>
        )}
      </div>
    </Link>
  );
}

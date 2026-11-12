import type { ShopProduct } from "@/mocks/products";
import ProductCard from "./ProductCard";
import HorizontalScroll from "@/components/ui/HorizontalScroll";

type ProductGridProps = {
  products: ShopProduct[];
  imageRatio?: "3/4" | "2/3";
};

export default function ProductGrid({
  products,
  imageRatio = "3/4",
}: ProductGridProps) {
  const displayProducts = products.slice(0, 8);

  return (
    <HorizontalScroll>
      {displayProducts.map((product) => (
        <div
          key={product.id}
          className="w-[165px] shrink-0 snap-start sm:w-[210px] lg:w-[260px]"
        >
          <ProductCard product={product} imageRatio={imageRatio} />
        </div>
      ))}
    </HorizontalScroll>
  );
}

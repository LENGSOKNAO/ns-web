import Link from "next/link";
import type { ShopProduct } from "@/mocks/products";
import ProductGrid from "@/components/products/ProductGrid";
import ButtonX from "@/components/ui/ButtonX";

type ProductSectionProps = {
  title: string;
  products: ShopProduct[];
  href?: string;
  imageRatio?: "3/4" | "2/3";
};

export default function ProductSection({
  title,
  products,
  href = "/category",
  imageRatio = "3/4",
}: ProductSectionProps) {
  return (
    <section className="mx-auto max-w-[1240px] px-2 py-5 sm:px-2">
      <h2 className="mb-4 text-center text-xl font-bold uppercase text-black sm:mb-8 sm:text-2xl">
        {title}
      </h2>

      <ProductGrid products={products} imageRatio={imageRatio} />

      <div className="mt-3 flex justify-center sm:mt-5">
        <Link href={href} className="inline-flex">
          <ButtonX variant="outline" size="md">
            View All
          </ButtonX>
        </Link>
      </div>
    </section>
  );
}

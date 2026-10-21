import Link from "next/link";
import type { Product } from "@/types/catalog";
import ProductCard from "@/components/products/ProductCard";

type ProductSectionProps = {
  title: string;
  products: Product[];
  viewAllHref?: string;
};

export default function ProductSection({
  title,
  products,
  viewAllHref = "/category/men",
}: ProductSectionProps) {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 sm:py-16">
      <h2 className="font-integral mb-8 text-center text-3xl font-black uppercase tracking-tight text-black sm:mb-12 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-9 flex justify-center sm:mt-12">
        <Link
          href={viewAllHref}
          className="inline-flex min-w-[218px] items-center justify-center rounded-full border border-black/10 px-14 py-3.5 text-sm font-medium text-black transition-colors duration-200 hover:bg-black hover:text-white"
        >
          View All
        </Link>
      </div>
    </section>
  );
}

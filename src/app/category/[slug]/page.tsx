import { notFound } from "next/navigation";
import CategoryContent from "./categorypage";
import { getProducts } from "@/services/product.service";

const categories = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
} as const;

type CategorySlug = keyof typeof categories;

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!Object.hasOwn(categories, slug)) {
    notFound();
  }

  const categorySlug = slug as CategorySlug;
  const products = await getProducts();

  return (
    <CategoryContent
      category={categories[categorySlug]}
      slug={categorySlug}
      initialProducts={products}
    />
  );
}

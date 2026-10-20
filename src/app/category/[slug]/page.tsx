import { notFound} from "next/navigation";
import CategoryContent from "./categorypage";
const categories = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
} as const;

type CategorySlug = keyof typeof categories;

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
  const category = categories[categorySlug];

  return <CategoryContent category={category} slug={categorySlug} />;
}

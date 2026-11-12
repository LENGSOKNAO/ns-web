import CategoryContent from "./[slug]/categorypage";
import { getProducts } from "@/services/product.service";

export default async function AllProductsPage() {
  const products = await getProducts();

  return <CategoryContent category="All Products" initialProducts={products} />;
}

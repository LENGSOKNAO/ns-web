import type { ProductData, ProductResponse } from "@/types/catalog";
import type { category, ShopProduct } from "@/mocks/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function mapProduct(product: ProductData): ShopProduct {
  const images = product.images ?? [];

  const primaryImage =
    images.find((image) => image.type === "primary_portrait") ?? images[0];

  const imageUrl = primaryImage?.url
    ? primaryImage.url.replace("localhost:8000", "127.0.0.1:8000")
    : "/images/placeholder.png";

  const colors = [
    ...new Set(
      product.variants
        .map((variant) => variant.color?.name)
        .filter((color): color is string => Boolean(color)),
    ),
  ];

  const sizes = [
    ...new Set(
      product.variants
        .map((variant) => variant.size?.name)
        .filter((size): size is string => Boolean(size)),
    ),
  ];

  const oldPrice = product.compare_at_price ?? undefined;

  return {
    id: product.id,
    public_id: product.slug,
    name: product.name,
    description: product.description ?? "",
    category: (product.category?.slug ?? "men") as category,
    price: product.price,
    oldPrice,
    color: colors.join(", ") || "Default",
    sizes,
    image: imageUrl,
    images: primaryImage
      ? [
          imageUrl,
          ...images
            .filter((image) => image.id !== primaryImage.id)
            .map((image) =>
              image.url.replace("localhost:8000", "127.0.0.1:8000"),
            ),
        ]
      : [],
    variants: product.variants ?? [],
    sale: oldPrice !== undefined && oldPrice > product.price,
    stock: product.stock_quantity,
  };
}

export async function getProducts(): Promise<ShopProduct[]> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const response = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  const result: ProductResponse = await response.json();

  return result.data.data.map(mapProduct);
}

export async function getProductsByCategory(
  category: category,
): Promise<ShopProduct[]> {
  const products = await getProducts();

  return products.filter((product) => product.category === category);
}

export async function getNewArrivals(): Promise<ShopProduct[]> {
  const products = await getProducts();

  return [...products].sort((a, b) => b.id - a.id).slice(0, 4);
}

export async function getTopSelling(): Promise<ShopProduct[]> {
  const products = await getProducts();

  return [...products].sort((a, b) => b.stock - a.stock).slice(0, 4);
}

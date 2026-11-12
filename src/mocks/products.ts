export type category = "men" | "women" | "kids" | "accessories";
export interface ShopProductVariant {
  id: number;
  sku: string;
  price: number;
  stock_quantity: number;
  color: {
    id: number;
    name: string;
    hex_code: string | null;
  } | null;
  size: {
    id: number;
    name: string;
  } | null;
}
export interface ShopProduct {
  id: number;
  public_id: string;
  name: string;
  description: string;
  category: category;
  price: number;
  oldPrice?: number;
  rating?: number;
  color: string;
  sizes: string[];
  image: string;
  images: string[];
  variants: ShopProductVariant[];
  sale?: boolean;
  stock: number;
}
function createMockProduct({
  id,
  publicId,
  name,
  category,
  price,
  oldPrice,
  rating,
  color,
  sizes,
  image,
  images,
  stock,
}: {
  id: number;
  publicId: string;
  name: string;
  category: category;
  price: number;
  oldPrice?: number;
  rating: number;
  color: string;
  sizes: string[];
  image: string;
  images?: string[];
  stock: number;
}): ShopProduct {
  return {
    id,
    public_id: publicId,
    name,
    description: "",
    category,
    price,
    oldPrice,
    rating,
    color,
    sizes,
    image,
    images: images ?? [image],
    variants: sizes.map((size, index) => ({
      id: id * 10 + index,
      sku: `${publicId}-${size.toLowerCase().replace(/\s+/g, "-")}`,
      price,
      stock_quantity: stock,
      color: { id, name: color, hex_code: null },
      size: { id: index + 1, name: size },
    })),
    sale: oldPrice !== undefined && oldPrice > price,
    stock,
  };
}

export const productsData: ShopProduct[] = [
  createMockProduct({
    id: 1,
    publicId: "classic-white-t-shirt",
    name: "Classic White T-Shirt",
    category: "men",
    price: 25,
    oldPrice: 30,
    rating: 4.5,
    color: "White",
    sizes: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80",
    ],
    stock: 10,
  }),
  createMockProduct({
    id: 2,
    publicId: "casual-denim-jacket",
    name: "Casual Denim Jacket",
    category: "men",
    price: 65,
    rating: 4.7,
    color: "Blue",
    sizes: ["M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=700&q=80",
    stock: 10,
  }),
  createMockProduct({
    id: 3,
    publicId: "relaxed-fit-hoodie",
    name: "Relaxed Fit Hoodie",
    category: "men",
    price: 45,
    oldPrice: 55,
    rating: 4.3,
    color: "Black",
    sizes: ["S", "M", "L"],
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80",
    stock: 10,
  }),
  createMockProduct({
    id: 4,
    publicId: "everyday-womens-top",
    name: "Everyday Women's Top",
    category: "women",
    price: 32,
    rating: 4.6,
    color: "White",
    sizes: ["S", "M", "L"],
    image:
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=700&q=80",
    stock: 10,
  }),
  createMockProduct({
    id: 5,
    publicId: "womens-denim-jeans",
    name: "Women's Denim Jeans",
    category: "women",
    price: 55,
    oldPrice: 70,
    rating: 4.8,
    color: "Blue",
    sizes: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80",
    stock: 10,
  }),
  createMockProduct({
    id: 6,
    publicId: "kids-casual-t-shirt",
    name: "Kids Casual T-Shirt",
    category: "kids",
    price: 18,
    rating: 4.2,
    color: "Green",
    sizes: ["S", "M"],
    image:
      "https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=700&q=80",
    stock: 10,
  }),
  createMockProduct({
    id: 7,
    publicId: "everyday-shoulder-bag",
    name: "Everyday Shoulder Bag",
    category: "accessories",
    price: 40,
    rating: 4.5,
    color: "Black",
    sizes: ["One Size"],
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
    stock: 10,
  }),
  createMockProduct({
    id: 8,
    publicId: "classic-baseball-cap",
    name: "Classic Baseball Cap",
    category: "accessories",
    price: 20,
    rating: 4.1,
    color: "Black",
    sizes: ["One Size"],
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=80",
    stock: 10,
  }),
];

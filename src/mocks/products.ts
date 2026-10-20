import type { Product } from "@/types/catalog";

export const newArrivals: Product[] = [
  {
    id: 1,
    name: "T-shirt with Tape Details",
    price: 120,
    image: "/images/products/tape-tshirt.png",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    price: 240,
    originalPrice: 260,
    discount: 20,
    image: "/images/products/skinny-jeans.png",
    rating: 3.5,
  },
];

export const topSelling: Product[] = [
  {
    id: 3,
    name: "Vertical Striped Shirt",
    price: 212,
    originalPrice: 232,
    discount: 20,
    image: "/images/products/striped-shirt.png",
    rating: 5,
  },
  {
    id: 4,
    name: "Courage Graphic T-shirt",
    price: 145,
    image: "/images/products/graphic-tshirt.png",
    rating: 4,
  },
];
export type category = "men" | "women" | "kids" | "accessories";

export interface ShopProduct {
  id: number;
  name: string;
  category: category;
  price: number;
  oldPrice?: number;
  rating: number;
  color: string;
  sizes: string[];
  image: string;
  sale?: boolean;
}

export const productsData: ShopProduct[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    category: "men",
    price: 25,
    oldPrice: 30,
    rating: 4.5,
    color: "White",
    sizes: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
    sale: true,
  },
  {
    id: 2,
    name: "Casual Denim Jacket",
    category: "men",
    price: 65,
    rating: 4.7,
    color: "Blue",
    sizes: ["M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "Relaxed Fit Hoodie",
    category: "men",
    price: 45,
    oldPrice: 55,
    rating: 4.3,
    color: "Black",
    sizes: ["S", "M", "L"],
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80",
    sale: true,
  },
  {
    id: 4,
    name: "Everyday Women's Top",
    category: "women",
    price: 32,
    rating: 4.6,
    color: "White",
    sizes: ["S", "M", "L"],
    image:
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    name: "Women's Denim Jeans",
    category: "women",
    price: 55,
    oldPrice: 70,
    rating: 4.8,
    color: "Blue",
    sizes: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80",
    sale: true,
  },
  {
    id: 6,
    name: "Kids Casual T-Shirt",
    category: "kids",
    price: 18,
    rating: 4.2,
    color: "Green",
    sizes: ["S", "M"],
    image:
      "https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 7,
    name: "Everyday Shoulder Bag",
    category: "accessories",
    price: 40,
    rating: 4.5,
    color: "Black",
    sizes: ["One Size"],
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 8,
    name: "Classic Baseball Cap",
    category: "accessories",
    price: 20,
    rating: 4.1,
    color: "Black",
    sizes: ["One Size"],
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=80",
  },
];

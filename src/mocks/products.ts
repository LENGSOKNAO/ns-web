import type { Product } from "@/types/catalog";

export type category = "men" | "women" | "kids" | "accessories";

export interface ShopProduct {
  id: number;
  name: string;
  category: category;
  price: number;
  oldPrice?: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  color: string;
  colors?: string[];
  sizes: string[];
  image: string;
  gallery?: string[];
  description?: string;
  sale?: boolean;
}

export const newArrivals: Product[] = [
  {
    id: 1,
    name: "T-shirt with Tape Details",
    price: 120,
    rating: 4.5,
    image: "/images/products/tape-tshirt.png",
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    price: 240,
    originalPrice: 260,
    discount: 20,
    rating: 3.5,
    image: "/images/products/skinny-jeans.png",
  },
  {
    id: 3,
    name: "Checkered Shirt",
    price: 180,
    rating: 4.5,
    image: "/images/products/checkered-shirt.png",
  },
  {
    id: 4,
    name: "Sleeve Striped T-shirt",
    price: 130,
    originalPrice: 160,
    discount: 30,
    rating: 4.5,
    image: "/images/products/sleeve-striped.png",
  },
];

export const topSelling: Product[] = [
  {
    id: 5,
    name: "Vertical Striped Shirt",
    price: 212,
    originalPrice: 232,
    discount: 20,
    rating: 5.0,
    image: "/images/products/vertical-striped.png",
  },
  {
    id: 6,
    name: "Courage Graphic T-shirt",
    price: 145,
    rating: 4.0,
    image: "/images/products/courage-tshirt.png",
  },
  {
    id: 7,
    name: "Loose Fit Bermuda Shorts",
    price: 80,
    rating: 3.0,
    image: "/images/products/bermuda-shorts.png",
  },
  {
    id: 8,
    name: "Faded Skinny Jeans",
    price: 210,
    rating: 4.5,
    image: "/images/products/faded-jeans.png",
  },
];

export const productsData: ShopProduct[] = [
  {
    id: 1,
    name: "T-shirt with Tape Details",
    category: "men",
    price: 120,
    rating: 4.5,
    color: "Black",
    colors: ["#4F4631", "#314F4A", "#31344F"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    image: "/images/products/tape-tshirt.png",
    gallery: [
      "/images/products/tape-tshirt.png",
      "/images/products/tape-tshirt-thumb2.png",
      "/images/products/tape-tshirt-thumb3.png",
    ],
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    category: "men",
    price: 240,
    oldPrice: 260,
    originalPrice: 260,
    discount: 20,
    rating: 3.5,
    color: "Blue",
    colors: ["#1e3a8a", "#111827", "#4b5563"],
    sizes: ["Medium", "Large", "X-Large"],
    image: "/images/products/skinny-jeans.png",
    gallery: ["/images/products/skinny-jeans.png"],
    description:
      "Modern skinny jeans crafted from stretch-cotton denim for effortless everyday flexibility and a streamlined silhouette.",
    sale: true,
  },
  {
    id: 3,
    name: "Checkered Shirt",
    category: "men",
    price: 180,
    rating: 4.5,
    color: "Red",
    colors: ["#b91c1c", "#1e3a8a", "#047857"],
    sizes: ["Small", "Medium", "Large"],
    image: "/images/products/checkered-shirt.png",
    description:
      "Premium woven cotton plaid shirt with tailored collar and button cuffs. Perfect layered or buttoned up.",
  },
  {
    id: 4,
    name: "Sleeve Striped T-shirt",
    category: "men",
    price: 130,
    oldPrice: 160,
    originalPrice: 160,
    discount: 30,
    rating: 4.5,
    color: "Orange",
    colors: ["#ea580c", "#000000", "#2563eb"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    image: "/images/products/sleeve-striped.png",
    sale: true,
  },
  {
    id: 5,
    name: "Vertical Striped Shirt",
    category: "men",
    price: 212,
    oldPrice: 232,
    originalPrice: 232,
    discount: 20,
    rating: 5.0,
    color: "Green",
    colors: ["#065f46", "#1e3a8a", "#374151"],
    sizes: ["Medium", "Large", "X-Large"],
    image: "/images/products/vertical-striped.png",
    sale: true,
  },
  {
    id: 6,
    name: "Courage Graphic T-shirt",
    category: "men",
    price: 145,
    rating: 4.0,
    color: "Orange",
    colors: ["#ea580c", "#000000", "#ffffff"],
    sizes: ["Small", "Medium", "Large"],
    image: "/images/products/courage-tshirt.png",
  },
  {
    id: 7,
    name: "Loose Fit Bermuda Shorts",
    category: "men",
    price: 80,
    rating: 3.0,
    color: "Blue",
    colors: ["#1e3a8a", "#374151", "#d97706"],
    sizes: ["Small", "Medium", "Large"],
    image: "/images/products/bermuda-shorts.png",
  },
  {
    id: 8,
    name: "Faded Skinny Jeans",
    category: "men",
    price: 210,
    rating: 4.5,
    color: "Black",
    colors: ["#111827", "#1e3a8a", "#6b7280"],
    sizes: ["Medium", "Large", "X-Large"],
    image: "/images/products/faded-jeans.png",
  },
];

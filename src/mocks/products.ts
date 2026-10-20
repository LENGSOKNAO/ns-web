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
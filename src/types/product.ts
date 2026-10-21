export type CategoryType = "men" | "women" | "kids" | "accessories";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  originalPrice?: number;
  discount?: number;
  category?: CategoryType;
  color?: string;
  colors?: string[];
  sizes?: string[];
  description?: string;
  gallery?: string[];
  reviewsCount?: number;
}

export interface productsItem {
  id: number;
  name: string;
  price?: number;
  image?: string;
  rating?: number;
  originalPrice?: number;
  discount?: number;
}

export interface ShopProduct extends Product {
  oldPrice?: number;
  sale?: boolean;
}


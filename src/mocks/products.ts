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

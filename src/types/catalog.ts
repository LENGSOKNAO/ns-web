export type Banner = {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  image: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  originalPrice?: number;
  discount?: number;
  stock: number;

  // Optional product details from API
  slug?: string;
  sku?: string;
  isFeatured?: boolean;
  category?: Category | null;
  images?: ProductImage[];
  variants?: ProductVariant[];
};

export type ProductImage = {
  id: number;
  type: string;
  path: string;
  url: string;
};

export type ProductVariant = {
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
};

export type Category = {
  id: number;
  name: string;
  slug?: string;
  image?: string;
};

export type ProductData = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  stock_quantity: number;
  is_featured: boolean;
  category: Category | null;
  images: ProductImage[];
  variants: ProductVariant[];
};

export type ProductResponse = {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    data: ProductData[];
    last_page: number;
    total: number;
  };
};

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
  price: number;
  image: string;
  rating: number;
  originalPrice?: number;
  discount?: number;
};

export type Category = {
  id: number;
  name: string;
  image: string;
};

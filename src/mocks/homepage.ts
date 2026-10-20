export interface HeaderMenuItem {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
  }[];
}

export const headerMenu: HeaderMenuItem[] = [
  {
    label: "Shop",
    href: "/category",
    children: [
      { label: "All Products", href: "/category" },
      { label: "Men", href: "/category/men" },
      { label: "Women", href: "/category/women" },
      { label: "Kids", href: "/category/kids" },
      { label: "Accessories", href: "/category/accessories" },
    ],
  },
  {
    label: "On Sale",
    href: "/products?sale=true",
  },
  {
    label: "New Arrivals",
    href: "/products?sort=newest",
  },
  {
    label: "Brands",
    href: "/category?type=brands",
  },
];

export const brandNames: string[] = [
  "VERSACE",
  "ZARA",
  "GUCCI",
  "PRADA",
  "Calvin Klein",
];

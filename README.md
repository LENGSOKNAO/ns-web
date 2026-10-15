# SHOP.CO — E-commerce Frontend Build Guide

A Next.js (App Router) + TypeScript + Tailwind CSS storefront. This document maps every screen in the design (Homepage, Product Detail, Category, Filter drawer, Cart, and their mobile versions) to routes, components, data, and a build order.

## Design Source

Figma: [E-commerce Website Template (Freebie, Community)](https://www.figma.com/design/ajRNdJs05aIfMnuknGJF1b/E-commerce-Website-Template--Freebie---Community-?node-id=0-1&p=f&t=hBCq3vsStNqdTh7c-0)

Screens: Homepage, Product Detail, Category, Filter (mobile), Cart, plus mobile versions. Check exact colors, fonts and spacing in Figma Dev Mode before finalizing the design tokens in section 2.

---

> Use this file as the single source of truth. If you give it to an AI coding tool, paste the **"Prompt for AI tools"** section at the bottom together with the Figma screenshots.

---

## 1. Tech Stack

| Concern      | Choice                                                       | Notes                                                                                    |
| ------------ | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Framework    | Next.js 14+ (App Router)                                     | Server Components by default                                                             |
| Language     | TypeScript (strict)                                          | No `any`                                                                                 |
| Styling      | Tailwind CSS                                                 | Design tokens in `tailwind.config.ts`                                                    |
| Fonts        | `next/font`                                                  | Bold display font for headings (the design uses a heavy, wide face), clean sans for body |
| Icons        | `lucide-react`                                               | Cart, search, user, star, chevrons, filter                                               |
| State        | React Context (cart) + URL search params (filters/sort/page) | No global store needed                                                                   |
| Forms        | `react-hook-form` + `zod` (checkout, newsletter)             | Optional but recommended                                                                 |
| Carousel     | `embla-carousel-react`                                       | Reviews slider, mobile product rows                                                      |
| Price slider | `@radix-ui/react-slider`                                     | Category filter                                                                          |
| Tests        | Vitest + React Testing Library                               | Cart logic first                                                                         |

---

## 2. Design Tokens (verify against Figma)

Extract the exact values from Figma Dev Mode; these are the values visible in the design.

```ts
// tailwind.config.ts (excerpt)
theme: {
  extend: {
    colors: {
      ink: '#000000',          // primary buttons, headings, footer newsletter band
      surface: '#F0F0F0',      // product image backgrounds, input backgrounds
      muted: 'rgba(0,0,0,0.6)',// secondary text
      line: 'rgba(0,0,0,0.1)', // borders and dividers
      sale: '#FF3333',         // discount badge and old-price
      star: '#FFC633',         // rating stars
      success: '#01AB31',
    },
    borderRadius: {
      pill: '62px',            // buttons, search, chips
      card: '20px',            // image containers and panels
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',            // desktop layout kicks in (sidebar filters, full nav)
      xl: '1240px',            // content max-width container
    },
  },
}
```

Layout rules seen in the design:

- Content container: max width ~1240px, horizontal padding 16px (mobile) / 100px (desktop).
- Primary button: black pill, white text. Secondary: white pill with border.
- Product cards sit on a light grey rounded image block; text below.
- A black announcement bar sits above the header on every page.
- A black rounded newsletter band sits above the footer on every page.

---

## 3. Folder Structure

```
src/
├── app/
│   ├── layout.tsx                  # fonts, providers, AnnouncementBar, Header, Footer
│   ├── page.tsx                    # Homepage
│   ├── not-found.tsx
│   ├── loading.tsx
│   ├── products/
│   │   └── [slug]/
│   │       ├── page.tsx            # Product detail
│   │       └── loading.tsx
│   ├── category/
│   │   └── [slug]/
│   │       ├── page.tsx            # Category listing (reads searchParams)
│   │       └── loading.tsx
│   ├── cart/
│   │   └── page.tsx
│   └── checkout/
│       └── page.tsx                # Not in the design yet; build after cart
│
├── components/
│   ├── layout/
│   │   ├── AnnouncementBar.tsx     # "Sign up and get 20% off…" black strip
│   │   ├── Header.tsx              # logo, nav, search, cart, profile
│   │   ├── SearchBar.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Newsletter.tsx          # black "Stay upto date…" band
│   │   ├── Footer.tsx
│   │   └── Breadcrumbs.tsx         # Home > Shop > Men > T-shirts
│   │
│   ├── home/
│   │   ├── HeroBanner.tsx          # headline, CTA, image
│   │   ├── HeroStats.tsx           # 200+ brands, 2,000+ products, 30,000+ customers
│   │   ├── BrandsStrip.tsx         # black bar with brand logos
│   │   ├── NewArrivals.tsx
│   │   ├── TopSelling.tsx
│   │   ├── BrowseByStyle.tsx       # Casual / Formal / Party / Gym tiles
│   │   └── CustomerReviews.tsx     # carousel of ReviewCard
│   │
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductGallery.tsx      # thumbnails + main image (client)
│   │   ├── ProductInfo.tsx         # title, rating, price, description
│   │   ├── ColorSelector.tsx       # (client)
│   │   ├── SizeSelector.tsx        # (client)
│   │   ├── QuantityStepper.tsx     # (client)
│   │   ├── AddToCartPanel.tsx      # composes the three above + button (client)
│   │   ├── ProductTabs.tsx         # Details | Rating & Reviews | FAQs (client)
│   │   ├── ReviewList.tsx
│   │   ├── ReviewCard.tsx
│   │   └── RelatedProducts.tsx     # "You might also like"
│   │
│   ├── category/
│   │   ├── CategoryHeader.tsx      # title + "Showing 1-9 of 100 products"
│   │   ├── FilterSidebar.tsx       # desktop (client)
│   │   ├── FilterDrawer.tsx        # mobile slide-up (client)
│   │   ├── FilterGroups.tsx        # shared body: type, price, colors, size, style
│   │   ├── SortDropdown.tsx        # (client)
│   │   └── Pagination.tsx
│   │
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartList.tsx
│   │   ├── CartSummary.tsx         # subtotal, discount, delivery, total
│   │   ├── PromoCodeForm.tsx
│   │   └── EmptyCart.tsx
│   │
│   └── ui/
│       ├── Button.tsx              # variants: primary | secondary | ghost; sizes
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Checkbox.tsx
│       ├── Badge.tsx               # discount "-20%", chips
│       ├── Rating.tsx              # stars, supports half stars
│       ├── PriceTag.tsx            # price + old price + discount badge
│       ├── Accordion.tsx           # filter groups, FAQs
│       ├── Skeleton.tsx
│       └── Container.tsx
│
├── services/
│   ├── product.service.ts
│   ├── category.service.ts
│   ├── review.service.ts
│   └── cart.service.ts             # only if the backend stores carts
│
├── hooks/
│   ├── useCart.ts
│   ├── useMediaQuery.ts
│   └── useProductFilters.ts        # read/write filters in URL params
│
├── providers/
│   └── CartProvider.tsx
│
├── types/
│   ├── product.ts
│   ├── category.ts
│   ├── review.ts
│   └── cart.ts
│
├── lib/
│   ├── api.ts
│   ├── utils.ts                    # cn(), formatPrice()
│   ├── constants.ts                # nav links, sort options, size list, delivery fee
│   └── cart-utils.ts               # pure totals/discount functions (unit-test these)
│
└── mocks/                          # JSON fixtures so you can build before the API exists
    ├── products.json
    └── reviews.json
```

Rule of thumb: **a file is a Server Component unless it has a `(client)` tag above.** Add `"use client"` only for those.

---

## 4. Screen → Component Map

### Homepage (`app/page.tsx`)

Top to bottom:

1. `AnnouncementBar` → `Header`
2. `HeroBanner` (headline "Find clothes that matches your style", Shop Now button, hero image) with `HeroStats` (3 counters)
3. `BrandsStrip`
4. `NewArrivals` → `ProductGrid` → `ProductCard` (+ "View All" button)
5. `TopSelling` (same pattern)
6. `BrowseByStyle` (4 tiles in an asymmetric grid)
7. `CustomerReviews` (carousel with prev/next arrows)
8. `Newsletter` → `Footer`

Mobile: hero image moves below text, stats wrap to 2 + 1, product rows become horizontal scroll, reviews become a swipeable carousel.

### Product Detail (`app/products/[slug]/page.tsx`)

- `Breadcrumbs`
- Two columns on desktop: `ProductGallery` (vertical thumbnails + main image) | `ProductInfo` + `AddToCartPanel`
- `ProductTabs` (Product Details, Rating & Reviews, FAQs) with `ReviewList`
- `RelatedProducts` ("You might also like")
- `Newsletter` → `Footer`

Mobile: gallery thumbnails move below the main image (horizontal), single column, sticky add-to-cart is a nice upgrade.

### Category (`app/category/[slug]/page.tsx`)

- `Breadcrumbs`
- Desktop: `FilterSidebar` (left) | `CategoryHeader` + `SortDropdown` + `ProductGrid` + `Pagination`
- Mobile: sidebar hidden; filter icon button opens `FilterDrawer` (uses the same `FilterGroups`)
- Filters: type, price range slider, colors, size, dress style. State lives in the URL (`?size=large&color=green&min=50&max=200&sort=popular&page=2`) so pages are shareable and server-renderable.

### Cart (`app/cart/page.tsx`)

- `Breadcrumbs`, page title "Your Cart"
- `CartList` of `CartItem` (image, name, size, color, price, `QuantityStepper`, delete)
- `CartSummary` ("Order Summary": subtotal, discount, delivery fee, total) + `PromoCodeForm` + "Go to Checkout" button
- `EmptyCart` when there are no items

Mobile: summary stacks below the list.

---

## 5. Types

```ts
// types/product.ts
export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export type ProductSize =
  | "XX-Small"
  | "X-Small"
  | "Small"
  | "Medium"
  | "Large"
  | "X-Large"
  | "XX-Large"
  | "3X-Large"
  | "4X-Large";

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number; // current selling price
  originalPrice?: number; // present when discounted
  discountPercent?: number;
  rating: number; // 0–5
  reviewCount: number;
  images: ProductImage[];
  colors: ProductColor[];
  sizes: ProductSize[];
  categorySlug: string;
  dressStyle: "casual" | "formal" | "party" | "gym";
  stock: number;
  isNew?: boolean;
  isTopSelling?: boolean;
}

export interface ProductFilters {
  category?: string;
  sizes?: ProductSize[];
  colors?: string[];
  minPrice?: number;
  maxPrice?: number;
  style?: Product["dressStyle"];
  sort?: "popular" | "newest" | "price-asc" | "price-desc";
  page?: number;
  pageSize?: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

```ts
// types/review.ts
export interface Review {
  id: number;
  productId: number;
  author: string;
  verified: boolean;
  rating: number;
  body: string;
  createdAt: string; // ISO date
}
```

```ts
// types/cart.ts
import type { ProductSize } from "./product";

export interface CartItem {
  productId: number;
  slug: string;
  name: string;
  image: string;
  unitPrice: number;
  size: ProductSize;
  color: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  promoCode?: string;
}
```

A cart line is identified by `productId + size + color` (the same shirt in two sizes is two lines).

---

## 6. API Layer

```ts
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function api<T>(
  endpoint: string,
  init?: RequestInit & { revalidate?: number },
): Promise<T> {
  if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not configured");

  const { revalidate, ...options } = init ?? {};
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
    next: revalidate !== undefined ? { revalidate } : undefined,
  });

  if (!response.ok)
    throw new ApiError(
      response.status,
      `API request failed: ${response.status}`,
    );
  return response.json() as Promise<T>;
}
```

```ts
// services/product.service.ts
import { api } from "@/lib/api";
import type { Product, ProductFilters, Paginated } from "@/types/product";

export const getProducts = (filters: ProductFilters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined)
      params.set(k, Array.isArray(v) ? v.join(",") : String(v));
  });
  return api<Paginated<Product>>(`/products?${params}`, { revalidate: 60 });
};

export const getProduct = (slug: string) =>
  api<Product>(`/products/${slug}`, { revalidate: 60 });
export const getRelatedProducts = (slug: string) =>
  api<Product[]>(`/products/${slug}/related`);
export const getNewArrivals = () =>
  getProducts({ sort: "newest", pageSize: 4 }).then((r) => r.items);
export const getTopSelling = () =>
  getProducts({ sort: "popular", pageSize: 4 }).then((r) => r.items);
```

Notes:

- **Server Components call services directly** (`await getNewArrivals()` inside `NewArrivals.tsx`). Do not wrap them in hooks.
- `useProducts` is only needed if you later add client-side fetching (e.g. infinite scroll or live search). Do not create it until then.
- Until the backend exists, point services at `src/mocks/*.json` behind the same function signatures so components do not change later.
- Handle 404 on the product page with `notFound()` from `next/navigation`.

---

## 7. Cart State

`CartProvider` is a client component using `useReducer` and persists to `localStorage`.

```ts
// Actions
type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; key: string } // key = `${productId}-${size}-${color}`
  | { type: "SET_QTY"; key: string; quantity: number }
  | { type: "APPLY_PROMO"; code: string }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState };
```

Exposed through `useCart()`:
`items`, `itemCount`, `subtotal`, `discount`, `deliveryFee`, `total`, `addToCart`, `removeFromCart`, `updateQuantity`, `applyPromo`, `clearCart`.

Rules:

- Hydrate from `localStorage` in a `useEffect` (avoids SSR hydration mismatch); show nothing in the header badge until hydrated.
- Clamp quantity to `1..stock`; quantity 0 removes the line.
- Put all total/discount maths in `lib/cart-utils.ts` as pure functions and unit-test them.
- The frontend totals are for display only. **The backend recalculates prices, stock, promo codes, and totals at checkout.**
- Wrap `{children}` with `<CartProvider>` in `app/layout.tsx`.

---

## 8. Data Flow Examples

**Homepage products**

```
app/page.tsx → NewArrivals (server) → product.service.getNewArrivals()
             → lib/api.ts → REST API → ProductGrid → ProductCard
```

**Category filtering**

```
User ticks "Large" → FilterSidebar updates URL (?size=Large)
→ category/[slug]/page.tsx re-renders on the server with searchParams
→ product.service.getProducts(filters) → ProductGrid + Pagination
```

**Add to cart**

```
AddToCartPanel (size + color + qty) → useCart().addToCart()
→ CartProvider reducer → localStorage
→ Header cart badge updates → /cart shows CartList + CartSummary
```

---

## 9. Build Order (recommended)

| Phase | Goal           | Deliverables                                                                                                 |
| ----- | -------------- | ------------------------------------------------------------------------------------------------------------ |
| 0     | Setup          | `create-next-app`, Tailwind tokens, fonts, folder skeleton, mock data                                        |
| 1     | UI kit         | `Button`, `Input`, `Select`, `Checkbox`, `Badge`, `Rating`, `PriceTag`, `Accordion`, `Skeleton`, `Container` |
| 2     | Shell          | `AnnouncementBar`, `Header`, `MobileMenu`, `Newsletter`, `Footer`, `Breadcrumbs`, root layout                |
| 3     | Products       | `ProductCard`, `ProductGrid` (the same card everywhere)                                                      |
| 4     | Homepage       | Hero, stats, brands, New Arrivals, Top Selling, Browse by Style, Reviews                                     |
| 5     | Category       | Header, sidebar, drawer, sort, pagination, URL-driven filters                                                |
| 6     | Product detail | Gallery, info, selectors, tabs, reviews, related products                                                    |
| 7     | Cart           | `CartProvider`, `useCart`, cart page, promo code, empty state                                                |
| 8     | Checkout       | Form, validation, order creation (design not provided yet)                                                   |
| 9     | Polish         | Loading/error/not-found states, SEO metadata, a11y, performance, tests                                       |

Finish each phase on desktop **and** mobile before moving on.

---

## 10. Conventions

- **Naming:** components `PascalCase.tsx`; hooks `useThing.ts`; services `thing.service.ts`.
- **Imports:** use the `@/` alias; no deep relative paths.
- **Server vs client:** default to server; push `"use client"` down to the smallest interactive leaf (e.g. `SizeSelector`, not the whole product page).
- **Images:** always `next/image` with `width`/`height` or `fill` + `sizes`; set `priority` on the hero and the main product image; whitelist remote hosts in `next.config.js`.
- **Styling:** Tailwind utilities with a `cn()` helper (`clsx` + `tailwind-merge`); no inline styles; use tokens, not hard-coded hex.
- **Reuse:** one `ProductCard` for homepage, category, and related products.
- **Money:** format with `Intl.NumberFormat` in `formatPrice()`; store numbers, not strings.
- **SEO:** `generateMetadata` on product and category pages; use semantic HTML (`<nav>`, `<main>`, `<h1>` once per page).
- **Accessibility:** buttons for actions, links for navigation; labels on all inputs; visible focus rings; `aria-label` on icon-only buttons; color swatches need text/`aria-label`, not color alone; drawer traps focus and closes on `Esc`.
- **Errors:** `error.tsx` and `not-found.tsx` per route group; show an inline message when a section fails instead of crashing the page.
- **Security:** validate everything on the backend; never trust client prices; protect checkout and account routes with authentication.

---

## 11. Environment

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

`.env.example` should be committed with the same key and no secrets.

---

## 12. Definition of Done (per screen)

- [ ] Matches the Figma at 1440px, 768px, and 375px
- [ ] No layout shift (images have dimensions)
- [ ] Loading, empty, and error states exist
- [ ] Keyboard navigable; screen-reader labels present
- [ ] No TypeScript errors, no ESLint warnings
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95

---

## Prompt for AI tools

Paste this together with the Figma screenshots and this file:

```text
Build the SHOP.CO storefront in Next.js (App Router), TypeScript (strict) and Tailwind CSS,
following PROJECT_STRUCTURE.md exactly (folders, component names, types, build order).

Work one phase at a time, starting with Phase 0 and Phase 1. After each phase, stop and
summarize what was created so I can review before you continue.

Rules:
- Match the attached Figma screenshots for layout, spacing, and typography at desktop and mobile.
- Server Components by default; "use client" only on components tagged (client) in the doc.
- Use the mock JSON files behind the service functions until I provide a real API.
- Use tokens from tailwind.config.ts instead of hard-coded colors.
- Reuse ProductCard everywhere; keep filter state in URL search params.
- Cart state in CartProvider with localStorage persistence; pure totals in lib/cart-utils.ts.
- Include accessibility attributes and loading/empty/error states.
```

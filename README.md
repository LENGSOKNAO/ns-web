
## Design Source

Figma: [E-commerce Website Template (Freebie, Community)](https://www.figma.com/design/ajRNdJs05aIfMnuknGJF1b/E-commerce-Website-Template--Freebie---Community-?node-id=0-1&p=f&t=hBCq3vsStNqdTh7c-0)



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
 
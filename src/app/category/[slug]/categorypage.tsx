"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { productsData } from "@/mocks/products";

type CategorySlug = "men" | "women" | "kids" | "accessories";

interface Props {
  category: string;
  slug: CategorySlug;
}

export default function CategoryContent({ category, slug }: Props) {
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [saleOnly, setSaleOnly] = useState(false);
  const [sort, setSort] = useState("recommended");

  const products = useMemo(() => {
    const result = productsData.filter((product) => {
      return (
        product.category === slug &&
        product.price <= maxPrice &&
        (selectedColors.length === 0 ||
          selectedColors.includes(product.color)) &&
        (selectedSizes.length === 0 ||
          selectedSizes.some((size) => product.sizes.includes(size))) &&
        (!saleOnly || product.sale === true)
      );
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [slug, maxPrice, selectedColors, selectedSizes, saleOnly, sort]);

  function toggleValue(
    value: string,
    selected: string[],
    setSelected: (values: string[]) => void,
  ) {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  }

  const colors = ["White", "Black", "Blue", "Green"];
  const sizes = ["S", "M", "L", "XL", "One Size"];

  return (
    <main className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 lg:px-20">
      <div className="mb-6 flex gap-2 text-sm text-gray-500">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/category">Shop</Link>
        <span>/</span>
        <span className="text-black">{category}</span>
      </div>

      <h1 className="mb-8 text-3xl font-black sm:text-4xl">{category}</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="self-start rounded-2xl border border-gray-200 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Filters</h2>
            <button
              type="button"
              onClick={() => {
                setMaxPrice(100);
                setSelectedColors([]);
                setSelectedSizes([]);
                setSaleOnly(false);
                setSort("recommended");
              }}
              className="text-sm text-gray-500 underline"
            >
              Reset
            </button>
          </div>

          <Accordion
            type="multiple"
            defaultValue={["category", "price", "color", "size"]}
          >
            <AccordionItem value="category">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-3 text-sm">
                  {(["men", "women", "kids", "accessories"] as const).map(
                    (item) => (
                      <Link
                        key={item}
                        href={`/category/${item}`}
                        className={
                          item === slug
                            ? "font-semibold text-black"
                            : "text-gray-500"
                        }
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </Link>
                    ),
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-sm text-gray-600">
                  Maximum price: ${maxPrice}
                </p>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  className="w-full accent-black"
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="color">
              <AccordionTrigger>Color</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        toggleValue(color, selectedColors, setSelectedColors)
                      }
                      aria-pressed={selectedColors.includes(color)}
                      className={`rounded-full border px-3 py-2 text-xs ${
                        selectedColors.includes(color)
                          ? "border-black bg-black text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="size">
              <AccordionTrigger>Size</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        toggleValue(size, selectedSizes, setSelectedSizes)
                      }
                      aria-pressed={selectedSizes.includes(size)}
                      className={`rounded-full border px-3 py-2 text-xs ${
                        selectedSizes.includes(size)
                          ? "border-black bg-black text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <label className="mt-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={saleOnly}
              onChange={(event) => setSaleOnly(event.target.checked)}
              className="accent-black"
            />
            On sale only
          </label>
        </aside>

        <section>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              Showing {products.length} products
            </p>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort products"
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-black"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group min-w-0"
                >
                  <div className="mb-3 aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="truncate font-semibold">{product.name}</h3>
                  <p className="mt-1 text-sm text-amber-500">
                    ★ {product.rating.toFixed(1)}
                  </p>

                  <div className="mt-1 flex flex-wrap gap-2">
                    <span className="font-bold">${product.price}</span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">
              <h2 className="font-semibold">No products found</h2>
              <p className="mt-2 text-sm text-gray-500">
                Try adjusting your filters.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

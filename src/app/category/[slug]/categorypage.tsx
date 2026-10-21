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
  const [maxPrice, setMaxPrice] = useState(250);
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

  const colors = ["White", "Black", "Blue", "Green", "Red", "Orange"];
  const sizes = ["Small", "Medium", "Large", "X-Large"];

  return (
    <main className="mx-auto max-w-[1240px] px-5 py-8 md:px-6">
      {/* Breadcrumbs */}
      <div className="mb-6 flex gap-2 text-sm text-black/60">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span>&gt;</span>
        <span className="capitalize text-black">{category}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_minmax(0,1fr)]">
        {/* Filters Sidebar */}
        <aside className="self-start rounded-[20px] border border-black/10 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between border-b border-black/10 pb-4">
            <h2 className="text-xl font-bold text-black">Filters</h2>
            <button
              type="button"
              onClick={() => {
                setMaxPrice(250);
                setSelectedColors([]);
                setSelectedSizes([]);
                setSaleOnly(false);
                setSort("recommended");
              }}
              className="text-xs text-black/60 underline hover:text-black"
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
                        className={`capitalize transition ${
                          item === slug
                            ? "font-bold text-black"
                            : "text-black/60 hover:text-black"
                        }`}
                      >
                        {item}
                      </Link>
                    ),
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-sm text-black/60">
                  Maximum price: ${maxPrice}
                </p>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="10"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  className="w-full accent-black"
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="color">
              <AccordionTrigger>Colors</AccordionTrigger>
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
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${
                        selectedColors.includes(color)
                          ? "border-black bg-black text-white"
                          : "border-black/10 text-black/70 hover:border-black"
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
                      className={`rounded-full px-3.5 py-1.5 text-xs transition ${
                        selectedSizes.includes(size)
                          ? "bg-black text-white"
                          : "bg-[#F0F0F0] text-black/60 hover:bg-neutral-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <label className="mt-4 flex items-center gap-2 text-sm text-black">
            <input
              type="checkbox"
              checked={saleOnly}
              onChange={(event) => setSaleOnly(event.target.checked)}
              className="accent-black"
            />
            On sale only
          </label>
        </aside>

        {/* Products Grid */}
        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-integral text-2xl font-black uppercase text-black sm:text-3xl">
                {category}
              </h1>
              <p className="mt-1 text-xs text-black/60 sm:text-sm">
                Showing {products.length} products
              </p>
            </div>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort products"
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black focus:outline-none"
            >
              <option value="recommended">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {products.map((product) => {
                const productSlug = product.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-");
                return (
                  <Link
                    key={product.id}
                    href={`/products/${productSlug}`}
                    className="group min-w-0 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-[20px] bg-[#F0EEED] flex items-center justify-center p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                        />
                      </div>

                      <h3 className="truncate font-bold text-base capitalize text-black">
                        {product.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-1.5 text-sm">
                        <div className="flex text-[#FFC633]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="text-sm leading-none">
                              {i < Math.floor(product.rating) ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-black/60">
                          {product.rating}/5
                        </span>
                      </div>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <span className="font-bold text-lg text-black">
                        ${product.price}
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm font-bold text-black/40 line-through">
                          ${product.oldPrice}
                        </span>
                      )}
                      {product.oldPrice && (
                        <span className="rounded-full bg-[#FF3333]/10 px-2 py-0.5 text-[11px] font-semibold text-[#FF3333]">
                          -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[20px] border border-dashed border-black/20 py-16 text-center">
              <h2 className="font-bold text-black">No products found</h2>
              <p className="mt-2 text-sm text-black/60">
                Try adjusting your filters.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

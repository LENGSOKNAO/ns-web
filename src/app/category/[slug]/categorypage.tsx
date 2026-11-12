"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { ShopProduct } from "@/mocks/products";

import CategoryHeader from "@/components/category/CategoryHeader";
import FilterSidebar from "@/components/category/FilterSidebar";
import SortDropdown from "@/components/category/SortDropdown";
import Pagination from "@/components/category/Pagination";

type CategorySlug = "men" | "women" | "kids" | "accessories";

interface Props {
  category: string;
  slug?: CategorySlug;
  initialProducts: ShopProduct[];
}

export default function CategoryContent({
  category,
  slug,
  initialProducts,
}: Props) {
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [saleOnly, setSaleOnly] = useState(false);
  const [sort, setSort] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 9;

  // Filter and sort products
  const products = useMemo(() => {
    const result = initialProducts.filter(
      (product) =>
        (!slug || product.category === slug) &&
        product.price <= maxPrice &&
        (selectedColors.length === 0 ||
          selectedColors.includes(product.color)) &&
        (selectedSizes.length === 0 ||
          selectedSizes.some((size) => product.sizes.includes(size))) &&
        (!saleOnly || product.sale === true),
    );

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    initialProducts,
    slug,
    maxPrice,
    selectedColors,
    selectedSizes,
    saleOnly,
    sort,
  ]);

  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  // Return to page 1 when filters or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [slug, maxPrice, selectedColors, selectedSizes, saleOnly, sort]);

  // Reset all filters
  function resetFilters() {
    setMaxPrice(100);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSaleOnly(false);
    setSort("recommended");
    setCurrentPage(1);
  }

  return (
    <main className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 lg:px-20">
      <CategoryHeader category={category} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[230px_minmax(0,1fr)]">
        <FilterSidebar
          slug={slug}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          saleOnly={saleOnly}
          setSaleOnly={setSaleOnly}
          onReset={resetFilters}
        />

        <section>
          {/* Product count and sorting */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              Showing {paginatedProducts.length} of {products.length} products
            </p>

            <SortDropdown value={sort} onChange={setSort} />
          </div>

          {/* Product grid and pagination */}
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {paginatedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.public_id}`}
                    className="group min-w-0"
                  >
                    <div className="relative mb-3 aspect-[6/4] overflow-hidden rounded-2xl bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {product.sale && (
                        <span className="absolute left-2 top-2 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                          Sale
                        </span>
                      )}
                    </div>

                    <h3 className="truncate font-semibold">{product.name}</h3>
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

              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">
              <h2 className="font-semibold">No products found</h2>

              <p className="mt-2 text-sm text-gray-500">
                Try adjusting your filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 rounded-full bg-black px-5 py-2 text-sm text-white"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

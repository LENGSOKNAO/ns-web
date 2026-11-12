"use client";

import FilterGroups from "./FilterGroups";

type CategorySlug = "men" | "women" | "kids" | "accessories";

interface FilterSidebarProps {
  slug?: CategorySlug;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  selectedColors: string[];
  setSelectedColors: (value: string[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (value: string[]) => void;
  saleOnly: boolean;
  setSaleOnly: (value: boolean) => void;
  onReset: () => void;
}

export default function FilterSidebar({
  slug,
  maxPrice,
  setMaxPrice,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  saleOnly,
  setSaleOnly,
  onReset,
}: FilterSidebarProps) {
  return (
    <aside className="self-start rounded-2xl border border-gray-200 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Filters</h2>

        <button
          type="button"
          onClick={onReset}
          className="text-sm text-gray-500 underline"
        >
          Reset
        </button>
      </div>

      <FilterGroups
        slug={slug}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        selectedSizes={selectedSizes}
        setSelectedSizes={setSelectedSizes}
      />

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
  );
}

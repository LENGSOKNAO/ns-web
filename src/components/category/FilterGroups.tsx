"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

type CategorySlug = "men" | "women" | "kids" | "accessories";

interface FilterGroupsProps {
  slug?: CategorySlug;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  selectedColors: string[];
  setSelectedColors: (value: string[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (value: string[]) => void;
}

const categories: CategorySlug[] = ["men", "women", "kids", "accessories"];

const colors = ["White", "Black", "Blue", "Green"];
const sizes = ["S", "M", "L", "XL", "One Size"];

export default function FilterGroups({
  slug,
  maxPrice,
  setMaxPrice,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
}: FilterGroupsProps) {
  function toggleValue(
    value: string,
    selected: string[],
    setSelected: (value: string[]) => void,
  ) {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  }

  return (
    <Accordion
      type="multiple"
      defaultValue={["category", "price", "color", "size"]}
    >
      <AccordionItem value="category">
        <AccordionTrigger>Category</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3 text-sm">
            {categories.map((item) => (
              <Link
                key={item}
                href={`/category/${item}`}
                className={
                  item === slug ? "font-semibold text-black" : "text-gray-500"
                }
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
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
            min={10}
            max={100}
            step={5}
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
  );
}

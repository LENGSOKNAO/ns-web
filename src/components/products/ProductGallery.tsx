"use client";

import { useEffect, useState } from "react";
import HorizontalScroll from "../ui/HorizontalScroll";

interface ProductGalleryProps {
  name: string;
  images: string[];
}

export default function ProductGallery({ name, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div className="mt-1 flex flex-col gap-3 md:flex-row md:gap-4">
      {/* Main image slider */}
      <HorizontalScroll
        showArrows={images.length > 1}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        className="order-1 min-w-0 flex-1 md:order-2"
        contentClassName="gap-0"
      >
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="h-100 w-full shrink-0 snap-start overflow-hidden rounded-lg bg-[#f0eeed]"
          >
            <img
              src={image}
              alt={`${name} view ${index + 1}`}
              className="h-full w-full object-contain p-5 mix-blend-multiply"
            />
          </div>
        ))}
      </HorizontalScroll>

      {/* Image thumbnails */}
      <div className="order-2 flex h-100 shrink-0 gap-3 overflow-x-auto overflow-y-hidden pb-2 scrollbar-hide md:order-1 md:max-h-none md:w-20 md:flex-col md:overflow-x-hidden md:overflow-y-auto md:pb-0 lg:w-24 lg:gap-4">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View image ${index + 1} of ${name}`}
            aria-pressed={activeIndex === index}
            className={`h-17 w-20 shrink-0 overflow-hidden rounded-sm border-2 bg-[#f0eeed] md:w-full ${
              activeIndex === index
                ? "border-black"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`${name} view ${index + 1}`}
              className="h-full w-full object-cover p-0.5"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

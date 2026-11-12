"use client";

import React from "react";
import { Children, useEffect, useRef, type ReactNode } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type HorizontalScrollProps = {
  children: ReactNode;
  showArrows?: boolean;
  className?: string;
  contentClassName?: string;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
};

export default function HorizontalScroll({
  children,
  showArrows = false,
  className = "",
  contentClassName = "",
  activeIndex = 0,
  onActiveIndexChange,
}: HorizontalScrollProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxIndex = slider.children.length - 1;
    const nextIndex = Math.max(0, Math.min(index, maxIndex));

    slider.scrollTo({
      left: nextIndex * slider.clientWidth,
      behavior: "smooth",
    });

    onActiveIndexChange?.(nextIndex);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const item = slider.children[activeIndex] as HTMLElement | undefined;
    if (!item) return;

    slider.scrollTo({
      left: item.offsetLeft,
      behavior: "smooth",
    });
  }, [activeIndex]);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider || !onActiveIndexChange) return;

    const sliderLeft = slider.getBoundingClientRect().left;

    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(slider.children).forEach((child, index) => {
      const distance = Math.abs(
        (child as HTMLElement).getBoundingClientRect().left - sliderLeft,
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    // Only update when the active image actually changes
    if (closestIndex !== activeIndex) {
      onActiveIndexChange(closestIndex);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className={`flex snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-width:none [&::-webkit-scrollbar]:hidden ${contentClassName}`}
      >
        {children}
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex <= 0}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-black shadow-md disabled:opacity-30"
          >
            <FiChevronLeft />
          </button>

          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex >= React.Children.count(children) - 1}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-black shadow-md disabled:opacity-30"
          >
            <FiChevronRight />
          </button>
        </>
      )}
    </div>
  );
}

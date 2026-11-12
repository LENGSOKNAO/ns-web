"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
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
  activeIndex,
  onActiveIndexChange,
}: HorizontalScrollProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const isControlled = activeIndex !== undefined;
  const currentActiveIndex = activeIndex ?? internalActiveIndex;

  const updateActiveIndex = (index: number) => {
    if (!isControlled) {
      setInternalActiveIndex(index);
    }

    onActiveIndexChange?.(index);
  };

  const scrollToIndex = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxIndex = slider.children.length - 1;
    const nextIndex = Math.max(0, Math.min(index, maxIndex));
    const nextItem = slider.children[nextIndex] as HTMLElement | undefined;
    if (!nextItem) return;

    const offset =
      nextItem.getBoundingClientRect().left -
      slider.getBoundingClientRect().left;

    slider.scrollTo({
      left: slider.scrollLeft + offset,
      behavior: "smooth",
    });

    updateActiveIndex(nextIndex);
  };

  useEffect(() => {
    if (!isControlled) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const item = slider.children[currentActiveIndex] as
      | HTMLElement
      | undefined;
    if (!item) return;

    const offset =
      item.getBoundingClientRect().left -
      slider.getBoundingClientRect().left;

    slider.scrollTo({
      left: slider.scrollLeft + offset,
      behavior: "smooth",
    });
  }, [currentActiveIndex, isControlled]);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

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

    if (closestIndex !== currentActiveIndex) {
      updateActiveIndex(closestIndex);
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
            onClick={() => scrollToIndex(currentActiveIndex - 1)}
            disabled={currentActiveIndex <= 0}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-black shadow-md disabled:opacity-30"
          >
            <FiChevronLeft />
          </button>

          <button
            type="button"
            onClick={() => scrollToIndex(currentActiveIndex + 1)}
            disabled={currentActiveIndex >= Children.count(children) - 1}
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
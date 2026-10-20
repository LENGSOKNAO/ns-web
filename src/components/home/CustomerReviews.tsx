"use client";

import { useRef } from "react";
import { customerReviews } from "@/mocks/reviews";
import { IoArrowBack, IoArrowForwardOutline } from "react-icons/io5";

export default function CustomerReviews() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left:
        direction === "right"
          ? sliderRef.current.clientWidth * 0.7
          : -sliderRef.current.clientWidth * 0.7,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8 lg:px-10">
      {/* Heading */}
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black uppercase tracking-tight text-black sm:text-2xl lg:text-3xl">
          Our Happy Customers
        </h2>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => scrollReviews("left")}
            aria-label="Previous reviews"
            className="text-2xl text-black transition hover:text-gray-500"
          >
            <IoArrowBack />
          </button>

          <button
            type="button"
            onClick={() => scrollReviews("right")}
            aria-label="Next reviews"
            className="text-2xl text-black transition hover:text-gray-500"
          >
            <IoArrowForwardOutline />
          </button>
        </div>
      </div>

      {/* Review carousel */}
      <div
        ref={sliderRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {customerReviews.map((review) => (
          <article
            key={review.id}
            className="w-[85%] shrink-0 snap-start rounded-2xl border border-gray-200 p-5 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
          >
            {/* Stars */}
            <div
              className="mb-2 text-lg leading-none tracking-wide text-amber-400"
              aria-label={`${review.rating} out of 5 stars`}
            >
              {"★".repeat(review.rating)}
              <span className="text-gray-200">
                {"★".repeat(5 - review.rating)}
              </span>
            </div>

            {/* Name */}
            <div className="mb-2 flex items-center gap-2">
              <h3 className="text-sm font-bold text-black">{review.name}</h3>

              {review.verified && (
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white"
                  aria-label="Verified customer"
                  title="Verified customer"
                >
                  ✓
                </span>
              )}
            </div>

            {/* Comment */}
            <p className="text-sm leading-5 text-gray-500">
              "{review.comment}"
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

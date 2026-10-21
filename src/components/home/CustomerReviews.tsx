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
    <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 sm:py-16">
      {/* Heading & Navigation */}
      <div className="mb-8 flex items-center justify-between sm:mb-10">
        <h2 className="font-integral text-3xl font-extrabold uppercase tracking-tight text-black sm:text-4xl lg:text-5xl">
          Our Happy Customers
        </h2>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => scrollReviews("left")}
            aria-label="Previous reviews"
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-black transition hover:bg-neutral-100"
          >
            <IoArrowBack />
          </button>

          <button
            type="button"
            onClick={() => scrollReviews("right")}
            aria-label="Next reviews"
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-black transition hover:bg-neutral-100"
          >
            <IoArrowForwardOutline />
          </button>
        </div>
      </div>

      {/* Review Carousel */}
      <div
        ref={sliderRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {customerReviews.map((review) => (
          <article
            key={review.id}
            className="w-[88%] shrink-0 snap-start rounded-[20px] border border-black/10 p-6 sm:w-[calc(50%-10px)] md:p-8 lg:w-[calc(33.333%-14px)]"
          >
            {/* 5 Yellow Stars */}
            <div className="flex text-[#FFC633]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-xl leading-none">
                  {i < review.rating ? "★" : "☆"}
                </span>
              ))}
            </div>

            {/* Customer Name & Verified Badge */}
            <div className="mt-3.5 flex items-center gap-1.5">
              <span className="text-base font-bold text-black sm:text-lg">
                {review.name}
              </span>

              {review.verified && (
                <span
                  title="Verified Customer"
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-[#01AB31] text-[10px] text-white"
                >
                  ✓
                </span>
              )}
            </div>

            {/* Comment */}
            <p className="mt-3 text-sm leading-6 text-black/60 sm:text-base">
              {review.comment}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

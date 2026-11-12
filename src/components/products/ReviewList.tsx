"use client";

import { useMemo, useState } from "react";

export interface ProductReview {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

interface ReviewListProps {
  reviews?: ProductReview[];
}

const demoReviews: ProductReview[] = [
  {
    id: 1,
    author: "Samantha D.",
    rating: 5,
    comment:
      "I absolutely love this T-shirt! The design is unique and the fabric feels comfortable. It's a great everyday piece.",
    date: "August 14, 2026",
    verified: true,
  },
  {
    id: 2,
    author: "Alex M.",
    rating: 4,
    comment:
      "The T-shirt exceeded my expectations. The colors are vibrant and the print quality is top-notch.",
    date: "August 15, 2026",
    verified: true,
  },
  {
    id: 3,
    author: "Ethan R.",
    rating: 5,
    comment:
      "This T-shirt is a must-have for anyone who appreciates good design. The material is soft and comfortable.",
    date: "August 16, 2026",
    verified: true,
  },
  {
    id: 4,
    author: "Olivia P.",
    rating: 4,
    comment:
      "As a UX enthusiast, I value simplicity and functionality. This T-shirt fits my everyday style perfectly.",
    date: "August 17, 2026",
    verified: true,
  },
  {
    id: 5,
    author: "Liam K.",
    rating: 5,
    comment:
      "This shirt is a fusion of comfort and creativity. The fabric is soft and the design adds personality to my wardrobe.",
    date: "August 18, 2026",
    verified: true,
  },
  {
    id: 6,
    author: "Ava H.",
    rating: 5,
    comment:
      "I'm not just wearing a shirt; I'm wearing a piece of design philosophy. The material feels comfortable throughout the day.",
    date: "August 19, 2026",
    verified: true,
  },
  {
    id: 7,
    author: "Noah B.",
    rating: 4,
    comment:
      "Great quality for the price. It fits well and looks stylish with jeans.",
    date: "August 20, 2026",
    verified: true,
  },
  {
    id: 8,
    author: "Mia C.",
    rating: 5,
    comment:
      "The fit is comfortable and the quality is better than I expected. I would buy it again.",
    date: "August 21, 2026",
    verified: true,
  },
];

export default function ReviewList({ reviews = demoReviews }: ReviewListProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [sort, setSort] = useState("latest");
  const [minimumRating, setMinimumRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredReviews = useMemo(() => {
    const result = reviews.filter((review) => review.rating >= minimumRating);

    if (sort === "highest") {
      return [...result].sort((a, b) => b.rating - a.rating);
    }

    if (sort === "lowest") {
      return [...result].sort((a, b) => a.rating - b.rating);
    }

    return [...result].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [reviews, sort, minimumRating]);

  const displayedReviews = filteredReviews.slice(0, visibleCount);

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold">
          All Reviews{" "}
          <span className="text-sm font-normal text-gray-500">
            ({filteredReviews.length})
          </span>
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            className="rounded-full bg-gray-100 p-2.5 hover:bg-gray-200"
            aria-label="Toggle review filters"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
              <circle cx="15" cy="7" r="2" />
              <circle cx="9" cy="17" r="2" />
            </svg>
          </button>

          <label className="sr-only" htmlFor="review-sort">
            Sort reviews
          </label>
          <select
            id="review-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-full bg-gray-100 px-4 py-2.5 text-sm outline-none"
          >
            <option value="latest">Latest</option>
            <option value="highest">Highest rating</option>
            <option value="lowest">Lowest rating</option>
          </select>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("write-review")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-full bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            Write a Review
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl bg-gray-50 p-4">
          <label htmlFor="minimum-rating" className="text-sm">
            Minimum rating
          </label>
          <select
            id="minimum-rating"
            value={minimumRating}
            onChange={(event) => {
              setMinimumRating(Number(event.target.value));
              setVisibleCount(6);
            }}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
          >
            <option value={0}>All ratings</option>
            <option value={5}>5 stars</option>
            <option value={4}>4 stars and above</option>
            <option value={3}>3 stars and above</option>
          </select>
        </div>
      )}

      {displayedReviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {displayedReviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-gray-200 p-5"
            >
              <div
                className="mb-3 flex items-center gap-1 text-amber-400"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={
                      index < review.rating ? "text-amber-400" : "text-gray-200"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{review.author}</h3>
                {review.verified && (
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[10px] text-white"
                    aria-label="Verified buyer"
                    title="Verified buyer"
                  >
                    ✓
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {review.comment}
              </p>

              <p className="mt-4 text-xs text-gray-500">
                Posted on{" "}
                {new Date(review.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-gray-200 p-6 text-sm text-gray-500">
          No reviews match this rating filter.
        </p>
      )}

      {visibleCount < filteredReviews.length && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + 6)}
            className="rounded-full border border-gray-200 px-6 py-3 text-sm font-medium hover:bg-gray-50"
          >
            Load More Reviews
          </button>
        </div>
      )}

      <div id="write-review" className="mt-8 scroll-mt-8">
        <h3 className="text-base font-semibold">Write a Review</h3>
        <p className="mt-1 text-sm text-gray-500">
          Review submission will be connected to your backend later.
        </p>
      </div>
    </section>
  );
}

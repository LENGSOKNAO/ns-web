import { customerReviews } from "@/mocks/reviews";
import HorizontalScroll from "@/components/ui/HorizontalScroll";

export default function CustomerReviews() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8 lg:px-10">
      <h2 className="mb-4 text-xl font-bold uppercase tracking-tight text-black sm:text-2xl lg:text-3xl">
        Our Happy Customers
      </h2>

      <HorizontalScroll showArrows>
        {customerReviews.map((review) => (
          <article
            key={review.id}
            className="w-[85%] shrink-0 snap-start rounded-2xl border border-gray-200 p-5 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
          >
            <div className="mb-2 text-lg leading-none tracking-wide text-amber-400">
              {"★".repeat(review.rating)}
              <span className="text-gray-200">
                {"★".repeat(5 - review.rating)}
              </span>
            </div>

            <div className="mb-2 flex items-center gap-2">
              <h3 className="text-sm font-bold text-black">{review.name}</h3>

              {review.verified && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">
                  ✓
                </span>
              )}
            </div>

            <p className="text-sm leading-5 text-gray-500">
              "{review.comment}"
            </p>
          </article>
        ))}
      </HorizontalScroll>
    </section>
  );
}

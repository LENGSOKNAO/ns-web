"use client";
import { useEffect, useState } from "react";
import { getBanners } from "@/services/banner.service";
import type { Banner } from "@/types/catalog";

export default function HeroBanner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadBanners() {
      try {
        const data = await getBanners();

        if (!cancelled) {
          setBanners(data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unable to load banners.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadBanners();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (banners.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [banners.length]);

  if (loading) {
    return (
      <section className="flex min-h-[570px] items-center justify-center bg-[#f2f0f1]">
        <p className="text-gray-600">Loading collection...</p>
      </section>
    );
  }

  if (error || banners.length === 0) {
    return (
      <section className="flex min-h-[400px] items-center justify-center bg-[#f2f0f1] px-6">
        <p className="text-center text-gray-600">
          {error || "No banners available."}
        </p>
      </section>
    );
  }

  const slide = banners[activeIndex];

  const previousSlide = () => {
    setActiveIndex(
      (current) => (current - 1 + banners.length) % banners.length,
    );
  };

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % banners.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#f2f0f1]">
      <div className="relative mx-auto max-w-[1440px]">
        {/* Background image: large screens only */}
        <div
          key={slide.id}
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
          style={{ backgroundImage: `url("${slide.image}")` }}
          role="img"
          aria-label={slide.title}
        />

        {/* Gradient: large screens only */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#f2f0f1] from-15% via-[#f2f0f1]/95 via-40% to-transparent to-80% md:block" />

        {/* Text content */}
        <div className="relative z-10 flex min-h-[570px] flex-col justify-center px-5 pt-6 pb-10 sm:px-8 sm:pt-3 md:min-h-[610px] md:w-[65%] md:justify-center md:px-10 md:py-12 lg:px-18">
          <p className="mb-5 text-xs font-semibold tracking-widest text-gray-600">
            {slide.subtitle}
          </p>

          <h1 className="max-w-[620px] text-3xl font-black leading-[0.98] tracking-tight text-black sm:text-4xl lg:text-5xl xl:text-6xl">
            {slide.title}
          </h1>

          <p className="mt-6 max-w-[430px] text-sm leading-6 text-gray-600 sm:text-base">
            {slide.description}
          </p>

          <a
            href="/products"
            className="mt-7 flex w-full items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800 md:w-fit md:min-w-[160px]"
          >
            {slide.buttonText}
          </a>

          {/* Image below button on small screens */}
          <div className="mt-5 h-[280px] w-full overflow-hidden rounded-xl sm:h-[360px] md:hidden">
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Slider controls */}
        {banners.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous banner"
              className="absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl md:flex"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next banner"
              className="absolute right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl md:flex"
            >
              ›
            </button>

            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-5">
              {banners.map((banner, index) => (
                <button
                  key={banner.id}
                  type="button"
                  aria-label={`Go to banner ${index + 1}`}
                  aria-current={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 sm:w-full rounded-full transition-all ${
                    activeIndex === index ? "w-7 bg-black" : "w-2.5 bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

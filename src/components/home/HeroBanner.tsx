"use client";

import Link from "next/link";
import HeroStats from "./HeroStats";

function Sparkle({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M50 0C50 27.614 72.386 50 100 50C72.386 50 50 72.386 50 100C50 72.386 27.614 50 0 50C27.614 50 50 27.614 50 0Z" />
    </svg>
  );
}

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#F2F0F1]">
      <div className="mx-auto flex max-w-[1440px] flex-col px-5 pt-10 sm:px-8 md:flex-row md:items-end md:justify-between md:pt-14 lg:px-20 lg:pt-16">
        {/* Left Column: Copy, CTA & Stats */}
        <div className="z-10 max-w-[600px] pt-4 pb-8 sm:pb-12 md:pb-16 lg:pb-24">
          <h1 className="font-integral text-4xl font-black uppercase leading-[1.0] tracking-tight text-black sm:text-5xl lg:text-[64px]">
            FIND CLOTHES<br />THAT MATCHES<br />YOUR STYLE
          </h1>

          <p className="mt-6 max-w-[540px] text-sm leading-6 text-black/60 sm:text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <div className="mt-8">
            <Link
              href="/category/men"
              className="inline-flex items-center justify-center rounded-full bg-black px-14 py-4 text-base font-medium text-white transition-colors duration-200 hover:bg-neutral-800"
            >
              Shop Now
            </Link>
          </div>

          <HeroStats />
        </div>

        {/* Right Column: Hero Visual with Sparkle Stars */}
        <div className="relative flex justify-center md:w-[50%] lg:w-[48%] self-end">
          {/* Small Sparkle Star on Left */}
          <Sparkle className="absolute -left-2 top-[46%] z-20 h-11 w-11 text-black sm:-left-4 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />

          {/* Large Sparkle Star on Top Right */}
          <Sparkle className="absolute right-4 top-2 z-20 h-16 w-16 text-black sm:right-6 sm:top-4 sm:h-20 sm:w-20 lg:h-24 lg:w-24" />

          {/* Transparent Model Cutout Image pinned to bottom edge */}
          <div className="relative flex items-end justify-center">
            <img
              src="/images/hero.webp"
              alt="Models representing Shop.co fashion"
              className="h-auto w-full max-w-[580px] object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

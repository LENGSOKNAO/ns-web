"use client";

import { useState } from "react";
import { RiAccountCircleLine } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <header className="border-b border-gray-100 bg-white">
      <nav className="mx-auto flex max-w-[1440px] items-center gap-6 px-5 py-5 md:px-10 lg:px-20">
        <a
          href="/"
          className="shrink-0 text-2xl font-black tracking-tight text-black sm:text-3xl"
        >
          SSTORE.CO
        </a>

        <div className="hidden shrink-0 items-center gap-5 text-sm text-black lg:flex">
          <a href="/category" className="flex items-center gap-1">
            Shop <span>⌄</span>
          </a>
          <a href="/products?sale=true">On Sale</a>
          <a href="/products?sort=newest">New Arrivals</a>
          <a href="/category?type=brands">Brands</a>
        </div>

        <form
          className="flex min-w-0 flex-1 items-center rounded-full bg-[#f0f0f0] px-4 py-3"
          onSubmit={(event) => {
            event.preventDefault();
            window.location.href = `/products?search=${encodeURIComponent(search)}`;
          }}
        >
          <span className="mr-3 text-xl text-gray-500" aria-hidden="true">
            ⌕
          </span>

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search for products..."
            aria-label="Search products"
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </form>

        <div className="flex shrink-0 items-center gap-4 text-xl text-black">
          <a href="/cart" aria-label="Shopping cart">
            <FiShoppingCart />
          </a>
          <a href="/login" aria-label="Account">
            <RiAccountCircleLine />
          </a>
        </div>
      </nav>
    </header>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  RiAccountCircleLine,
  RiArrowDownSLine,
  RiMenuLine,
  RiCloseLine,
  RiSearch2Line,
} from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { headerMenu } from "@/mocks/homepage";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-gray-100 bg-white">
      <nav className="mx-auto flex max-w-[1440px] items-center gap-4 px-5 py-5 md:gap-6 md:px-10 lg:px-20">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-2xl text-black lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <RiCloseLine /> : <RiMenuLine />}
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-2xl font-black tracking-tight text-black sm:text-3xl"
        >
          SSTORE.CO
        </Link>

        {/* Desktop menu */}
        <div className="hidden shrink-0 items-center gap-5 text-sm text-black lg:flex">
          {headerMenu.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => {
                if (item.children) setShopOpen(true);
              }}
              onMouseLeave={() => {
                if (item.children) setShopOpen(false);
              }}
            >
              {item.children ? (
                <>
                  <button
                    type="button"
                    onClick={() => setShopOpen(!shopOpen)}
                    className="flex items-center gap-1 py-2"
                    aria-expanded={shopOpen}
                  >
                    {item.label}
                    <RiArrowDownSLine
                      className={`text-lg transition-transform ${
                        shopOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {shopOpen && (
                    <div className="absolute left-0 top-full min-w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setShopOpen(false)}
                          className="block rounded-lg px-4 py-3 hover:bg-gray-100"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="block py-2 hover:text-gray-500"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Search */}
        <form
          className="flex min-w-0 flex-1 items-center rounded-full bg-[#f0f0f0] px-3 py-3 sm:px-4"
          onSubmit={(event) => {
            event.preventDefault();
            const query = search.trim();

            if (query) {
              window.location.href = `/products?search=${encodeURIComponent(query)}`;
            }
          }}
        >
          <span
            className="mr-2 text-xl text-gray-500 sm:mr-3"
            aria-hidden="true"
          >
            <RiSearch2Line />
          </span>

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full min-w-0 bg-transparent text-sm text-black outline-none placeholder:text-gray-400"
          />
        </form>

        {/* Cart and account */}
        <div className="flex shrink-0 items-center gap-3 text-xl text-black sm:gap-4">
          <Link href="/cart" aria-label="Shopping cart">
            <FiShoppingCart />
          </Link>
          <Link href="/login" aria-label="Account">
            <RiAccountCircleLine />
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-3 text-black lg:hidden">
          {headerMenu.map((item) => (
            <div key={item.label} className="border-b border-gray-100">
              {item.children ? (
                <>
                  <button
                    type="button"
                    onClick={() => setShopOpen(!shopOpen)}
                    className="flex w-full items-center justify-between py-3 text-left"
                    aria-expanded={shopOpen}
                  >
                    {item.label}
                    <RiArrowDownSLine
                      className={`text-lg transition-transform ${
                        shopOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {shopOpen && (
                    <div className="pb-3 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => {
                            setMobileOpen(false);
                            setShopOpen(false);
                          }}
                          className="block py-2 text-sm text-gray-600 hover:text-black"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

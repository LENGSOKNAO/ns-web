"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RiAccountCircleLine,
  RiArrowDownSLine,
  RiMenuLine,
  RiCloseLine,
  RiSearch2Line,
} from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { headerMenu } from "@/mocks/homepage";
import { useCart } from "@/hooks/useCart";

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { cartCount } = useCart();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/category/men?search=${encodeURIComponent(search.trim())}`);
      setMobileSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 md:gap-8 lg:px-20 lg:py-6">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-2xl text-black lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <RiCloseLine /> : <RiMenuLine />}
          </button>

          <Link
            href="/"
            className="font-integral text-2xl font-black tracking-tight text-black sm:text-3xl lg:text-[32px]"
          >
            SHOP.CO
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden shrink-0 items-center gap-6 text-base font-normal text-black lg:flex xl:gap-8">
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
                    className="flex items-center gap-1.5 py-1 text-black transition-colors hover:text-black/70"
                    aria-expanded={shopOpen}
                  >
                    <span>{item.label}</span>
                    <RiArrowDownSLine
                      className={`text-lg transition-transform duration-200 ${
                        shopOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {shopOpen && (
                    <div className="absolute left-0 top-full z-50 min-w-48 rounded-2xl border border-black/10 bg-white p-2 shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setShopOpen(false)}
                          className="block rounded-xl px-4 py-2.5 text-sm text-black transition-colors hover:bg-neutral-100"
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
                  className="py-1 text-black transition-colors hover:text-black/70"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Center-Right: Search Input */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden min-w-[200px] flex-1 items-center rounded-full bg-[#F0F0F0] px-4 py-3 md:flex lg:max-w-[560px]"
        >
          <RiSearch2Line className="shrink-0 text-xl text-black/40" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products..."
            className="w-full bg-transparent px-3 text-sm text-black placeholder:text-black/40 focus:outline-none"
          />
        </form>

        {/* Right Tools: Search (mobile), Cart, Account */}
        <div className="flex shrink-0 items-center gap-4 text-2xl text-black sm:gap-5">
          {/* Mobile search toggle */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="text-2xl md:hidden"
            aria-label="Toggle search"
          >
            <RiSearch2Line />
          </button>

          {/* Cart Icon with Counter Badge */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center transition-opacity hover:opacity-75"
            aria-label="Shopping Cart"
          >
            <FiShoppingCart className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Account Icon */}
          <Link
            href="/cart"
            className="flex items-center justify-center transition-opacity hover:opacity-75"
            aria-label="Account Profile"
          >
            <RiAccountCircleLine className="text-2xl" />
          </Link>
        </div>
      </nav>

      {/* Mobile Search Bar Dropdown */}
      {mobileSearchOpen && (
        <div className="border-t border-black/10 bg-white px-5 py-3 md:hidden">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center rounded-full bg-[#F0F0F0] px-4 py-2.5"
          >
            <RiSearch2Line className="text-xl text-black/40" />
            <input
              type="search"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for products..."
              className="w-full bg-transparent px-3 text-sm text-black placeholder:text-black/40 focus:outline-none"
            />
          </form>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[65px] z-40 bg-black/50 lg:hidden">
          <div className="h-full w-4/5 max-w-xs bg-white p-6 shadow-2xl">
            <div className="flex flex-col space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-black/40">
                Menu
              </p>
              {headerMenu.map((item) => (
                <div key={item.label} className="border-b border-black/5 pb-2">
                  {item.children ? (
                    <div>
                      <p className="font-semibold text-black">{item.label}</p>
                      <div className="mt-2 pl-3 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm text-black/70 hover:text-black"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-base font-semibold text-black hover:text-black/70"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

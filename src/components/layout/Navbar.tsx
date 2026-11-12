"use client";

import { useEffect, useState } from "react";
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
import { useCart } from "@/context/CartContext";
import SideDrawer from "@/components/ui/SideDrawer";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { cartCount, openCart } = useCart();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = search.trim();

    if (query) {
      window.location.href = `/products?search=${encodeURIComponent(query)}`;
    }
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setShopOpen(false);
  };
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="relative z-50 border-b border-gray-100 bg-white">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-4 sm:px-8 lg:justify-start lg:gap-6 lg:px-20">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setMobileSearchOpen(false);
          }}
          className="shrink-0 text-2xl text-black lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <RiCloseLine /> : <RiMenuLine />}
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-xl font-black tracking-tight text-black sm:text-2xl lg:text-3xl"
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

        {/* Desktop search */}
        <form
          onSubmit={handleSearch}
          className="hidden min-w-0 flex-1 items-center rounded-full bg-[#f0f0f0] px-4 py-3 lg:flex"
        >
          <RiSearch2Line className="mr-3 shrink-0 text-xl text-gray-500" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full min-w-0 bg-transparent text-sm text-black outline-none placeholder:text-gray-400"
          />
        </form>

        {/* Right side actions */}
        <div className="ml-auto flex shrink-0 items-center gap-3 text-xl text-black sm:gap-4 lg:ml-0">
          {/* Mobile search icon */}
          <button
            type="button"
            onClick={() => {
              setMobileSearchOpen(!mobileSearchOpen);
              setMobileOpen(false);
            }}
            className="text-xl lg:hidden"
            aria-label="Search products"
            aria-expanded={mobileSearchOpen}
          >
            {mobileSearchOpen ? <RiCloseLine /> : <RiSearch2Line />}
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={openCart}
            aria-label="Open cart"
            className="relative"
          >
            <FiShoppingCart className="text-2xl" />

            {isMounted && cartCount > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-black px-1.5 text-xs text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account */}
          <Link href="/login" aria-label="Account">
            <RiAccountCircleLine />
          </Link>
        </div>
      </nav>

      {/* Mobile search input */}
      {mobileSearchOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 lg:hidden">
          <form
            onSubmit={handleSearch}
            className="flex items-center rounded-full bg-[#f0f0f0] px-4 py-3"
          >
            <RiSearch2Line className="mr-3 shrink-0 text-xl text-gray-500" />

            <input
              type="search"
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="w-full min-w-0 bg-transparent text-sm text-black outline-none placeholder:text-gray-400"
            />
          </form>
        </div>
      )}

      {/* Mobile menu backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 top-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Mobile slide-in menu */}
      <SideDrawer
        open={mobileOpen}
        onClose={closeMobileMenu}
        side="left"
        title="SSTORE.CO"
      >
        <div className="flex h-full flex-col justify-between px-5 py-6">
          {/* Navigation */}
          <div className="space-y-2">
            {headerMenu.map((item) => (
              <div key={item.label} className="border-b border-gray-100">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setShopOpen(!shopOpen)}
                      className="flex w-full items-center justify-between py-4 text-base font-medium"
                    >
                      {item.label}
                      <RiArrowDownSLine
                        className={`text-xl transition-transform ${
                          shopOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {shopOpen && (
                      <div className="space-y-1 pb-4 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeMobileMenu}
                            className="block py-3 text-sm text-gray-500"
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
                    onClick={closeMobileMenu}
                    className="block py-4 text-base font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Bottom links */}
          <div className="border-t border-gray-100 pt-5">
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 py-3 text-sm"
            >
              <RiAccountCircleLine className="text-xl" />
              My Account
            </Link>

            <Link
              href="/cart"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 py-3 text-sm"
            >
              <FiShoppingCart className="text-xl" />
              My Cart ({cartCount})
            </Link>
          </div>
        </div>
      </SideDrawer>
    </header>
  );
}

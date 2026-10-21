"use client";

import { useState } from "react";
import Link from "next/link";
import { FiTrash2, FiArrowRight } from "react-icons/fi";
import { HiOutlineTag } from "react-icons/hi2";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    deliveryFee,
    total,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      setPromoApplied(true);
    }
  };

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-6 sm:px-6 sm:py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-black/60">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span>&gt;</span>
        <span className="font-medium text-black">Cart</span>
      </nav>

      {/* Page Title */}
      <h1 className="font-integral text-3xl font-extrabold uppercase tracking-tight text-black sm:text-4xl">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="mt-12 rounded-[20px] border border-black/10 py-16 text-center">
          <p className="text-xl font-medium text-black">Your cart is empty</p>
          <p className="mt-2 text-sm text-black/60">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link
            href="/category/men"
            className="mt-6 inline-flex rounded-full bg-black px-8 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cart Items List */}
          <div className="rounded-[20px] border border-black/10 p-4 sm:p-6 lg:col-span-7">
            <div className="divide-y divide-black/10">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}-${index}`}
                  className="flex gap-4 py-4 sm:gap-6 sm:py-6 first:pt-0 last:pb-0"
                >
                  {/* Thumbnail */}
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-[#F0EEED] p-2 sm:h-28 sm:w-28">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain object-center drop-shadow-sm"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="text-base font-bold text-black sm:text-lg">
                          {item.name}
                        </h2>
                        <p className="mt-1 text-xs text-black/60 sm:text-sm">
                          Size:{" "}
                          <span className="font-normal text-black/80">
                            {item.size}
                          </span>
                        </p>
                        <p className="text-xs text-black/60 sm:text-sm">
                          Color:{" "}
                          <span className="font-normal text-black/80">
                            {item.color}
                          </span>
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.id, item.size, item.color)
                        }
                        className="text-lg text-red-500 transition hover:text-red-700 sm:text-xl"
                        aria-label={`Remove ${item.name}`}
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    {/* Price and Quantity Stepper */}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-bold text-black sm:text-xl">
                        ${item.price}
                      </span>

                      <div className="flex items-center gap-3 rounded-full bg-[#F0F0F0] px-3.5 py-1.5 text-sm sm:gap-4 sm:px-4 sm:py-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1,
                              item.size,
                              item.color
                            )
                          }
                          className="text-base font-bold text-black transition hover:text-black/60"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="min-w-4 text-center font-medium text-black">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1,
                              item.size,
                              item.color
                            )
                          }
                          className="text-base font-bold text-black transition hover:text-black/60"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-[20px] border border-black/10 p-5 sm:p-6 lg:col-span-5">
            <h2 className="text-xl font-bold text-black sm:text-2xl">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-base">
              <div className="flex justify-between text-black/60">
                <span>Subtotal</span>
                <span className="font-bold text-black">${subtotal}</span>
              </div>

              <div className="flex justify-between text-black/60">
                <span>Discount (-20%)</span>
                <span className="font-bold text-[#FF3333]">
                  -${discountAmount}
                </span>
              </div>

              <div className="flex justify-between text-black/60">
                <span>Delivery Fee</span>
                <span className="font-bold text-black">${deliveryFee}</span>
              </div>

              <hr className="border-black/10 pt-1" />

              <div className="flex justify-between text-lg font-bold text-black">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="mt-6 flex gap-3">
              <div className="flex flex-1 items-center gap-2 rounded-full bg-[#F0F0F0] px-4 py-3">
                <HiOutlineTag className="text-xl text-black/40" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Add promo code"
                  className="w-full bg-transparent text-sm text-black placeholder:text-black/40 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Apply
              </button>
            </form>

            {promoApplied && (
              <p className="mt-2 text-xs font-medium text-green-600">
                ✓ Promo code applied successfully!
              </p>
            )}

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-sm font-medium text-white transition hover:bg-neutral-800 sm:text-base"
            >
              <span>Go to Checkout</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}


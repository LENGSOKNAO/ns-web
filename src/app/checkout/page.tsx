"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-[600px] px-5 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
          ✓
        </div>
        <h1 className="font-integral mt-6 text-3xl font-bold uppercase text-black">
          Order Confirmed!
        </h1>
        <p className="mt-3 text-sm text-black/60 sm:text-base">
          Thank you for your purchase. We&apos;ve sent a confirmation email with
          your order details and tracking link.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-black px-10 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-8 sm:px-6">
      <nav className="mb-6 flex items-center gap-2 text-sm text-black/60">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span>&gt;</span>
        <Link href="/cart" className="hover:text-black">
          Cart
        </Link>
        <span>&gt;</span>
        <span className="font-medium text-black">Checkout</span>
      </nav>

      <h1 className="font-integral text-3xl font-extrabold uppercase tracking-tight text-black">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Shipping Form */}
        <div className="rounded-[20px] border border-black/10 p-6 md:col-span-7">
          <h2 className="text-xl font-bold text-black">Shipping Address</h2>

          <div className="mt-5 space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-black/60">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  defaultValue="Alex"
                  className="mt-1 w-full rounded-xl border border-black/10 bg-[#F0F0F0] px-4 py-2.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-black/60">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  defaultValue="Kidd"
                  className="mt-1 w-full rounded-xl border border-black/10 bg-[#F0F0F0] px-4 py-2.5 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-black/60">
                Email Address
              </label>
              <input
                type="email"
                required
                defaultValue="alex.k@example.com"
                className="mt-1 w-full rounded-xl border border-black/10 bg-[#F0F0F0] px-4 py-2.5 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-black/60">
                Street Address
              </label>
              <input
                type="text"
                required
                placeholder="123 Fashion Blvd, Apt 4"
                className="mt-1 w-full rounded-xl border border-black/10 bg-[#F0F0F0] px-4 py-2.5 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-black/60">
                  City
                </label>
                <input
                  type="text"
                  required
                  placeholder="New York"
                  className="mt-1 w-full rounded-xl border border-black/10 bg-[#F0F0F0] px-4 py-2.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-black/60">
                  Postal Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="10001"
                  className="mt-1 w-full rounded-xl border border-black/10 bg-[#F0F0F0] px-4 py-2.5 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <h2 className="mt-8 text-xl font-bold text-black">Payment Details</h2>
          <div className="mt-4 space-y-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-black/10 p-3.5">
              <input type="radio" name="payment" defaultChecked className="accent-black" />
              <span className="font-medium text-black">Credit / Debit Card</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-black/10 p-3.5">
              <input type="radio" name="payment" className="accent-black" />
              <span className="font-medium text-black">PayPal</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-black/10 p-3.5">
              <input type="radio" name="payment" className="accent-black" />
              <span className="font-medium text-black">Apple Pay</span>
            </label>
          </div>
        </div>

        {/* Order review */}
        <div className="rounded-[20px] border border-black/10 p-6 md:col-span-5">
          <h2 className="text-xl font-bold text-black">Summary</h2>

          <div className="mt-4 divide-y divide-black/10 text-sm">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between py-2.5">
                <span className="text-black/80">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-black">
                  ${item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-black/10 pt-4">
            <div className="flex justify-between text-lg font-bold text-black">
              <span>Total to Pay</span>
              <span>${total}</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-black py-4 text-center font-medium text-white transition hover:bg-neutral-800"
          >
            Pay ${total} Now
          </button>
        </div>
      </form>
    </div>
  );
}

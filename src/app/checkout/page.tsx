"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  getCheckoutProfile,
  type CheckoutProfile,
} from "@/services/checkout.service";

export default function CheckoutPage() {
  const { cartItems, subtotal, updateQuantity, removeFromCart } = useCart();

  const [profile, setProfile] = useState<CheckoutProfile | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    getCheckoutProfile().then(setProfile);
  }, []);

  const shipping =
    deliveryMethod === "express"
      ? 15
      : subtotal >= 200 || subtotal === 0
        ? 0
        : 10;

  const total = subtotal + shipping;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cartItems.length === 0 || !profile) return;

    // Demo only. Connect this to your order API later.
    setIsSubmitted(true);
  };

  if (cartItems.length === 0 && !isSubmitted) {
    return (
      <main className="mx-auto max-w-[1440px] px-5 py-20 text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-3 text-gray-500">
          Add some products before proceeding to checkout.
        </p>
        <Link
          href="/category"
          className="mt-6 inline-block rounded-full bg-black px-8 py-3 text-white"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  if (isSubmitted) {
    return (
      <main className="mx-auto max-w-[1440px] px-5 py-20 text-center">
        <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 p-8">
          <div className="text-5xl">✓</div>
          <h1 className="mt-5 text-3xl font-bold">
            Order Placed Successfully!
          </h1>
          <p className="mt-3 text-gray-500">
            This is a frontend demo. Your order has not been saved or paid.
          </p>
          <Link
            href="/category"
            className="mt-7 inline-block rounded-full bg-black px-8 py-3 text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="mx-auto max-w-[1440px] px-5 py-20 text-center">
        <p className="text-gray-500">Loading checkout information...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 lg:px-20">
      <div className="relative mb-4 flex items-center justify-between px-4 py-3">
        <div className="text-2xl font-extrabold uppercase md:text-3xl">
          Checkout
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl font-extrabold underline uppercase md:text-3xl">
            SSTORE.CO
          </h1>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        <div className="space-y-7 lg:col-span-2">
          {/* Customer Account */}
          <section className="rounded-2xl border border-gray-200 p-5 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Customer Information</h2>
              <Link href="/profile" className="text-sm font-medium underline">
                Edit Profile
              </Link>
            </div>

            <div className="mt-5 space-y-2 text-sm">
              <p className="font-semibold">
                {profile.firstName} {profile.lastName}
              </p>
              <p className="text-gray-500">{profile.email}</p>
              <p className="text-gray-500">{profile.phone}</p>
            </div>
          </section>

          {/* Saved Address */}
          <section className="rounded-2xl border border-gray-200 p-5 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Delivery Address</h2>
              <Link href="/profile" className="text-sm font-medium underline">
                Change Address
              </Link>
            </div>

            <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm">
              <p className="font-semibold">
                {profile.firstName} {profile.lastName}
              </p>
              <p className="mt-2 text-gray-600">{profile.address}</p>
              <p className="text-gray-600">
                {profile.district}, {profile.city}
              </p>
              <p className="text-gray-600">{profile.country}</p>
              <p className="mt-2 text-gray-600">{profile.phone}</p>
            </div>
          </section>

          {/* Delivery Method */}
          <section className="rounded-2xl border border-gray-200 p-5 md:p-7">
            <h2 className="text-xl font-bold">Delivery Method</h2>

            <div className="mt-5 space-y-3">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    checked={deliveryMethod === "standard"}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">Standard Delivery</p>
                    <p className="text-sm text-gray-500">3–5 business days</p>
                  </div>
                </div>
                <span className="font-semibold">
                  {subtotal >= 200 ? "Free" : "$10"}
                </span>
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="express"
                    checked={deliveryMethod === "express"}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">Express Delivery</p>
                    <p className="text-sm text-gray-500">1–2 business days</p>
                  </div>
                </div>
                <span className="font-semibold">$15</span>
              </label>
            </div>
          </section>

          {/* Payment Method */}
          <section className="rounded-2xl border border-gray-200 p-5 md:p-7">
            <h2 className="text-xl font-bold">Payment Method</h2>

            <div className="mt-5 space-y-3">
              {[
                { value: "cash", label: "Cash on Delivery" },
                { value: "card", label: "Credit / Debit Card (Demo)" },
                { value: "bank", label: "Bank Transfer (Demo)" },
              ].map((method) => (
                <label
                  key={method.value}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border p-4"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>{method.label}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Order Summary */}

        <aside className="h-fit rounded-2xl border border-gray-200 p-5 md:p-7">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="mt-5 space-y-5">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex gap-3 border-b border-gray-100 pb-5 text-sm"
              >
                {/* Product Image */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Product Information */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold">{item.name}</p>

                    {/* Remove Product */}
                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.id, item.color, item.size)
                      }
                      aria-label={`Remove ${item.name}`}
                      title="Remove item"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <span className="text-xl leading-none">×</span>
                    </button>
                  </div>

                  <p className="mt-1 text-gray-500">Color: {item.color}</p>
                  <p className="text-gray-500">Size: {item.size}</p>

                  <p className="mt-1 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Stock Information */}
                  <p className="mt-1 text-xs text-gray-500">
                    {item.stock !== undefined
                      ? `${item.stock} available`
                      : "Stock availability pending"}
                  </p>

                  {/* Quantity Controls */}
                  <div className="mt-3 flex w-fit items-center rounded-full border border-gray-200">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.color,
                          item.size,
                          item.quantity - 1,
                        )
                      }
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                      className="px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      −
                    </button>

                    <span className="min-w-8 text-center font-medium">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.color,
                          item.size,
                          item.quantity + 1,
                        )
                      }
                      disabled={
                        item.stock !== undefined && item.quantity >= item.stock
                      }
                      aria-label="Increase quantity"
                      className="px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="mt-6 space-y-4 border-t border-gray-200 pt-5">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-4">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={cartItems.length === 0}
            className="mt-7 w-full rounded-full bg-black px-5 py-4 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Place Order
          </button>

          <p className="mt-4 text-center text-xs text-gray-500">
            By placing your order, you agree to our terms and conditions.
          </p>
        </aside>
      </form>
    </main>
  );
}

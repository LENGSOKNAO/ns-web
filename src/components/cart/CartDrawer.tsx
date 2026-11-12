"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiHeart,
  FiShoppingBag,
} from "react-icons/fi";

import SideDrawer from "@/components/ui/SideDrawer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { Product, ProductVariant } from "@/types/catalog";

export default function CartDrawer() {
  const {
    cartItems,
    cartCount,
    subtotal,
    cartOpen,
    activeDrawerTab,
    closeCart,
    setActiveDrawerTab,
    updateQuantity,
    removeFromCart,
    addToCart,
    changeCartVariant,
  } = useCart();

  const { wishlistItems, wishlistCount, toggleWishlist, removeFromWishlist } =
    useWishlist();

  const [wishlistColors, setWishlistColors] = useState<Record<number, string>>(
    {},
  );
  const [wishlistSizes, setWishlistSizes] = useState<Record<number, string>>(
    {},
  );

  const getColors = (variants: ProductVariant[] = []) => [
    ...new Set(
      variants
        .filter((variant) => variant.color)
        .map((variant) => variant.color!.name),
    ),
  ];

  const getSizes = (variants: ProductVariant[] = [], color: string) => [
    ...new Set(
      variants
        .filter(
          (variant) =>
            variant.color?.name === color &&
            variant.size &&
            variant.stock_quantity > 0,
        )
        .map((variant) => variant.size!.name),
    ),
  ];

  return (
    <SideDrawer
      open={cartOpen}
      onClose={closeCart}
      side="right"
      title="Your Bag"
      width="w-[95%] max-w-[650px]"
    >
      <div className="flex h-full flex-col bg-white">
        {/* Tabs */}
        <div className="grid shrink-0 grid-cols-2 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveDrawerTab("cart")}
            className={`flex items-center justify-center gap-2 border-b-2 py-4 text-sm font-semibold ${
              activeDrawerTab === "cart"
                ? "border-black text-black"
                : "border-transparent text-gray-400"
            }`}
          >
            <FiShoppingBag />
            Cart ({cartCount})
          </button>

          <button
            type="button"
            onClick={() => setActiveDrawerTab("wishlist")}
            className={`flex items-center justify-center gap-2 border-b-2 py-4 text-sm font-semibold ${
              activeDrawerTab === "wishlist"
                ? "border-black text-black"
                : "border-transparent text-gray-400"
            }`}
          >
            <FiHeart />
            Wishlist ({wishlistCount})
          </button>
        </div>

        {/* Cart */}
        {activeDrawerTab === "cart" && (
          <>
            {cartItems.length === 0 ? (
              <EmptyState message="Your cart is empty." />
            ) : (
              <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-8">
                {cartItems.map((item) => {
                  const variants = item.variants ?? [];
                  const colors = getColors(variants);
                  const sizes = getSizes(variants, item.color);

                  const selectedVariant = variants.find(
                    (variant) =>
                      variant.color?.name === item.color &&
                      variant.size?.name === item.size,
                  );

                  const stock =
                    selectedVariant?.stock_quantity ?? item.stock ?? 0;

                  return (
                    <article
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="flex gap-4 border-b border-gray-200 pb-5"
                    >
                      <div className="relative h-32 w-28 shrink-0 overflow-hidden bg-gray-100">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="112px"
                            className="object-contain"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-gray-400">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-sm font-semibold text-black">
                            {item.name}
                          </h3>

                          <div className="flex shrink-0 gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                const product: Product = {
                                  id: Number(item.id),
                                  name: item.name,
                                  description: "",
                                  price: item.price,
                                  image: item.image ?? "",
                                  originalPrice: item.oldPrice,
                                  stock: item.stock ?? 0,
                                  variants,
                                };
                                toggleWishlist(product);
                              }}
                              aria-label="Add to wishlist"
                              className="text-gray-500 hover:text-red-500"
                            >
                              <FiHeart size={18} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(item.id, item.color, item.size)
                              }
                              aria-label="Remove item"
                              className="text-gray-500 hover:text-red-500"
                            >
                              <FiTrash2 size={17} />
                            </button>
                          </div>
                        </div>

                        {/* Color selector */}
                        {colors.length > 0 && (
                          <label className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                            Color
                            <select
                              value={item.color}
                              onChange={(event) => {
                                const newColor = event.target.value;
                                const newSizes = getSizes(variants, newColor);
                                const newSize = newSizes.includes(item.size)
                                  ? item.size
                                  : newSizes[0];

                                const variant = variants.find(
                                  (v) =>
                                    v.color?.name === newColor &&
                                    v.size?.name === newSize,
                                );

                                if (variant && newSize) {
                                  changeCartVariant(
                                    item.id,
                                    item.color,
                                    item.size,
                                    item.color,
                                    newSize,
                                  );
                                }
                              }}
                              className="rounded border border-gray-200 px-2 py-1 text-black"
                            >
                              {colors.map((color) => (
                                <option key={color} value={color}>
                                  {color}
                                </option>
                              ))}
                            </select>
                          </label>
                        )}

                        {/* Size selector */}
                        {sizes.length > 0 && (
                          <label className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                            Size
                            <select
                              value={item.size}
                              onChange={(event) => {
                                const newSize = event.target.value;
                                const variant = variants.find(
                                  (v) =>
                                    v.color?.name === item.color &&
                                    v.size?.name === newSize,
                                );

                                if (variant) {
                                  changeCartVariant(
                                    item.id,
                                    item.color,
                                    item.size,
                                    item.color,
                                    newSize,
                                  );
                                }
                              }}
                              className="rounded border border-gray-200 px-2 py-1 text-black"
                            >
                              {sizes.map((size) => (
                                <option key={size} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                          </label>
                        )}

                        <p
                          className={`mt-2 text-xs ${stock > 0 ? "text-gray-500" : "text-red-500"}`}
                        >
                          {stock > 0 ? `${stock} available` : "Out of stock"}
                        </p>

                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                          <div className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2">
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
                              className="text-gray-600 disabled:opacity-30"
                            >
                              <FiMinus size={12} />
                            </button>

                            <span className="min-w-4 text-center text-sm">
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
                              disabled={item.quantity >= stock}
                              className="text-gray-600 disabled:opacity-30"
                            >
                              <FiPlus size={12} />
                            </button>
                          </div>

                          <span className="text-sm font-bold text-black">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="shrink-0 space-y-3 border-t border-gray-200 bg-white px-5 py-5 sm:px-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Subtotal ({cartCount} items)
                  </span>
                  <span className="text-lg font-bold text-black">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-gray-400">
                  Shipping and taxes calculated at checkout.
                </p>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full rounded-md bg-black py-3.5 text-center text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Checkout
                </Link>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block w-full rounded-md bg-gray-100 py-3.5 text-center text-sm font-semibold text-black hover:bg-gray-200"
                >
                  View Bag
                </Link>
              </div>
            )}
          </>
        )}

        {/* Wishlist */}
        {activeDrawerTab === "wishlist" && (
          <>
            {wishlistItems.length === 0 ? (
              <EmptyState message="Your wishlist is empty." />
            ) : (
              <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-8">
                {wishlistItems.map((item) => {
                  const variants = item.variants ?? [];
                  const colors = getColors(variants);

                  const selectedColor =
                    wishlistColors[item.id] ?? colors[0] ?? "";

                  const availableSizes = getSizes(variants, selectedColor);

                  const selectedSize =
                    wishlistSizes[item.id] ?? availableSizes[0] ?? "";

                  const selectedVariant = variants.find(
                    (variant) =>
                      variant.color?.name === selectedColor &&
                      variant.size?.name === selectedSize,
                  );

                  return (
                    <article
                      key={item.id}
                      className="flex gap-4 border-b border-gray-200 pb-5"
                    >
                      <div className="relative h-32 w-28 shrink-0 overflow-hidden bg-gray-100">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="112px"
                            className="object-contain"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-gray-400">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-sm font-semibold text-black">
                              {item.name}
                            </h3>
                            <p className="mt-2 text-sm font-bold text-black">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromWishlist(item.id)}
                            aria-label="Remove from wishlist"
                            className="text-red-500"
                          >
                            <FiHeart size={18} fill="currentColor" />
                          </button>
                        </div>

                        {colors.length > 0 ? (
                          <>
                            <label className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                              Color
                              <select
                                value={selectedColor}
                                onChange={(event) => {
                                  const newColor = event.target.value;
                                  const newSizes = getSizes(variants, newColor);

                                  setWishlistColors((prev) => ({
                                    ...prev,
                                    [item.id]: newColor,
                                  }));

                                  setWishlistSizes((prev) => ({
                                    ...prev,
                                    [item.id]: newSizes[0] ?? "",
                                  }));
                                }}
                                className="min-w-0 flex-1 rounded border border-gray-200 px-2 py-1 text-black"
                              >
                                {colors.map((color) => (
                                  <option key={color} value={color}>
                                    {color}
                                  </option>
                                ))}
                              </select>
                            </label>

                            <label className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                              Size
                              <select
                                value={selectedSize}
                                onChange={(event) =>
                                  setWishlistSizes((prev) => ({
                                    ...prev,
                                    [item.id]: event.target.value,
                                  }))
                                }
                                className="min-w-0 flex-1 rounded border border-gray-200 px-2 py-1 text-black"
                              >
                                {availableSizes.map((size) => (
                                  <option key={size} value={size}>
                                    {size}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </>
                        ) : (
                          <p className="mt-3 text-xs text-gray-500">
                            No variants available
                          </p>
                        )}

                        <button
                          type="button"
                          disabled={
                            !selectedVariant ||
                            selectedVariant.stock_quantity <= 0
                          }
                          onClick={() => {
                            if (!selectedVariant) return;

                            addToCart({
                              id: String(item.id),
                              name: item.name,
                              price: selectedVariant.price,
                              oldPrice: item.originalPrice,
                              image: item.image,
                              color: selectedColor,
                              size: selectedSize,
                              quantity: 1,
                              stock: selectedVariant.stock_quantity,
                              variants,
                            });
                          }}
                          className="mt-4 w-full rounded-md bg-black py-2.5 text-xs font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                          {!selectedVariant
                            ? "Select a variant"
                            : selectedVariant.stock_quantity <= 0
                              ? "Out of Stock"
                              : "Add to Cart"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </SideDrawer>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
      <FiShoppingBag className="mb-4 text-3xl text-gray-300" />
      <p className="text-sm font-semibold text-black">{message}</p>
      <p className="mt-2 text-sm text-gray-500">
        Browse our products and add your favorites.
      </p>
    </div>
  );
}

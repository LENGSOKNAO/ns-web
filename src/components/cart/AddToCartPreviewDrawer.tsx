"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";

import SideDrawer from "@/components/ui/SideDrawer";
import { useCart } from "@/context/CartContext";

export default function AddToCartPreviewDrawer() {
  const { previewOpen, closePreview, lastAddedItem, updateQuantity, openCart } =
    useCart();

  if (!lastAddedItem) return null;

  return (
    <SideDrawer
      open={previewOpen}
      onClose={closePreview}
      side="right"
      title="Added to your bag"
      width="w-[95%] max-w-[550px]"
    >
      <div className="flex h-full flex-col bg-white p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
            <FiCheck size={18} />
          </span>
          <p className="text-sm font-semibold text-green-700">
            Successfully added to your bag!
          </p>
        </div>

        <div className="flex gap-4 border-b border-gray-200 pb-1">
          <div className="relative h-32 w-28 shrink-0 bg-gray-100">
            {lastAddedItem.image && (
              <img
                src={lastAddedItem.image}
                alt={lastAddedItem.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="flex flex-1 flex-col">
            <h3 className="text-sm font-semibold text-black">
              {lastAddedItem.name}
            </h3>

            <p className="mt-2 text-sm font-bold text-black">
              ${lastAddedItem.price.toFixed(2)}
            </p>

            <div className="mt-3 space-y-2 text-xs text-gray-500">
              <p>
                Color:
                <span className="text-black"> {lastAddedItem.color}</span>
              </p>
              <p>
                Size:<span className="text-black"> {lastAddedItem.size}</span>
              </p>

              <div className="flex items-center gap-3">
                <span>Quantity:</span>

                <div className="flex items-center rounded-full bg-gray-100 h-8">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        lastAddedItem.id,
                        lastAddedItem.color,
                        lastAddedItem.size,
                        lastAddedItem.quantity - 1,
                      )
                    }
                    disabled={lastAddedItem.quantity <= 1}
                    className="px-3 py-1 disabled:opacity-30"
                  >
                    −
                  </button>

                  <span className="min-w-6 text-center text-black">
                    {lastAddedItem.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        lastAddedItem.id,
                        lastAddedItem.color,
                        lastAddedItem.size,
                        lastAddedItem.quantity + 1,
                      )
                    }
                    disabled={
                      lastAddedItem.quantity >=
                      (lastAddedItem.stock ?? Infinity)
                    }
                    className="px-3 py-1 disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-1 pt-1">
          <button
            type="button"
            onClick={() => {
              closePreview();
              openCart();
            }}
            className="w-full rounded-md border border-gray-300 py-3.5 text-center text-sm font-semibold text-black transition hover:bg-gray-100"
          >
            View Cart
          </button>

          <Link
            href="/checkout"
            onClick={closePreview}
            className="block w-full rounded-md text-center bg-black py-3.5 text-sm  font-semibold text-white transition hover:bg-gray-800"
          >
            Checkout
          </Link>
        </div>
      </div>
    </SideDrawer>
  );
}

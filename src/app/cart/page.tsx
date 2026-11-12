"use client";

import { useState } from "react";
import SideDrawer from "@/components/ui/SideDrawer";
import { FiShoppingCart } from "react-icons/fi";

export default function CartDrawer() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setCartOpen(true)}
        aria-label="Open cart"
      >
        <FiShoppingCart size={22} />
      </button>

      <SideDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        side="right"
        title="Your Cart"
        width="w-[90%] max-w-[450px]"
      >
        <div className="flex h-full flex-col p-5">
          {/* Replace with your actual cart items */}
          <p className="text-sm text-gray-500">
            Your cart items will appear here.
          </p>

          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="mt-auto w-full rounded-full bg-black py-3 text-sm font-medium text-white"
          >
            Continue Shopping
          </button>
        </div>
      </SideDrawer>
    </>
  );
}

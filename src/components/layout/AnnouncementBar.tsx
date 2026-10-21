"use client";

import { useState } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative flex min-h-[38px] items-center justify-center bg-black px-8 py-2 text-center text-xs text-white sm:text-sm">
      <p className="font-normal">
        Sign up and get 20% off to your first order.{" "}
        <Link
          href="/category/men"
          className="font-medium underline underline-offset-4 transition hover:text-neutral-300"
        >
          Sign Up Now
        </Link>
      </p>

      <button
        type="button"
        aria-label="Close announcement"
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-white/80 transition hover:text-white"
      >
        <IoClose />
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative flex min-h-7.5 items-center justify-center bg-black px-10 py-2 text-center text-xs text-white">
      <p>
        Sign up and get 20% off to your first order.{" "}
        <a href="/register" className="underline underline-offset-2">
          Sign Up Now
        </a>
      </p>

      <button
        type="button"
        aria-label="Close announcement"
        onClick={() => setVisible(false)}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-xl leading-none"
      >
        ×
      </button>
    </div>
  );
}

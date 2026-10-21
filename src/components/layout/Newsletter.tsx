"use client";

import { useState } from "react";
import { TfiEmail } from "react-icons/tfi";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="relative z-20 mx-auto -mb-20 max-w-[1240px] px-5 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-8 rounded-[20px] bg-black px-6 py-9 sm:px-10 sm:py-10 md:px-16 md:py-12 lg:flex-row">
        {/* Left Heading */}
        <h2 className="font-integral max-w-[550px] text-2xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
          Stay upto date about our latest offers
        </h2>

        {/* Right Form */}
        <div className="w-full sm:max-w-[350px]">
          {subscribed ? (
            <div className="rounded-full bg-white/10 px-6 py-3 text-center text-sm font-medium text-white backdrop-blur">
              ✓ Thanks for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-black">
                <TfiEmail className="shrink-0 text-lg text-black/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent text-sm text-black placeholder:text-black/40 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-white py-3 text-sm font-semibold text-black transition-colors duration-200 hover:bg-neutral-100"
              >
                Subscribe to Newsletter
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}


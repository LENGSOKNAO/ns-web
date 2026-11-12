import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-black">
            SSTORE<span className="text-gray-400">.CO</span>
          </h1>

          <h2 className="mt-6 text-2xl font-semibold text-black">{title}</h2>

          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {children}
        </div>
      </div>
    </section>
  );
}

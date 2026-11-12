import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { WishlistProvider } from "@/context/WishlistContext";
import AddToCartPreviewDrawer from "@/components/cart/AddToCartPreviewDrawer";
import SiteLayout from "@/components/layout/SiteLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sstore",
  description: "Welcome to our store",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <WishlistProvider>
            <Suspense fallback={null}>
              <SiteLayout>{children}</SiteLayout>
            </Suspense>

            {/* Cart drawers remain available */}
            <CartDrawer />
            <AddToCartPreviewDrawer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

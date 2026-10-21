import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Newsletter from "@/components/layout/Newsletter";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/providers/CartProvider";

const integralCF = localFont({
  src: [
    {
      path: "../../public/fonts/integralcf-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-integral",
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/satoshi-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "SHOP.CO | Find Clothes That Matches Your Style",
  description:
    "Shop the latest fashion trends at SHOP.CO. Discover clothing, accessories, and shoes for men, women, and kids.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${integralCF.variable} ${satoshi.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-black font-normal">
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <div className="flex-1">{children}</div>
          <Newsletter />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

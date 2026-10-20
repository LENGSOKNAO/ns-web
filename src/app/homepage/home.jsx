import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/home/HeroBanner";
import BrandStrip from "@/components/home/BrandsStrip";
import ProductSection from "@/components/home/ProductSection";
import { newArrivals, topSelling } from "@/mocks/products";
import BrowseByStyle from "@/components/home/BrowseByStyle";
import CustomerReviews from "@/components/home/CustomerReviews";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroBanner />
      <BrandStrip />
      <ProductSection title="New Arrivals" products={newArrivals} />
      <div className="mx-auto max-w-[1240px] px-5 sm:px-10">
        <hr className="border-gray-200" />
      </div>
      <ProductSection title="Top Selling" products={topSelling} />
      <BrowseByStyle />
      <CustomerReviews />
    </main>
  );
}

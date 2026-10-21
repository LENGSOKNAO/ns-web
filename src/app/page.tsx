import HeroBanner from "@/components/home/HeroBanner";
import BrandsStrip from "@/components/home/BrandsStrip";
import ProductSection from "@/components/home/ProductSection";
import BrowseByStyle from "@/components/home/BrowseByStyle";
import CustomerReviews from "@/components/home/CustomerReviews";
import { newArrivals, topSelling } from "@/mocks/products";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroBanner />

      {/* Brands Strip */}
      <BrandsStrip />

      {/* New Arrivals */}
      <ProductSection
        title="NEW ARRIVALS"
        products={newArrivals}
        viewAllHref="/category/men"
      />

      {/* Divider */}
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6">
        <hr className="border-t border-black/10" />
      </div>

      {/* Top Selling */}
      <ProductSection
        title="TOP SELLING"
        products={topSelling}
        viewAllHref="/category/men"
      />

      {/* Browse By Dress Style */}
      <BrowseByStyle />

      {/* Our Happy Customers */}
      <CustomerReviews />
    </main>
  );
}

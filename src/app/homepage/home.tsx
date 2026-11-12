import HeroBanner from "@/components/home/HeroBanner";
import BrandStrip from "@/components/home/BrandsStrip";
import ProductSection from "@/components/home/ProductSection";
import BrowseByStyle from "@/components/home/BrowseByStyle";
import CustomerReviews from "@/components/home/CustomerReviews";
import { getNewArrivals, getTopSelling } from "@/services/product.service";

export default async function Home() {
  const [newArrivals, topSelling] = await Promise.all([
    getNewArrivals(),
    getTopSelling(),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <HeroBanner />
      <BrandStrip />

      <ProductSection
        title="New Arrivals"
        products={newArrivals}
        imageRatio="3/4"
      />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-10">
        <hr className="border-gray-200" />
      </div>

      <ProductSection
        title="Top Selling"
        products={topSelling}
        imageRatio="3/4"
      />

      <BrowseByStyle />
      <CustomerReviews />
    </main>
  );
}

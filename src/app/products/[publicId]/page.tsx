import Link from "next/link";
import { notFound } from "next/navigation";

import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import ProductReviews from "@/components/products/ReviewCard";
import RelatedProducts from "@/components/products/RelatedProducts";
import { getProducts } from "@/services/product.service";

interface ProductPageProps {
  params: Promise<{ publicId: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { publicId } = await params;

  const products = await getProducts();
  const product = products.find((item) => item.public_id === publicId);

  if (!product) {
    notFound();
  }

  const productImages = product.images;

  return (
    <main className="mx-auto max-w-[1440px] px-5 py-6 md:px-10 lg:px-20">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        {" / "}
        <Link href="/category" className="hover:text-black">
          Shop
        </Link>
        {" / "}
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-10">
        <ProductGallery name={product.name} images={productImages} />

        <ProductInfo
          id={product.id}
          name={product.name}
          price={product.price}
          oldPrice={product.oldPrice}
          color={product.color}
          sizes={product.sizes}
          variants={product.variants}
          image={productImages[0] ?? "/images/placeholder.png"}
          stock={product.stock}
        />
      </div>

      <ProductReviews description={product.description} />

      {/* <RelatedProducts
        currentProductId={product.id}
        category={product.category}
      /> */}
    </main>
  );
}

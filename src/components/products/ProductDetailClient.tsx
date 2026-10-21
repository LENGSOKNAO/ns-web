"use client";

import { useState } from "react";
import Link from "next/link";
import { productsData, newArrivals } from "@/mocks/products";
import { customerReviews } from "@/mocks/reviews";
import ProductCard from "@/components/products/ProductCard";
import { useCart } from "@/hooks/useCart";

interface Props {
  slug: string;
}

export default function ProductDetailClient({ slug }: Props) {
  // Find product by slug or id or default to first
  const product =
    productsData.find(
      (p) =>
        p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug ||
        String(p.id) === slug
    ) || productsData[0];

  const galleryImages = product.gallery?.length
    ? product.gallery
    : [
        product.image,
        "/images/products/tape-tshirt-thumb2.png",
        "/images/products/tape-tshirt-thumb3.png",
      ];

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);
  const colors = product.colors || ["#4F4631", "#314F4A", "#31344F"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const sizes = product.sizes || ["Small", "Medium", "Large", "X-Large"];
  const [selectedSize, setSelectedSize] = useState(sizes[2] || sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "faqs">(
    "reviews"
  );
  const [addedMessage, setAddedMessage] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedImage || product.image,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2500);
  };

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-6 sm:px-6 sm:py-8">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-black/60">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span>&gt;</span>
        <Link href="/category/men" className="hover:text-black">
          Shop
        </Link>
        <span>&gt;</span>
        <span className="capitalize">{product.category || "Men"}</span>
        <span>&gt;</span>
        <span className="font-medium text-black">{product.name}</span>
      </nav>

      {/* Main Product Info Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-10">
        {/* Gallery: 3 Thumbnails + Main Photo */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row md:col-span-6 lg:col-span-6">
          {/* Thumbnails */}
          <div className="flex gap-3 sm:w-28 sm:flex-col sm:gap-3.5">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-[16px] bg-[#F0EEED] p-2 sm:w-full border-2 transition ${
                  selectedImage === img ? "border-black" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="h-full w-full object-contain object-center"
                />
              </button>
            ))}
          </div>

          {/* Main Large Image */}
          <div className="relative aspect-square flex-1 overflow-hidden rounded-[20px] bg-[#F0EEED] flex items-center justify-center p-6 sm:p-10">
            <img
              src={selectedImage}
              alt={product.name}
              className="h-full w-full object-contain object-center drop-shadow-sm"
            />
          </div>
        </div>

        {/* Product Details & Actions */}
        <div className="flex flex-col md:col-span-6 lg:col-span-6">
          <h1 className="font-integral text-2xl font-extrabold uppercase text-black sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          {/* Star Rating */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex text-[#FFC633]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-lg leading-none">
                  {i < Math.floor(product.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="text-sm text-black/60">
              {product.rating}/<span className="text-black/40">5</span>
            </span>
          </div>

          {/* Pricing */}
          <div className="mt-3.5 flex items-center gap-3">
            <span className="text-2xl font-bold text-black sm:text-3xl">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-2xl font-bold text-black/40 line-through sm:text-3xl">
                ${product.originalPrice}
              </span>
            )}
            {product.discount && (
              <span className="rounded-full bg-[#FF3333]/10 px-3 py-1 text-xs font-semibold text-[#FF3333]">
                -{product.discount}%
              </span>
            )}
          </div>

          <p className="mt-4 text-sm leading-6 text-black/60 sm:text-base">
            {product.description ||
              "This premium quality piece is perfect for any occasion. Crafted from breathable, soft-touch fabric for all-day comfort and effortless modern style."}
          </p>

          <hr className="my-6 border-black/10" />

          {/* Select Colors */}
          <div>
            <p className="text-sm font-medium text-black/60">Select Colors</p>
            <div className="mt-3 flex items-center gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 shadow-sm transition-transform hover:scale-105"
                  aria-label={`Select color ${color}`}
                >
                  {selectedColor === color && (
                    <span className="text-xs text-white">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <hr className="my-6 border-black/10" />

          {/* Choose Size */}
          <div>
            <p className="text-sm font-medium text-black/60">Choose Size</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-[#F0F0F0] text-black/60 hover:bg-neutral-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <hr className="my-6 border-black/10" />

          {/* Quantity Stepper & Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 rounded-full bg-[#F0F0F0] px-5 py-3.5 text-base">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-lg font-bold text-black hover:text-black/60"
              >
                -
              </button>
              <span className="min-w-6 text-center font-semibold text-black">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="text-lg font-bold text-black hover:text-black/60"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 rounded-full bg-black py-4 text-center text-sm font-semibold text-white transition hover:bg-neutral-800 sm:text-base"
            >
              Add to Cart
            </button>
          </div>

          {addedMessage && (
            <p className="mt-3 text-sm font-medium text-green-600">
              ✓ Added to cart!
            </p>
          )}
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16 sm:mt-20">
        <div className="flex border-b border-black/10 text-center text-base sm:text-lg">
          <button
            type="button"
            onClick={() => setActiveTab("details")}
            className={`flex-1 pb-4 font-medium transition ${
              activeTab === "details"
                ? "border-b-2 border-black font-bold text-black"
                : "text-black/60 hover:text-black"
            }`}
          >
            Product Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`flex-1 pb-4 font-medium transition ${
              activeTab === "reviews"
                ? "border-b-2 border-black font-bold text-black"
                : "text-black/60 hover:text-black"
            }`}
          >
            Rating &amp; Reviews
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("faqs")}
            className={`flex-1 pb-4 font-medium transition ${
              activeTab === "faqs"
                ? "border-b-2 border-black font-bold text-black"
                : "text-black/60 hover:text-black"
            }`}
          >
            FAQs
          </button>
        </div>

        {/* Tab Contents */}
        <div className="py-8">
          {activeTab === "reviews" && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-black sm:text-2xl">
                  All Reviews{" "}
                  <span className="text-sm font-normal text-black/60">
                    ({customerReviews.length})
                  </span>
                </h2>
                <button
                  type="button"
                  className="rounded-full bg-black px-5 py-2.5 text-xs font-medium text-white sm:text-sm"
                >
                  Write a Review
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {customerReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-[20px] border border-black/10 p-6"
                  >
                    <div className="flex text-[#FFC633]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-lg leading-none">
                          {i < rev.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-1.5">
                      <span className="font-bold text-black">{rev.name}</span>
                      {rev.verified && (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#01AB31] text-[10px] text-white">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-black/60">
                      {rev.comment}
                    </p>
                    {rev.date && (
                      <p className="mt-4 text-xs text-black/40">
                        Posted on {rev.date}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-black/70 sm:text-base">
              <p>
                Crafted from 100% premium combed ring-spun cotton. Pre-shrunk to
                maintain size and shape through repeated washings.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>100% Organic Breathable Cotton</li>
                <li>Tailored ribbed crew neck with tape details</li>
                <li>Machine wash cold with like colors</li>
                <li>Imported fashion cut designed for daily wear</li>
              </ul>
            </div>
          )}

          {activeTab === "faqs" && (
            <div className="max-w-2xl space-y-4 text-sm text-black/80 sm:text-base">
              <div>
                <h3 className="font-bold text-black">What is the return policy?</h3>
                <p className="mt-1 text-black/60">
                  We offer a 30-day hassle-free return policy on all unworn items with tags attached.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black">How long does shipping take?</h3>
                <p className="mt-1 text-black/60">
                  Standard delivery takes 3-5 business days. Express next-day shipping is also available at checkout.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* You Might Also Like Section */}
      <div className="mt-16 sm:mt-24">
        <h2 className="font-integral mb-8 text-center text-3xl font-extrabold uppercase tracking-tight text-black sm:mb-12 sm:text-4xl">
          You might also like
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {newArrivals.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}

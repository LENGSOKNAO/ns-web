"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import type { ProductVariant } from "@/types/catalog";

interface ProductInfoProps {
  id: string | number;
  name: string;
  price: number;
  oldPrice?: number;
  color: string;
  sizes: string[];
  sale?: boolean;
  image?: string;
  stock: number;
  variants: ProductVariant[];
}

export default function ProductInfo({
  id,
  name,
  price,
  oldPrice,
  color,
  sizes,
  sale,
  image,
  variants,
}: ProductInfoProps) {
  const { addToCart } = useCart();

  const colorOptions = color
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const [selectedColor, setSelectedColor] = useState(colorOptions[0] ?? "");
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Find the selected color + size variant
  const selectedVariant = variants.find(
    (variant) =>
      variant.color?.name === selectedColor &&
      variant.size?.name === selectedSize,
  );
  // Get available sizes for the selected color
  const availableSizes = useMemo(
    () => [
      ...new Set(
        variants
          .filter(
            (variant) =>
              variant.color?.name === selectedColor &&
              variant.stock_quantity > 0 &&
              variant.size?.name,
          )
          .map((variant) => variant.size!.name),
      ),
    ],
    [variants, selectedColor],
  );

  // Use stock from the selected variant
  const variantStock = selectedVariant?.stock_quantity ?? 0;
  const outOfStock = !selectedVariant || variantStock <= 0;

  useEffect(() => {
    setQuantity(1);

    if (!availableSizes.includes(selectedSize)) {
      setSelectedSize(availableSizes[0] ?? "");
    }
  }, [selectedColor, availableSizes]);

  const handleAddToCart = () => {
    if (!selectedVariant || outOfStock || quantity > variantStock) return;

    addToCart({
      id: String(id),
      name,
      price: selectedVariant.price,
      oldPrice,
      image,
      color: selectedColor,
      size: selectedSize,
      quantity,
      stock: variantStock,
      variants,
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-extrabold uppercase md:text-4xl">
          {name}
        </h1>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-3xl font-bold">${price}</span>

          {oldPrice !== undefined && oldPrice > price && (
            <>
              <span className="text-xl text-gray-400 line-through">
                ${oldPrice}
              </span>

              {sale && (
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">
                  -{Math.round(((oldPrice - price) / oldPrice) * 100)}%
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Select Color */}
      <div>
        <p className="mb-3 text-sm font-medium">Select Color</p>

        <div className="flex flex-wrap gap-4">
          {colorOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSelectedColor(item)}
              aria-label={`Select ${item}`}
              aria-pressed={selectedColor === item}
              className="flex flex-col items-center gap-2"
            >
              <span
                className={`h-9 w-9 rounded-full border-2 ${
                  selectedColor === item
                    ? "border-black ring-2 ring-gray-300 ring-offset-2"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: item.toLowerCase() }}
              />

              <span
                className={`text-xs ${
                  selectedColor === item
                    ? "font-semibold text-black"
                    : "text-gray-500"
                }`}
              >
                {item}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Select Size */}
      <div>
        <p className="mb-3 text-sm font-medium">Choose Size</p>

        <div className="flex flex-wrap gap-2">
          {availableSizes.length > 0 ? (
            availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
                className={`rounded-full px-4 py-2 text-sm ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {size}
              </button>
            ))
          ) : (
            <p className="text-sm text-red-500">
              No sizes available for this color.
            </p>
          )}
        </div>
      </div>

      {/* Variant Stock */}
      <div>
        <p
          className={`text-sm ${outOfStock ? "text-red-500" : "text-gray-500"}`}
        >
          {outOfStock ? "Out of stock" : `${variantStock} items available`}
        </p>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex gap-3">
        <div className="flex items-center rounded-full bg-gray-100 px-3">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1 || outOfStock}
            aria-label="Decrease quantity"
            className="px-2 py-3 disabled:opacity-30"
          >
            −
          </button>

          <span className="min-w-8 text-center">{quantity}</span>

          <button
            type="button"
            onClick={() =>
              setQuantity((current) => Math.min(variantStock, current + 1))
            }
            disabled={outOfStock || quantity >= variantStock}
            aria-label="Increase quantity"
            className="px-2 py-3 disabled:opacity-30"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={outOfStock}
          className="flex-1 rounded-full bg-black px-5 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {outOfStock
            ? "Out of Stock"
            : added
              ? "Added to Cart ✓"
              : "Add to Cart"}
        </button>
      </div>
    </section>
  );
}

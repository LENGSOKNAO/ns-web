"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { ProductVariant } from "@/types/catalog";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image?: string;
  color: string;
  size: string;
  quantity: number;
  stock?: number;
  variants?: ProductVariant[];
}

export type DrawerTab = "cart" | "wishlist";

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  subtotal: number;
  cartOpen: boolean;
  activeDrawerTab: DrawerTab;
  lastAddedItem: CartItem | null;
  previewOpen: boolean;
  closePreview: () => void;
  openCart: () => void;
  openWishlist: () => void;
  closeCart: () => void;
  setActiveDrawerTab: (tab: DrawerTab) => void;
  addToCart: (item: CartItem) => void;
  updateQuantity: (
    id: string,
    color: string,
    size: string,
    quantity: number,
  ) => void;
  removeFromCart: (id: string, color: string, size: string) => void;
  clearCart: () => void;
  changeCartVariant: (
    id: string,
    oldColor: string,
    oldSize: string,
    newColor: string,
    newSize: string,
  ) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState<DrawerTab>("cart");
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const openCart = () => {
    setActiveDrawerTab("cart");
    setCartOpen(true);
    setPreviewOpen(false);
  };

  const openWishlist = () => {
    setActiveDrawerTab("wishlist");
    setCartOpen(true);
    setPreviewOpen(false);
  };

  const closeCart = () => setCartOpen(false);
  const closePreview = () => setPreviewOpen(false);

  // Load cart
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("sstore-cart");

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }
    } catch (error) {
      console.error("Could not load cart:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem("sstore-cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Could not save cart:", error);
    }
  }, [cartItems, isLoaded]);

  // Add product to cart
  const addToCart = (item: CartItem) => {
    const maxStock = item.stock ?? Infinity;

    if (maxStock <= 0 || item.quantity <= 0) return;

    const existing = cartItems.find(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.color === item.color &&
        cartItem.size === item.size,
    );

    let actualAddedItem: CartItem;

    if (existing) {
      const newQuantity = Math.min(existing.quantity + item.quantity, maxStock);

      const addedQuantity = newQuantity - existing.quantity;

      if (addedQuantity <= 0) return;

      actualAddedItem = {
        ...item,
        quantity: addedQuantity,
      };

      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
            ? {
                ...cartItem,
                quantity: newQuantity,
                stock: maxStock,
                variants: item.variants,
              }
            : cartItem,
        ),
      );
    } else {
      actualAddedItem = {
        ...item,
        quantity: Math.min(item.quantity, maxStock),
      };

      setCartItems((prev) => [...prev, actualAddedItem]);
    }

    setLastAddedItem(actualAddedItem);
    setPreviewOpen(true);
    setCartOpen(false);
  };

  // Update quantity
  const updateQuantity = (
    id: string,
    color: string,
    size: string,
    quantity: number,
  ) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id && item.color === color && item.size === size) {
          const maxStock = item.stock ?? Infinity;

          return {
            ...item,
            quantity: Math.max(1, Math.min(quantity, maxStock)),
          };
        }

        return item;
      }),
    );

    setLastAddedItem((item) => {
      if (item?.id !== id || item.color !== color || item.size !== size) {
        return item;
      }

      return {
        ...item,
        quantity: Math.max(1, Math.min(quantity, item.stock ?? Infinity)),
      };
    });
  };

  // Change selected color and size in cart
  const changeCartVariant = (
    id: string,
    oldColor: string,
    oldSize: string,
    newColor: string,
    newSize: string,
  ) => {
    setCartItems((prev) => {
      const current = prev.find(
        (item) =>
          item.id === id && item.color === oldColor && item.size === oldSize,
      );

      if (!current) return prev;

      const selectedVariant = current.variants?.find(
        (variant) =>
          variant.color?.name === newColor && variant.size?.name === newSize,
      );

      if (!selectedVariant || selectedVariant.stock_quantity <= 0) {
        return prev;
      }

      const newStock = selectedVariant.stock_quantity;

      const existing = prev.find(
        (item) =>
          item.id === id && item.color === newColor && item.size === newSize,
      );

      if (existing && existing !== current) {
        const mergedQuantity = Math.min(
          existing.quantity + current.quantity,
          newStock,
        );

        return prev
          .filter((item) => item !== current)
          .map((item) =>
            item === existing
              ? {
                  ...item,
                  quantity: mergedQuantity,
                  stock: newStock,
                  price: selectedVariant.price,
                }
              : item,
          );
      }

      return prev.map((item) =>
        item === current
          ? {
              ...item,
              color: newColor,
              size: newSize,
              stock: newStock,
              price: selectedVariant.price,
              quantity: Math.min(item.quantity, newStock),
            }
          : item,
      );
    });
  };

  // Remove product
  const removeFromCart = (id: string, color: string, size: string) => {
    setCartItems((items) =>
      items.filter(
        (item) =>
          !(item.id === id && item.color === color && item.size === size),
      ),
    );

    setLastAddedItem((item) =>
      item?.id === id && item.color === color && item.size === size
        ? null
        : item,
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setLastAddedItem(null);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        cartOpen,
        activeDrawerTab,
        lastAddedItem,
        previewOpen,
        closePreview,
        openCart,
        openWishlist,
        closeCart,
        setActiveDrawerTab,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        changeCartVariant,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

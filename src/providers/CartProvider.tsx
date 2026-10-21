"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size?: string, color?: string) => void;
  updateQuantity: (id: number, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial sample cart items matching Figma mockup
const initialCart: CartItem[] = [
  {
    id: 1,
    name: "T-shirt with Tape Details",
    price: 120,
    image: "/images/products/tape-tshirt.png",
    size: "Large",
    color: "Black",
    quantity: 1,
  },
  {
    id: 3,
    name: "Checkered Shirt",
    price: 180,
    image: "/images/products/checkered-shirt.png",
    size: "Medium",
    color: "Red",
    quantity: 1,
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    price: 240,
    image: "/images/products/skinny-jeans.png",
    size: "Large",
    color: "Blue",
    quantity: 1,
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("shopco_cart");
        if (saved) return JSON.parse(saved);
      } catch {
        // Fallback to initialCart
      }
    }
    return initialCart;
  });

  useEffect(() => {
    try {
      localStorage.setItem("shopco_cart", JSON.stringify(cart));
    } catch {
      // Ignore storage error
    }
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) =>
          i.id === newItem.id &&
          i.size === newItem.size &&
          i.color === newItem.color
      );
      if (existing) {
        return prev.map((i) =>
          i === existing
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: number, size?: string, color?: string) => {
    setCart((prev) =>
      prev.filter((i) => {
        if (i.id !== id) return true;
        if (size && i.size !== size) return true;
        if (color && i.color !== color) return true;
        return false;
      })
    );
  };

  const updateQuantity = (
    id: number,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id && (!size || i.size === size) && (!color || i.color === color)) {
          return { ...i, quantity };
        }
        return i;
      })
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountRate = 0.2; // 20% discount matching Figma
  const discountAmount = Math.round(subtotal * discountRate);
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discountAmount + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        deliveryFee,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'chapter-co-cart';

function isValidCartItem(item) {
  return (
    item &&
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    Number.isFinite(item.price) &&
    Number.isFinite(item.originalPrice) &&
    Number.isFinite(item.stock) &&
    item.stock > 0 &&
    Number.isFinite(item.quantity) &&
    item.quantity >= 1
  );
}

function loadCart() {
  try {
    const saved = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidCartItem).map((item) => ({
      ...item,
      quantity: Math.min(Math.max(1, item.quantity), item.stock),
    }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Cart state should keep working even if storage is unavailable or full.
    }
  }, [items]);

  const value = useMemo(() => {
    const addToCart = (book, quantity = 1) => {
      if (!book || !Number.isFinite(book.stock) || book.stock < 1) return;

      setItems((current) => {
        const requestedQuantity = Math.max(1, Math.min(Math.floor(Number(quantity) || 1), book.stock));
        const existing = current.find((item) => item.id === book.id);

        if (existing) {
          return current.map((item) =>
            item.id === book.id
              ? { ...item, quantity: Math.min(item.quantity + requestedQuantity, book.stock) }
              : item
          );
        }

        return [...current, { ...book, quantity: requestedQuantity }];
      });
    };

    const increaseQuantity = (id) => {
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) } : item
        )
      );
    };

    const decreaseQuantity = (id) => {
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
        )
      );
    };

    const removeFromCart = (id) => {
      setItems((current) => current.filter((item) => item.id !== id));
    };

    const clearCart = () => setItems([]);

    return {
      items,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}

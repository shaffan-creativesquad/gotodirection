"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartLineClient = {
  id: number;
  productId: number;
  quantity: number;
  slug: string;
  partNumber: string;
  title: string;
  shortTitle: string;
  imageUrl: string;
  unitPrice: number;
  listPrice: number;
  condition: string;
  categoryName: string;
  lineTotal: number;
};

export type CartState = {
  lines: CartLineClient[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  savings: number;
};

const emptyCart: CartState = {
  lines: [],
  itemCount: 0,
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  savings: 0,
};

type CartContextValue = {
  cart: CartState;
  loading: boolean;
  refresh: () => Promise<void>;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clear: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>(emptyCart);
  const [loading, setLoading] = useState(false);

  const apply = useCallback((data: unknown) => {
    if (data && typeof data === "object" && "lines" in data) {
      setCart(data as CartState);
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      apply(await res.json());
    } catch {
      /* ignore */
    }
  }, [apply]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const addItem = useCallback(
    async (productId: number, quantity = 1) => {
      setLoading(true);
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity }),
        });
        apply(await res.json());
      } finally {
        setLoading(false);
      }
    },
    [apply],
  );

  const updateItem = useCallback(
    async (itemId: number, quantity: number) => {
      setLoading(true);
      try {
        const res = await fetch("/api/cart", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemId, quantity }),
        });
        apply(await res.json());
      } finally {
        setLoading(false);
      }
    },
    [apply],
  );

  const removeItem = useCallback(
    async (itemId: number) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/cart?itemId=${itemId}`, { method: "DELETE" });
        apply(await res.json());
      } finally {
        setLoading(false);
      }
    },
    [apply],
  );

  const clear = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cart?all=1`, { method: "DELETE" });
      apply(await res.json());
    } finally {
      setLoading(false);
    }
  }, [apply]);

  const value = useMemo(
    () => ({ cart, loading, refresh, addItem, updateItem, removeItem, clear }),
    [cart, loading, refresh, addItem, updateItem, removeItem, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

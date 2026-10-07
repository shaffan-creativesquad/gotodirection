import type { OrderLine } from "@/db/schema";

type CartItem = { id: number; productId: number; quantity: number };

const cartStore = new Map<string, CartItem[]>();
let nextItemId = 1;

export function getCartItems(sessionId: string): CartItem[] {
  return cartStore.get(sessionId) ?? [];
}

export function addCartItem(sessionId: string, productId: number, quantity: number) {
  const items = [...(cartStore.get(sessionId) ?? [])];
  const existing = items.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity = Math.min(99, existing.quantity + quantity);
  } else {
    items.push({ id: nextItemId++, productId, quantity });
  }
  cartStore.set(sessionId, items);
}

export function updateCartItem(sessionId: string, itemId: number, quantity: number) {
  const items = [...(cartStore.get(sessionId) ?? [])];
  if (quantity <= 0) {
    cartStore.set(sessionId, items.filter((i) => i.id !== itemId));
    return;
  }
  const item = items.find((i) => i.id === itemId);
  if (item) item.quantity = Math.min(99, quantity);
  cartStore.set(sessionId, items);
}

export function removeCartItem(sessionId: string, itemId: number) {
  const items = cartStore.get(sessionId) ?? [];
  cartStore.set(sessionId, items.filter((i) => i.id !== itemId));
}

export function clearCart(sessionId: string) {
  cartStore.delete(sessionId);
}

export type StoredOrder = {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  notes: string;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  items: OrderLine[];
  createdAt: Date;
};

const orderStore = new Map<string, StoredOrder>();

export function saveOrder(order: StoredOrder) {
  orderStore.set(order.orderNumber, order);
}

export function getOrder(orderNumber: string): StoredOrder | undefined {
  return orderStore.get(orderNumber);
}

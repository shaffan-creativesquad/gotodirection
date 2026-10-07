import { cookies } from "next/headers";
import { productById } from "@/lib/static-data";
import {
  getCartItems,
  addCartItem,
  updateCartItem as storeUpdateItem,
  removeCartItem as storeRemoveItem,
  clearCart as storeClearCart,
} from "@/lib/store";

export const SESSION_COOKIE = "gtd_session";
export const FREE_SHIPPING_THRESHOLD = 250;
export const FLAT_SHIPPING = 24.95;

export type CartLine = {
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
  availability: string;
  categoryName: string;
  lineTotal: number;
};

export type CartSummary = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  savings: number;
};

export function newSessionId() {
  return (
    Math.random().toString(36).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(36).slice(2)
  );
}

export async function readSessionId() {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}

export function summarise(lines: CartLine[]): CartSummary {
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const savings = lines.reduce(
    (sum, line) => sum + Math.max(0, line.listPrice - line.unitPrice) * line.quantity,
    0,
  );
  const shipping =
    lines.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const tax = Math.round(subtotal * 0.0 * 100) / 100;
  return {
    lines,
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: Math.round(subtotal * 100) / 100,
    shipping,
    tax,
    total: Math.round((subtotal + shipping + tax) * 100) / 100,
    savings: Math.round(savings * 100) / 100,
  };
}

export async function getCartLines(sessionId: string | null): Promise<CartLine[]> {
  if (!sessionId) return [];
  const items = getCartItems(sessionId);
  const lines: CartLine[] = [];
  for (const item of items) {
    const p = productById.get(item.productId);
    if (!p) continue;
    lines.push({
      id: item.id,
      productId: p.id,
      quantity: item.quantity,
      slug: p.slug,
      partNumber: p.partNumber,
      title: p.title,
      shortTitle: p.shortTitle,
      imageUrl: p.imageUrl,
      unitPrice: p.price,
      listPrice: p.listPrice,
      condition: p.condition,
      availability: p.availability,
      categoryName: p.categoryName,
      lineTotal: Math.round(p.price * item.quantity * 100) / 100,
    });
  }
  return lines;
}

export async function getCartSummary(sessionId: string | null) {
  return summarise(await getCartLines(sessionId));
}

export async function addToCart(
  sessionId: string,
  productId: number,
  quantity: number,
) {
  addCartItem(sessionId, productId, quantity);
}

export async function updateCartItem(
  sessionId: string,
  itemId: number,
  quantity: number,
) {
  storeUpdateItem(sessionId, itemId, quantity);
}

export async function removeCartItem(sessionId: string, itemId: number) {
  storeRemoveItem(sessionId, itemId);
}

export async function clearCart(sessionId: string) {
  storeClearCart(sessionId);
}

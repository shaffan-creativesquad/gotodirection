import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  addToCart,
  clearCart,
  getCartSummary,
  newSessionId,
  readSessionId,
  removeCartItem,
  updateCartItem,
} from "@/lib/cart";

export const dynamic = "force-dynamic";

export async function GET() {
  const sessionId = await readSessionId();
  const summary = await getCartSummary(sessionId);
  return NextResponse.json(summary);
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    productId?: number;
    quantity?: number;
  };
  const productId = Number(body.productId);
  const quantity = Math.max(1, Math.min(99, Number(body.quantity ?? 1)));

  if (!Number.isFinite(productId) || productId <= 0) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  let sessionId = await readSessionId();
  let isNewSession = false;
  if (!sessionId) {
    sessionId = newSessionId();
    isNewSession = true;
  }

  await addToCart(sessionId, productId, quantity);
  const summary = await getCartSummary(sessionId);
  const response = NextResponse.json(summary);
  if (isNewSession) {
    response.cookies.set(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return response;
}

export async function PATCH(request: Request) {
  const sessionId = await readSessionId();
  if (!sessionId) {
    return NextResponse.json(await getCartSummary(null));
  }
  const body = (await request.json()) as { itemId?: number; quantity?: number };
  const itemId = Number(body.itemId);
  const quantity = Number(body.quantity ?? 1);
  if (!Number.isFinite(itemId)) {
    return NextResponse.json({ error: "Invalid item" }, { status: 400 });
  }
  await updateCartItem(sessionId, itemId, quantity);
  return NextResponse.json(await getCartSummary(sessionId));
}

export async function DELETE(request: Request) {
  const sessionId = await readSessionId();
  if (!sessionId) {
    return NextResponse.json(await getCartSummary(null));
  }
  const { searchParams } = new URL(request.url);
  const itemId = Number(searchParams.get("itemId"));
  if (searchParams.get("all") === "1") {
    await clearCart(sessionId);
  } else if (Number.isFinite(itemId)) {
    await removeCartItem(sessionId, itemId);
  }
  return NextResponse.json(await getCartSummary(sessionId));
}

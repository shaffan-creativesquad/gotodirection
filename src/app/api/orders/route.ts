import { NextResponse } from "next/server";
import type { OrderLine } from "@/db/schema";
import { clearCart, getCartSummary, readSessionId } from "@/lib/cart";
import { saveOrder } from "@/lib/store";

export const dynamic = "force-dynamic";

function orderNumber() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `GTD-${stamp}${rand}`;
}

export async function POST(request: Request) {
  const sessionId = await readSessionId();
  const summary = await getCartSummary(sessionId);

  if (!sessionId || summary.lines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const body = (await request.json()) as Record<string, string | undefined>;
  const required = ["customerName", "email", "address", "city"];
  const missing = required.filter((key) => !body[key]?.trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const items: OrderLine[] = summary.lines.map((line) => ({
    productId: line.productId,
    slug: line.slug,
    partNumber: line.partNumber,
    title: line.title,
    imageUrl: line.imageUrl,
    unitPrice: line.unitPrice,
    quantity: line.quantity,
  }));

  const number = orderNumber();

  saveOrder({
    orderNumber: number,
    customerName: body.customerName!.trim(),
    email: body.email!.trim(),
    phone: body.phone?.trim() ?? "",
    company: body.company?.trim() ?? "",
    address: body.address!.trim(),
    city: body.city!.trim(),
    state: body.state?.trim() ?? "",
    postalCode: body.postalCode?.trim() ?? "",
    country: body.country?.trim() || "United States",
    notes: body.notes?.trim() ?? "",
    paymentMethod: body.paymentMethod?.trim() || "Credit Card",
    subtotal: summary.subtotal,
    shipping: summary.shipping,
    tax: summary.tax,
    total: summary.total,
    status: "Confirmed",
    items,
    createdAt: new Date(),
  });

  await clearCart(sessionId);

  return NextResponse.json({ orderNumber: number });
}

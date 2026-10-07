import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages, subscribers } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, string | undefined>;

  if (body.intent === "subscribe") {
    const email = (body.email ?? "").trim();
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }
    await db.insert(subscribers).values({ email }).onConflictDoNothing();
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 },
    );
  }

  await db.insert(contactMessages).values({
    name,
    email,
    phone: (body.phone ?? "").trim(),
    subject: (body.subject ?? "General enquiry").trim(),
    message,
  });

  return NextResponse.json({ ok: true });
}

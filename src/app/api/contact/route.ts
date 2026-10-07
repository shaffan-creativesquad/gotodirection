import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, string | undefined>;

  if (body.intent === "subscribe") {
    const email = (body.email ?? "").trim();
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }
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

  return NextResponse.json({ ok: true });
}

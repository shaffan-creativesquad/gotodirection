import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, string | number | undefined>;
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}

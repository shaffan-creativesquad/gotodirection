import { NextResponse } from "next/server";
import { searchSuggestions } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  if (q.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }
  const results = await searchSuggestions(q.trim());
  return NextResponse.json({ results });
}

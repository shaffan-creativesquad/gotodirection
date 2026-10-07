"use client";

import { useState } from "react";

export function QuoteForm({
  productId,
  partNumber,
  compact = false,
}: {
  productId?: number;
  partNumber?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, productId, partNumber }),
      });
      if (!res.ok) {
        const payload = (await res.json()) as { error?: string };
        setError(payload.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("done");
    } catch {
      setError("Network error, please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-800">
        <p className="text-base font-bold">✅ Quote request received</p>
        <p className="mt-2">
          A sourcing specialist will email you tiered pricing and stock
          availability within 4 business hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs font-semibold underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={`rounded-xl border border-slate-200 bg-white p-6 ${compact ? "" : "lg:p-8"}`}
    >
      <h3 className="text-lg font-bold text-brand-900">
        Request volume pricing{partNumber ? ` for ${partNumber}` : ""}
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Buying 10+ units or need a formal quote for a purchase order? Tell us what
        you need.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Full name *
          <input
            name="name"
            required
            className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm font-normal normal-case tracking-normal text-slate-800 outline-none focus:border-brand-600"
          />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Work email *
          <input
            name="email"
            type="email"
            required
            className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm font-normal normal-case tracking-normal text-slate-800 outline-none focus:border-brand-600"
          />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Phone
          <input
            name="phone"
            className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm font-normal normal-case tracking-normal text-slate-800 outline-none focus:border-brand-600"
          />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Company
          <input
            name="company"
            className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm font-normal normal-case tracking-normal text-slate-800 outline-none focus:border-brand-600"
          />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Quantity needed
          <input
            name="quantity"
            type="number"
            min={1}
            defaultValue={10}
            className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm font-normal normal-case tracking-normal text-slate-800 outline-none focus:border-brand-600"
          />
        </label>
        {!productId && (
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Part number
            <input
              name="partNumber"
              placeholder="e.g. JL665A"
              className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm font-normal normal-case tracking-normal text-slate-800 outline-none focus:border-brand-600"
            />
          </label>
        )}
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
          Requirements
          <textarea
            name="message"
            rows={4}
            placeholder="Target budget, delivery date, configuration notes…"
            className="mt-1 w-full rounded-lg border border-slate-300 p-3 text-sm font-normal normal-case tracking-normal text-slate-800 outline-none focus:border-brand-600"
          />
        </label>
      </div>
      {status === "error" && (
        <p className="mt-3 text-sm text-rose-600">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 rounded-lg bg-brand-700 px-7 py-3 text-sm font-bold text-white transition hover:bg-brand-800 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Request Quote"}
      </button>
    </form>
  );
}

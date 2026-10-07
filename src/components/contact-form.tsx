"use client";

import { useState } from "react";

const inputClass =
  "mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-800 outline-none focus:border-brand-600";
const labelClass =
  "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export function ContactForm() {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-emerald-800">
        <p className="text-lg font-bold">✅ Message sent</p>
        <p className="mt-2 text-sm">
          Thanks for reaching out. A specialist will reply within one business
          hour, Monday to Friday 8AM–7PM CST.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs font-semibold underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8"
    >
      <h2 className="text-xl font-bold text-brand-900">Send us a message</h2>
      <p className="mt-1 text-sm text-slate-500">
        Sales, sourcing, order status or technical questions — we answer all of
        them.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Full name *
          <input name="name" required className={inputClass} />
        </label>
        <label className={labelClass}>
          Email *
          <input name="email" type="email" required className={inputClass} />
        </label>
        <label className={labelClass}>
          Phone
          <input name="phone" className={inputClass} />
        </label>
        <label className={labelClass}>
          Subject
          <select name="subject" className={inputClass}>
            <option>Sales enquiry</option>
            <option>Request a quote</option>
            <option>Order status</option>
            <option>Returns / RMA</option>
            <option>Technical question</option>
            <option>Other</option>
          </select>
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Message *
          <textarea
            name="message"
            required
            rows={5}
            className="mt-1 w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-800 outline-none focus:border-brand-600"
            placeholder="Part numbers, quantities, delivery timeline…"
          />
        </label>
      </div>
      {status === "error" && <p className="mt-3 text-sm text-rose-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 rounded-lg bg-brand-700 px-7 py-3 text-sm font-bold text-white transition hover:bg-brand-800 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

export function TrackOrderForm() {
  const [number, setNumber] = useState("");

  return (
    <form
      action={`/order/${number.trim()}`}
      onSubmit={(event) => {
        if (!number.trim()) event.preventDefault();
      }}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <input
        value={number}
        onChange={(event) => setNumber(event.target.value.toUpperCase())}
        placeholder="GTD-XXXXXXXX"
        className="h-11 flex-1 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-brand-600"
      />
      <button
        type="submit"
        className="h-11 rounded-lg bg-brand-700 px-6 text-sm font-bold text-white transition hover:bg-brand-800"
      >
        Track Order
      </button>
    </form>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {items.map((item, index) => (
        <div key={item.q}>
          <button
            type="button"
            onClick={() => setOpen(open === index ? null : index)}
            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
          >
            <span className="text-sm font-bold text-brand-900">{item.q}</span>
            <span className="text-xl text-brand-600">
              {open === index ? "−" : "+"}
            </span>
          </button>
          {open === index && (
            <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

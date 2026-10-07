"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "./cart-provider";
import { formatCurrency } from "@/lib/format";

const inputClass =
  "mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-800 outline-none focus:border-brand-600";
const labelClass =
  "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export function CheckoutForm() {
  const router = useRouter();
  const { cart, refresh } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await res.json()) as {
        orderNumber?: string;
        error?: string;
      };
      if (!res.ok || !payload.orderNumber) {
        setError(payload.error ?? "Could not place the order.");
        setSubmitting(false);
        return;
      }
      await refresh();
      router.push(`/order/${payload.orderNumber}`);
    } catch {
      setError("Network error, please try again.");
      setSubmitting(false);
    }
  }

  if (cart.lines.length === 0) {
    return (
      <div className="container-page py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-5xl">🧾</p>
          <h2 className="mt-4 text-xl font-bold text-brand-900">
            Nothing to check out
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Add a few parts to your cart first.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-lg bg-brand-700 px-6 py-3 text-sm font-bold text-white hover:bg-brand-800"
          >
            Browse catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_380px]"
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-brand-900">1. Contact details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Full name *
              <input name="customerName" required className={inputClass} />
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
              Company
              <input name="company" className={inputClass} />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-brand-900">2. Shipping address</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className={`${labelClass} sm:col-span-2`}>
              Street address *
              <input name="address" required className={inputClass} />
            </label>
            <label className={labelClass}>
              City *
              <input name="city" required className={inputClass} />
            </label>
            <label className={labelClass}>
              State / Province
              <input name="state" className={inputClass} />
            </label>
            <label className={labelClass}>
              ZIP / Postal code
              <input name="postalCode" className={inputClass} />
            </label>
            <label className={labelClass}>
              Country
              <input
                name="country"
                defaultValue="United States"
                className={inputClass}
              />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Delivery notes
              <textarea
                name="notes"
                rows={3}
                placeholder="Dock hours, PO number, special instructions…"
                className="mt-1 w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-800 outline-none focus:border-brand-600"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-brand-900">3. Payment method</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["Credit Card", "Visa, Mastercard, Amex, Discover"],
              ["PayPal", "Pay with your PayPal balance"],
              ["Wire Transfer", "Bank details sent with the invoice"],
              ["Purchase Order", "NET-30 for approved accounts"],
            ].map(([value, hint], index) => (
              <label
                key={value}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-brand-500"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={value}
                  defaultChecked={index === 0}
                  className="mt-1 h-4 w-4 accent-[#1a51dc]"
                />
                <span>
                  <span className="block text-sm font-bold text-slate-800">
                    {value}
                  </span>
                  <span className="text-xs text-slate-500">{hint}</span>
                </span>
              </label>
            ))}
          </div>
          <p className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
            This is a demo storefront — no payment is captured. Placing the order
            records it in our system and emails a confirmation summary.
          </p>
        </section>
      </div>

      <aside className="lg:sticky lg:top-32 lg:self-start">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-brand-900">Order summary</h2>
          <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
            {cart.lines.map((line) => (
              <li key={line.id} className="flex gap-3">
                <Image
                  src={line.imageUrl}
                  alt={line.title}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-lg border border-slate-200 object-contain p-1"
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-xs font-semibold text-slate-700">
                    {line.shortTitle || line.title}
                  </p>
                  <p className="text-xs text-slate-400">Qty {line.quantity}</p>
                </div>
                <p className="text-sm font-bold text-brand-900">
                  {formatCurrency(line.lineTotal)}
                </p>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Subtotal</dt>
              <dd className="font-semibold">{formatCurrency(cart.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Shipping</dt>
              <dd className="font-semibold">
                {cart.shipping === 0 ? "FREE" : formatCurrency(cart.shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base">
              <dt className="font-bold text-brand-900">Total</dt>
              <dd className="font-black text-brand-900">
                {formatCurrency(cart.total)}
              </dd>
            </div>
          </dl>
          {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-5 w-full rounded-lg bg-accent-500 py-3 text-sm font-bold text-brand-950 transition hover:bg-accent-400 disabled:opacity-60"
          >
            {submitting ? "Placing order…" : "Place Order"}
          </button>
          <p className="mt-3 text-center text-xs text-slate-400">
            🔒 256-bit SSL · PCI-compliant processing
          </p>
        </div>
      </aside>
    </form>
  );
}

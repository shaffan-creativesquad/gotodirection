"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cart-provider";
import { formatCurrency } from "@/lib/format";

export function CartView() {
  const { cart, updateItem, removeItem, clear, loading } = useCart();

  if (cart.lines.length === 0) {
    return (
      <div className="container-page py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-5xl">🛒</p>
          <h2 className="mt-4 text-xl font-bold text-brand-900">
            Your cart is empty
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Browse the catalog and add the parts you need — or send us a bill of
            materials and we will build the cart for you.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/shop"
              className="rounded-lg bg-brand-700 px-6 py-3 text-sm font-bold text-white hover:bg-brand-800"
            >
              Start shopping
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 hover:border-brand-600"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {cart.lines.map((line) => (
          <div
            key={line.id}
            className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row"
          >
            <Link
              href={`/product/${line.slug}`}
              className="relative h-28 w-full shrink-0 rounded-lg border border-slate-100 bg-white sm:w-32"
            >
              <Image
                src={line.imageUrl}
                alt={line.title}
                fill
                sizes="128px"
                className="object-contain p-2"
              />
            </Link>
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                {line.categoryName} · {line.condition}
              </p>
              <Link
                href={`/product/${line.slug}`}
                className="mt-1 line-clamp-2 block text-sm font-semibold text-slate-800 hover:text-brand-700"
              >
                {line.title}
              </Link>
              <p className="mt-1 text-xs text-slate-500">
                Part # <span className="font-semibold">{line.partNumber}</span>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-lg border border-slate-300">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => updateItem(line.id, line.quantity - 1)}
                    className="h-9 w-9 text-slate-600 hover:text-brand-700"
                  >
                    −
                  </button>
                  <span className="w-10 border-x border-slate-300 text-center text-sm font-semibold">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => updateItem(line.id, line.quantity + 1)}
                    className="h-9 w-9 text-slate-600 hover:text-brand-700"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(line.id)}
                  className="text-xs font-semibold text-rose-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-black text-brand-900">
                {formatCurrency(line.lineTotal)}
              </p>
              <p className="text-xs text-slate-500">
                {formatCurrency(line.unitPrice)} each
              </p>
            </div>
          </div>
        ))}

        <div className="flex flex-wrap justify-between gap-3">
          <Link
            href="/shop"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-600"
          >
            ← Continue shopping
          </Link>
          <button
            type="button"
            onClick={clear}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-rose-600 hover:border-rose-400"
          >
            Clear cart
          </button>
        </div>
      </div>

      <aside className="lg:sticky lg:top-32 lg:self-start">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-brand-900">Order summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Items ({cart.itemCount})</dt>
              <dd className="font-semibold">{formatCurrency(cart.subtotal)}</dd>
            </div>
            {cart.savings > 0 && (
              <div className="flex justify-between text-emerald-600">
                <dt>Your savings</dt>
                <dd className="font-semibold">−{formatCurrency(cart.savings)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-slate-500">Shipping</dt>
              <dd className="font-semibold">
                {cart.shipping === 0 ? "FREE" : formatCurrency(cart.shipping)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Estimated tax</dt>
              <dd className="font-semibold">Calculated at invoice</dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base">
              <dt className="font-bold text-brand-900">Total</dt>
              <dd className="font-black text-brand-900">
                {formatCurrency(cart.total)}
              </dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-5 block rounded-lg bg-accent-500 py-3 text-center text-sm font-bold text-brand-950 transition hover:bg-accent-400"
          >
            Proceed to Checkout
          </Link>
          <p className="mt-3 text-center text-xs text-slate-400">
            🔒 Secure checkout · 30-day returns · NET-30 available
          </p>
        </div>
      </aside>
    </div>
  );
}

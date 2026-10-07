"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./cart-provider";

export function AddToCartButton({
  productId,
  label = "Add to Cart",
  className = "",
}: {
  productId: number;
  label?: string;
  className?: string;
}) {
  const { addItem } = useCart();
  const [state, setState] = useState<"idle" | "busy" | "added">("idle");

  async function handle() {
    setState("busy");
    await addItem(productId, 1);
    setState("added");
    setTimeout(() => setState("idle"), 1600);
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={state === "busy"}
      className={
        className ||
        "w-full rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:opacity-60"
      }
    >
      {state === "added" ? "✓ Added" : state === "busy" ? "Adding…" : label}
    </button>
  );
}

export function BuyBox({
  productId,
  stock,
}: {
  productId: number;
  stock: number;
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [state, setState] = useState<"idle" | "busy" | "added">("idle");

  async function handle() {
    setState("busy");
    await addItem(productId, quantity);
    setState("added");
    setTimeout(() => setState("idle"), 2200);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-stretch gap-3">
        <div className="flex items-center rounded-lg border border-slate-300">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="h-11 w-10 text-lg text-slate-600 hover:text-brand-700"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            value={quantity}
            onChange={(event) => {
              const next = Number(event.target.value.replace(/\D/g, ""));
              setQuantity(Math.max(1, Math.min(99, next || 1)));
            }}
            className="h-11 w-12 border-x border-slate-300 text-center text-sm font-semibold outline-none"
          />
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(99, value + 1))}
            className="h-11 w-10 text-lg text-slate-600 hover:text-brand-700"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handle}
          disabled={state === "busy" || stock <= 0}
          className="h-11 flex-1 rounded-lg bg-accent-500 px-6 text-sm font-bold text-brand-950 transition hover:bg-accent-400 disabled:opacity-60"
        >
          {state === "added"
            ? "✓ Added to cart"
            : state === "busy"
              ? "Adding…"
              : "Add to Cart"}
        </button>
      </div>
      <div className="flex gap-3">
        <Link
          href="/cart"
          className="flex-1 rounded-lg border border-brand-700 px-4 py-2.5 text-center text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
        >
          View Cart
        </Link>
        <Link
          href="/checkout"
          className="flex-1 rounded-lg bg-brand-800 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-brand-900"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}

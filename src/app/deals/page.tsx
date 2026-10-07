import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { PageHero } from "@/components/page-hero";
import { listProducts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Today's Deals",
  description:
    "Current price drops on enterprise switches, servers, drives, memory and printers at GotoDirect.",
};

export default async function DealsPage() {
  const result = await listProducts({ sort: "rating", perPage: 12 });
  const deals = result.items.filter((item) => item.listPrice > item.price);

  return (
    <div>
      <PageHero
        eyebrow="Limited time"
        title="Today's deals"
        subtitle="Clearance inventory, overstock and price-matched parts. Stock moves fast — pricing shown is live and updated hourly."
        breadcrumbs={[{ href: "/deals", label: "Deals" }]}
      />

      <div className="container-page py-10">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            ["⏱️", "Flash pricing", "Refreshed hourly against distributor feeds"],
            ["🏷️", "Price match", "Found it cheaper? We will beat the quote"],
            ["📦", "Ships today", "Order before 3PM CST for same-day dispatch"],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5"
            >
              <span className="text-2xl">{icon}</span>
              <div>
                <h3 className="text-sm font-bold text-brand-900">{title}</h3>
                <p className="text-xs text-slate-500">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-brand-900 p-8 text-center text-white">
          <h2 className="text-2xl font-black">Looking for a specific bargain?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-brand-100">
            Tell us your target price and quantity. Our sourcing desk checks
            clearance, open-box and refurbished channels daily.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-lg bg-accent-500 px-7 py-3 text-sm font-bold text-brand-950 transition hover:bg-accent-400"
          >
            Send your target price
          </Link>
        </div>
      </div>
    </div>
  );
}

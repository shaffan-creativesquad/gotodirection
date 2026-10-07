import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { PageHero } from "@/components/page-hero";
import { formatCurrency, formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Order Confirmation" };

export default async function OrderPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.orderNumber, number))
    .limit(1);
  const order = rows[0];
  if (!order) notFound();

  return (
    <div>
      <PageHero
        eyebrow="Thank you"
        title={`Order ${order.orderNumber} confirmed`}
        subtitle="We have emailed your confirmation. Our team will review stock allocation and send tracking details as soon as the shipment leaves our dock."
        breadcrumbs={[{ href: "/shop", label: "Shop" }]}
      />

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-brand-900">Items ordered</h2>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                {order.status}
              </span>
            </div>
            <ul className="mt-4 divide-y divide-slate-100">
              {order.items.map((item) => (
                <li key={item.productId} className="flex gap-4 py-4">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg border border-slate-200 object-contain p-1"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/product/${item.slug}`}
                      className="line-clamp-2 text-sm font-semibold text-slate-800 hover:text-brand-700"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-xs text-slate-500">
                      Part # {item.partNumber} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-brand-900">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Shipping to
              </h3>
              <p className="mt-3 text-sm font-semibold text-slate-800">
                {order.customerName}
              </p>
              {order.company && (
                <p className="text-sm text-slate-600">{order.company}</p>
              )}
              <p className="text-sm text-slate-600">{order.address}</p>
              <p className="text-sm text-slate-600">
                {order.city}
                {order.state ? `, ${order.state}` : ""} {order.postalCode}
              </p>
              <p className="text-sm text-slate-600">{order.country}</p>
              <p className="mt-2 text-sm text-slate-600">{order.email}</p>
              {order.phone && (
                <p className="text-sm text-slate-600">{order.phone}</p>
              )}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Order details
              </h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Order number</dt>
                  <dd className="font-semibold">{order.orderNumber}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Placed on</dt>
                  <dd className="font-semibold">{formatDate(order.createdAt)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Payment</dt>
                  <dd className="font-semibold">{order.paymentMethod}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Est. delivery</dt>
                  <dd className="font-semibold">2–4 business days</dd>
                </div>
              </dl>
              {order.notes && (
                <p className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
                  {order.notes}
                </p>
              )}
            </div>
          </section>
        </div>

        <aside>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-brand-900">Payment summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Subtotal</dt>
                <dd className="font-semibold">
                  {formatCurrency(Number(order.subtotal))}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Shipping</dt>
                <dd className="font-semibold">
                  {Number(order.shipping) === 0
                    ? "FREE"
                    : formatCurrency(Number(order.shipping))}
                </dd>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base">
                <dt className="font-bold text-brand-900">Total paid</dt>
                <dd className="font-black text-brand-900">
                  {formatCurrency(Number(order.total))}
                </dd>
              </div>
            </dl>
            <Link
              href="/shop"
              className="mt-5 block rounded-lg bg-brand-700 py-3 text-center text-sm font-bold text-white hover:bg-brand-800"
            >
              Continue shopping
            </Link>
            <Link
              href="/support"
              className="mt-3 block rounded-lg border border-slate-300 py-3 text-center text-sm font-bold text-slate-700 hover:border-brand-600"
            >
              Order support
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { ProductTabs } from "@/components/product-tabs";
import { QuoteForm } from "@/components/quote-form";
import { discountPercent, formatCurrency } from "@/lib/format";
import { getProductBySlug, getRelatedProducts } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.partNumber} | ${product.shortTitle}`,
    description: product.overview.slice(0, 180),
  };
}

const assurances = [
  { icon: "🌍", label: "Worldwide Shipping" },
  { icon: "🏷️", label: "Best Prices Guaranteed" },
  { icon: "🛠️", label: "Easy Claims & Returns" },
  { icon: "🔐", label: "Secure Payment" },
  { icon: "📍", label: "Track Your Order" },
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.categoryId, product.id);
  const off = discountPercent(product.price, product.listPrice);

  return (
    <div className="bg-slate-50 pb-16">
      <div className="border-b border-slate-200 bg-white">
        <div className="container-page flex flex-wrap items-center gap-2 py-3 text-xs text-slate-500">
          <Link href="/" className="hover:text-brand-700">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-brand-700">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/category/${product.categorySlug}`}
            className="hover:text-brand-700"
          >
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-700">{product.partNumber}</span>
        </div>
      </div>

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[400px_1fr_330px]">
        {/* Gallery */}
        <div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="mb-2 text-center text-[11px] italic text-slate-400">
              Image may differ from original
            </p>
            <div className="relative aspect-square w-full">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                priority
                sizes="400px"
                className="object-contain"
              />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg border border-slate-200 bg-white p-1.5"
              >
                <Image
                  src={product.imageUrl}
                  alt={`${product.title} view ${index + 1}`}
                  fill
                  sizes="90px"
                  className="object-contain p-1"
                />
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Payment methods
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-bold text-slate-500">
              {["VISA", "MC", "AMEX", "DISCOVER", "PAYPAL", "WIRE", "NET-30 PO"].map(
                (method) => (
                  <span
                    key={method}
                    className="rounded border border-slate-200 bg-slate-50 px-2 py-1"
                  >
                    {method}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Main info */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-brand-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700">
              {product.manufacturerName}
            </span>
            <span className="rounded bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
              {product.availability}
            </span>
            {off > 0 && (
              <span className="rounded bg-accent-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-950">
                Best price — save {off}%
              </span>
            )}
          </div>

          <h1 className="mt-3 text-2xl font-black leading-snug text-brand-950 lg:text-[28px]">
            {product.title}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="text-amber-500">
              {"★".repeat(Math.round(product.rating))}
            </span>
            <span className="text-slate-500">
              {product.rating.toFixed(1)} · {product.reviewCount} reviews
            </span>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Part No", product.partNumber],
                  ["Manufacturer", product.manufacturerName],
                  ["Category", product.categoryName],
                  ["Availability", product.availability],
                  ["Condition", product.condition],
                  ["Warranty", product.warranty],
                ].map(([label, value], index) => (
                  <tr
                    key={label}
                    className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <th className="w-40 border-b border-slate-100 px-4 py-2.5 text-left font-semibold text-slate-600">
                      {label}
                    </th>
                    <td className="border-b border-slate-100 px-4 py-2.5 font-medium text-slate-800">
                      {label === "Availability" ? (
                        <span className="font-bold text-emerald-600">{value}</span>
                      ) : (
                        value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-5 space-y-2">
            {product.highlights.slice(0, 5).map((item) => (
              <li key={item} className="flex gap-2 text-sm text-slate-600">
                <span className="text-accent-600">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {assurances.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200 bg-white p-3 text-center"
              >
                <p className="text-xl">{item.icon}</p>
                <p className="mt-1 text-[10px] font-bold uppercase leading-tight tracking-wide text-slate-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            {product.listPrice > product.price && (
              <p className="text-sm text-slate-400 line-through">
                {formatCurrency(product.listPrice)}
              </p>
            )}
            <p className="text-3xl font-black text-brand-950">
              {formatCurrency(product.price)}
            </p>
            {off > 0 && (
              <p className="mt-1 text-sm font-semibold text-emerald-600">
                You save {formatCurrency(product.listPrice - product.price)} ({off}
                %)
              </p>
            )}
            <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              🚚 Free ground shipping within US up to 10 lbs
            </p>
            <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              📦 {product.stock} units ready to ship today
            </p>

            <div className="mt-5">
              <BuyBox productId={product.id} stock={product.stock} />
            </div>

            <div className="mt-5 rounded-xl bg-brand-900 p-4 text-white">
              <p className="text-sm font-bold text-accent-400">
                Expert Team Support
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-brand-100">
                Looking for a bulk discount? Call{" "}
                <a href="tel:+18882034073" className="font-bold text-white">
                  +1 (888) 203-4073
                </a>{" "}
                and a representative will assist you with part no.{" "}
                <span className="font-bold text-white">{product.partNumber}</span>.
              </p>
            </div>

            <ul className="mt-5 space-y-2 text-xs text-slate-500">
              <li>✅ 30-day money-back guarantee</li>
              <li>✅ Tested and inspected before dispatch</li>
              <li>✅ Volume & government pricing available</li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="container-page">
        <ProductTabs
          overview={product.overview}
          highlights={product.highlights}
          specs={product.specs}
          warranty={product.warranty}
          upc={product.upc}
          partNumber={product.partNumber}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </div>

      <div className="container-page mt-10">
        <QuoteForm productId={product.id} partNumber={product.partNumber} />
      </div>

      {related.length > 0 && (
        <div className="container-page mt-14">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-black tracking-tight text-brand-950">
              Related products
            </h2>
            <Link
              href={`/category/${product.categorySlug}`}
              className="text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              All {product.categoryName} →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { ProductListItem } from "@/lib/queries";
import { discountPercent, formatCurrency } from "@/lib/format";
import { AddToCartButton } from "./add-to-cart";

export function ProductCard({ product }: { product: ProductListItem }) {
  const off = discountPercent(product.price, product.listPrice);

  return (
    <article className="card-hover group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="block bg-white p-4">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain transition duration-300 group-hover:scale-[1.04]"
            />
          </div>
        </Link>
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {off > 0 && (
            <span className="rounded bg-accent-500 px-2 py-0.5 text-[11px] font-bold text-brand-950">
              SAVE {off}%
            </span>
          )}
          <span className="rounded bg-brand-900/90 px-2 py-0.5 text-[11px] font-semibold text-white">
            {product.condition}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t border-slate-100 p-4">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          <span>{product.manufacturerName}</span>
          <span className="text-emerald-600">
            {product.stock > 0 ? "In Stock" : "Backorder"}
          </span>
        </div>
        <Link
          href={`/product/${product.slug}`}
          className="mt-2 line-clamp-3 min-h-[60px] text-sm font-semibold leading-snug text-slate-800 transition hover:text-brand-700"
        >
          {product.title}
        </Link>
        <p className="mt-1.5 text-xs text-slate-500">
          Part #{" "}
          <span className="font-semibold text-slate-700">{product.partNumber}</span>
        </p>
        <div className="mt-1 flex items-center gap-1 text-xs text-amber-500">
          {"★".repeat(Math.round(product.rating))}
          <span className="text-slate-400">({product.reviewCount})</span>
        </div>

        <div className="mt-auto pt-3">
          <div className="flex items-end gap-2">
            <span className="text-xl font-black text-brand-900">
              {formatCurrency(product.price)}
            </span>
            {product.listPrice > product.price && (
              <span className="pb-0.5 text-sm text-slate-400 line-through">
                {formatCurrency(product.listPrice)}
              </span>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            <AddToCartButton productId={product.id} />
            <Link
              href={`/product/${product.slug}`}
              className="flex items-center justify-center rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-600 transition hover:border-brand-600 hover:text-brand-700"
              aria-label="View details"
            >
              →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

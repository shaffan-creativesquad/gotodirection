import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getManufacturers } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Brands We Carry",
  description:
    "HPE, Dell, Cisco, Supermicro, Seagate, Western Digital, Samsung, Intel, Zebra, Honeywell and more — genuine parts from GotoDirect.",
};

export default async function BrandsPage() {
  const brands = await getManufacturers();

  return (
    <div>
      <PageHero
        eyebrow="Manufacturers"
        title="Brands we carry"
        subtitle="We buy direct and through authorised channels, so every part arrives with correct coding, genuine firmware and manufacturer warranty where applicable."
        breadcrumbs={[{ href: "/brands", label: "Brands" }]}
      />

      <div className="container-page grid gap-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/shop?brand=${brand.slug}`}
            className="card-hover rounded-2xl border border-slate-200 bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-brand-900">{brand.name}</h2>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                {brand.productCount} SKUs
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-500">{brand.blurb}</p>
            <p className="mt-4 text-sm font-semibold text-brand-700">
              Shop {brand.name} →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

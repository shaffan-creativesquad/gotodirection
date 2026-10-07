import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import {
  ProductListing,
  type SearchParamsRecord,
} from "@/components/product-listing";

export const metadata: Metadata = {
  title: "Shop All IT Hardware",
  description:
    "Browse the full GotoDirect catalog — switches, servers, drives, memory, motherboards, power supplies, optics, printers and scanners.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsRecord>;
}) {
  const params = await searchParams;

  return (
    <div>
      <PageHero
        eyebrow="Full catalog"
        title="Shop all hardware"
        subtitle="Over 150,000 part numbers across networking, compute, storage, power and auto-ID. Filter by manufacturer, condition and budget — every item is tested before it ships."
        breadcrumbs={[{ href: "/shop", label: "Shop" }]}
      />
      <ProductListing basePath="/shop" searchParams={params} />
    </div>
  );
}

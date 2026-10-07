import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import {
  ProductListing,
  type SearchParamsRecord,
} from "@/components/product-listing";
import { getCategories, getCategoryBySlug } from "@/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParamsRecord>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const [category, allCategories, query] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
    searchParams,
  ]);

  if (!category) notFound();

  return (
    <div>
      <PageHero
        eyebrow={`${category.icon} Category`}
        title={category.name}
        subtitle={category.tagline}
        breadcrumbs={[
          { href: "/shop", label: "Shop" },
          { href: `/category/${category.slug}`, label: category.name },
        ]}
      />

      <section className="border-b border-slate-200 bg-white">
        <div className="container-page grid items-center gap-8 py-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-lg font-bold text-brand-900">
              About {category.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {category.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {allCategories
                .filter((item) => item.slug !== category.slug)
                .slice(0, 6)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/category/${item.slug}`}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-brand-500 hover:text-brand-700"
                  >
                    {item.icon} {item.name}
                  </Link>
                ))}
            </div>
          </div>
          <div className="relative hidden aspect-[4/3] rounded-2xl border border-slate-200 bg-slate-50 lg:block">
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              sizes="320px"
              className="object-contain p-5"
            />
          </div>
        </div>
      </section>

      <ProductListing
        basePath={`/category/${category.slug}`}
        categorySlug={category.slug}
        searchParams={query}
      />
    </div>
  );
}

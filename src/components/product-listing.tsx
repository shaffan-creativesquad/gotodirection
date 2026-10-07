import Link from "next/link";
import { ProductCard } from "./product-card";
import { ShopFilters, SortSelect, type FilterState } from "./shop-filters";
import { getManufacturers, listProducts } from "@/lib/queries";

export type SearchParamsRecord = Record<string, string | string[] | undefined>;

export function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function parseFilters(params: SearchParamsRecord): FilterState & {
  page: number;
} {
  const single = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
  };
  return {
    brands: toArray(params.brand),
    conditions: toArray(params.condition),
    min: single("min"),
    max: single("max"),
    q: single("q"),
    sort: single("sort"),
    page: Math.max(1, Number(single("page")) || 1),
  };
}

function buildHref(basePath: string, state: FilterState, page: number) {
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  if (state.sort) params.set("sort", state.sort);
  if (state.min) params.set("min", state.min);
  if (state.max) params.set("max", state.max);
  state.brands.forEach((brand) => params.append("brand", brand));
  state.conditions.forEach((condition) => params.append("condition", condition));
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export async function ProductListing({
  basePath,
  categorySlug,
  searchParams,
}: {
  basePath: string;
  categorySlug?: string;
  searchParams: SearchParamsRecord;
}) {
  const state = parseFilters(searchParams);
  const [brands, result] = await Promise.all([
    getManufacturers(),
    listProducts({
      categorySlug,
      brands: state.brands,
      conditions: state.conditions,
      q: state.q || undefined,
      minPrice: state.min ? Number(state.min) : undefined,
      maxPrice: state.max ? Number(state.max) : undefined,
      sort: state.sort,
      page: state.page,
      perPage: 12,
    }),
  ]);

  const filterState: FilterState = {
    brands: state.brands,
    conditions: state.conditions,
    min: state.min,
    max: state.max,
    q: state.q,
    sort: state.sort,
  };

  const from = result.total === 0 ? 0 : (result.page - 1) * result.perPage + 1;
  const to = Math.min(result.page * result.perPage, result.total);

  return (
    <div className="container-page grid gap-8 py-10 lg:grid-cols-[280px_1fr]">
      <ShopFilters
        basePath={basePath}
        brandOptions={brands.filter((brand) => brand.productCount > 0)}
        conditionOptions={["New", "New Open Box", "Refurbished"]}
        current={filterState}
      />

      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <p className="text-sm text-slate-600">
            Showing <span className="font-bold text-brand-900">{from}</span>–
            <span className="font-bold text-brand-900">{to}</span> of{" "}
            <span className="font-bold text-brand-900">{result.total}</span>{" "}
            products
            {state.q && (
              <>
                {" "}
                for “<span className="font-semibold">{state.q}</span>”
              </>
            )}
          </p>
          <SortSelect basePath={basePath} current={filterState} />
        </div>

        {result.items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-14 text-center">
            <p className="text-4xl">🔍</p>
            <h3 className="mt-4 text-lg font-bold text-brand-900">
              No products matched your filters
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try removing a filter, or send us the part number and we will source
              it for you.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href={basePath}
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-600"
              >
                Reset filters
              </Link>
              <Link
                href="/contact"
                className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
              >
                Request sourcing
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {result.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {result.pageCount > 1 && (
          <nav className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {result.page > 1 && (
              <Link
                href={buildHref(basePath, filterState, result.page - 1)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:border-brand-600"
              >
                ← Prev
              </Link>
            )}
            {Array.from({ length: result.pageCount }, (_, index) => index + 1).map(
              (page) => (
                <Link
                  key={page}
                  href={buildHref(basePath, filterState, page)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                    page === result.page
                      ? "bg-brand-800 text-white"
                      : "border border-slate-300 bg-white text-slate-600 hover:border-brand-600"
                  }`}
                >
                  {page}
                </Link>
              ),
            )}
            {result.page < result.pageCount && (
              <Link
                href={buildHref(basePath, filterState, result.page + 1)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:border-brand-600"
              >
                Next →
              </Link>
            )}
          </nav>
        )}
      </section>
    </div>
  );
}

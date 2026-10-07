"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type FilterState = {
  brands: string[];
  conditions: string[];
  min: string;
  max: string;
  q: string;
  sort: string;
};

type Props = {
  basePath: string;
  brandOptions: { slug: string; name: string; productCount: number }[];
  conditionOptions: string[];
  current: FilterState;
};

export function ShopFilters({
  basePath,
  brandOptions,
  conditionOptions,
  current,
}: Props) {
  const router = useRouter();
  const [min, setMin] = useState(current.min);
  const [max, setMax] = useState(current.max);
  const [open, setOpen] = useState(false);

  function push(next: Partial<FilterState>) {
    const merged = { ...current, ...next };
    const params = new URLSearchParams();
    if (merged.q) params.set("q", merged.q);
    if (merged.sort) params.set("sort", merged.sort);
    if (merged.min) params.set("min", merged.min);
    if (merged.max) params.set("max", merged.max);
    merged.brands.forEach((brand) => params.append("brand", brand));
    merged.conditions.forEach((condition) => params.append("condition", condition));
    const query = params.toString();
    router.push(query ? `${basePath}?${query}` : basePath);
  }

  function toggle(list: string[], value: string) {
    return list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value];
  }

  const activeCount =
    current.brands.length +
    current.conditions.length +
    (current.min ? 1 : 0) +
    (current.max ? 1 : 0);

  return (
    <div className="lg:sticky lg:top-32">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="mb-3 flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-brand-900 lg:hidden"
      >
        Filters {activeCount > 0 && `(${activeCount})`}
        <span>{open ? "−" : "+"}</span>
      </button>

      <aside
        className={`${open ? "block" : "hidden"} space-y-5 lg:block`}
        aria-label="Product filters"
      >
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-900">
              Filters
            </h3>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() =>
                  push({ brands: [], conditions: [], min: "", max: "" })
                }
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="mt-5">
            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Manufacturer
            </h4>
            <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
              {brandOptions.map((brand) => (
                <label
                  key={brand.slug}
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
                >
                  <input
                    type="checkbox"
                    checked={current.brands.includes(brand.slug)}
                    onChange={() =>
                      push({ brands: toggle(current.brands, brand.slug) })
                    }
                    className="h-4 w-4 accent-[#1a51dc]"
                  />
                  <span className="flex-1">{brand.name}</span>
                  <span className="text-xs text-slate-400">
                    {brand.productCount}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Condition
            </h4>
            <div className="mt-3 space-y-2">
              {conditionOptions.map((condition) => (
                <label
                  key={condition}
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
                >
                  <input
                    type="checkbox"
                    checked={current.conditions.includes(condition)}
                    onChange={() =>
                      push({ conditions: toggle(current.conditions, condition) })
                    }
                    className="h-4 w-4 accent-[#1a51dc]"
                  />
                  {condition}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Price range (USD)
            </h4>
            <div className="mt-3 flex items-center gap-2">
              <input
                value={min}
                onChange={(event) => setMin(event.target.value.replace(/\D/g, ""))}
                placeholder="Min"
                className="h-9 w-full rounded-md border border-slate-300 px-2 text-sm outline-none focus:border-brand-600"
              />
              <span className="text-slate-400">–</span>
              <input
                value={max}
                onChange={(event) => setMax(event.target.value.replace(/\D/g, ""))}
                placeholder="Max"
                className="h-9 w-full rounded-md border border-slate-300 px-2 text-sm outline-none focus:border-brand-600"
              />
            </div>
            <button
              type="button"
              onClick={() => push({ min, max })}
              className="mt-3 w-full rounded-lg bg-brand-700 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              Apply price
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-brand-900 p-5 text-white">
          <h4 className="text-sm font-bold">Can&apos;t find a part?</h4>
          <p className="mt-2 text-xs leading-relaxed text-brand-100">
            We source hard-to-find and end-of-life hardware every day. Send the
            part number and we will hunt it down.
          </p>
          <a
            href="/contact"
            className="mt-4 block rounded-lg bg-accent-500 py-2 text-center text-xs font-bold text-brand-950 transition hover:bg-accent-400"
          >
            Request Sourcing
          </a>
        </div>
      </aside>
    </div>
  );
}

export function SortSelect({
  basePath,
  current,
}: {
  basePath: string;
  current: FilterState;
}) {
  const router = useRouter();

  function change(sort: string) {
    const params = new URLSearchParams();
    if (current.q) params.set("q", current.q);
    if (sort) params.set("sort", sort);
    if (current.min) params.set("min", current.min);
    if (current.max) params.set("max", current.max);
    current.brands.forEach((brand) => params.append("brand", brand));
    current.conditions.forEach((condition) =>
      params.append("condition", condition),
    );
    const query = params.toString();
    router.push(query ? `${basePath}?${query}` : basePath);
  }

  return (
    <select
      value={current.sort}
      onChange={(event) => change(event.target.value)}
      className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-brand-600"
    >
      <option value="">Sort: Best sellers</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating">Top rated</option>
      <option value="name">Name A–Z</option>
    </select>
  );
}

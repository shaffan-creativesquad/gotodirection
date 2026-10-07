"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./cart-provider";
import { formatCurrency } from "@/lib/format";

type NavCategory = { slug: string; name: string; icon: string; productCount: number };

type Suggestion = {
  slug: string;
  title: string;
  partNumber: string;
  imageUrl: string;
  price: number;
};

export function SiteHeader({ categories }: { categories: NavCategory[] }) {
  const router = useRouter();
  const { cart } = useCart();
  const [term, setTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [openSuggest, setOpenSuggest] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (term.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    const id = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(term.trim())}`);
        const data = (await res.json()) as { results: Suggestion[] };
        setSuggestions(data.results ?? []);
        setOpenSuggest(true);
      } catch {
        setSuggestions([]);
      }
    }, 220);
    return () => clearTimeout(id);
  }, [term]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpenSuggest(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    setOpenSuggest(false);
    router.push(`/shop?q=${encodeURIComponent(term.trim())}`);
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-brand-950 text-[13px] text-brand-100">
        <div className="container-page flex h-9 items-center justify-between gap-4">
          <p className="hidden sm:block">
            🚚 Free ground shipping on US orders up to 10 LBS · Same-day dispatch before 3PM CST
          </p>
          <p className="sm:hidden">🚚 Free US shipping up to 10 LBS</p>
          <div className="flex items-center gap-4">
            <a href="tel:+18882034073" className="hover:text-accent-400">
              +1 (888) 203-4073
            </a>
            <span className="hidden h-3 w-px bg-white/20 md:block" />
            <Link href="/support" className="hidden hover:text-accent-400 md:block">
              Track Order
            </Link>
            <Link href="/contact" className="hidden hover:text-accent-400 md:block">
              Request a Quote
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white">
        <div className="container-page flex h-[72px] items-center gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-900 text-lg font-black text-accent-400">
              G
            </span>
            <span className="leading-none">
              <span className="block text-xl font-black tracking-tight text-brand-900">
                GOTO<span className="text-accent-500">DIRECT</span>
              </span>
              <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 sm:block">
                IT Hardware Superstore
              </span>
            </span>
          </Link>

          <div ref={boxRef} className="relative hidden flex-1 md:block">
            <form onSubmit={submitSearch} className="flex">
              <input
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                onFocus={() => suggestions.length > 0 && setOpenSuggest(true)}
                placeholder="Search by part number, model or keyword (e.g. JL665A, SN850X)"
                className="h-11 w-full rounded-l-lg border border-r-0 border-slate-300 px-4 text-sm outline-none focus:border-brand-600"
              />
              <button
                type="submit"
                className="h-11 rounded-r-lg bg-brand-700 px-6 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                Search
              </button>
            </form>
            {openSuggest && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
                {suggestions.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/product/${item.slug}`}
                    onClick={() => setOpenSuggest(false)}
                    className="flex items-center gap-3 border-b border-slate-100 px-3 py-2 last:border-0 hover:bg-brand-50"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-md border border-slate-200 bg-white object-contain p-1"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-slate-800">
                        {item.title}
                      </span>
                      <span className="text-xs text-slate-500">
                        Part #{item.partNumber}
                      </span>
                    </span>
                    <span className="text-sm font-bold text-brand-800">
                      {formatCurrency(item.price)}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <Link
              href="/contact"
              className="hidden rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-brand-900 transition hover:border-brand-600 hover:text-brand-700 lg:block"
            >
              Bulk Quote
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center gap-2 rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-bold text-brand-950 transition hover:bg-accent-400"
            >
              🛒 <span className="hidden sm:inline">Cart</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-900 px-1 text-[11px] font-bold text-white">
                {cart.itemCount}
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-brand-900 lg:hidden"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      <nav className="hidden bg-brand-900 text-sm text-white lg:block">
        <div className="container-page flex h-12 items-center gap-1">
          <div
            className="relative h-full"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button className="flex h-full items-center gap-2 bg-brand-800 px-5 font-semibold">
              ☰ All Categories
            </button>
            {catOpen && (
              <div className="absolute left-0 top-12 z-50 w-80 overflow-hidden rounded-b-xl border border-slate-200 bg-white py-2 text-slate-700 shadow-2xl">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-brand-50 hover:text-brand-800"
                  >
                    <span className="flex items-center gap-3">
                      <span>{category.icon}</span>
                      {category.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {category.productCount}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {[
            { href: "/", label: "Home" },
            { href: "/shop", label: "Shop All" },
            { href: "/deals", label: "Deals" },
            { href: "/brands", label: "Brands" },
            { href: "/about", label: "About Us" },
            { href: "/support", label: "Support" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-4 py-2 font-medium text-brand-100 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <span className="ml-auto text-xs font-medium text-accent-400">
            ⚡ 30-Day Returns · Best Price Guaranteed
          </span>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pb-5 pt-3 shadow-lg lg:hidden">
          <form onSubmit={submitSearch} className="mb-4 flex">
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search part number or keyword"
              className="h-11 w-full rounded-l-lg border border-r-0 border-slate-300 px-3 text-sm outline-none"
            />
            <button className="h-11 rounded-r-lg bg-brand-700 px-5 text-sm font-semibold text-white">
              Go
            </button>
          </form>
          <div className="grid gap-1">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50"
              >
                <span>{category.icon}</span>
                {category.name}
              </Link>
            ))}
            <div className="my-2 h-px bg-slate-200" />
            {[
              { href: "/shop", label: "Shop All" },
              { href: "/deals", label: "Deals" },
              { href: "/brands", label: "Brands" },
              { href: "/about", label: "About Us" },
              { href: "/support", label: "Support" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-brand-900 hover:bg-brand-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

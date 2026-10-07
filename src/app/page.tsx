import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import {
  getBestSellers,
  getCategories,
  getFeaturedProducts,
  getManufacturers,
  getNewArrivals,
} from "@/lib/queries";

const valueProps = [
  {
    icon: "🚚",
    title: "Free Shipping",
    text: "On all U.S. orders up to 10 LBS, dispatched same day before 3PM CST.",
  },
  {
    icon: "🔒",
    title: "Secure Payment",
    text: "100% protected checkout. All major cards, PayPal, wire and POs accepted.",
  },
  {
    icon: "↩️",
    title: "30-Day Returns",
    text: "Best price and money-back guarantee on every part we ship.",
  },
  {
    icon: "🎧",
    title: "Expert Support",
    text: "Live chat, email and phone help from engineers who know the hardware.",
  },
];

const trustedBy = [
  "Apple",
  "NASA",
  "Intel",
  "NVIDIA",
  "PepsiCo",
  "Pfizer",
  "Shell",
  "SpaceX",
  "Disney",
  "US Navy",
  "EarthLink",
  "Seagate",
  "HP",
  "NOAA",
];

const testimonials = [
  {
    quote:
      "We needed 14 Aruba switches for a campus refresh with a two-week deadline. GotoDirect had stock, matched our budget and everything arrived pre-tested with the firmware we asked for.",
    name: "Daniel R.",
    role: "Network Manager, K-12 District",
  },
  {
    quote:
      "Legacy spares are impossible to source. These guys found three DDR3 RDIMM banks and a proprietary system board that kept a production line running another two years.",
    name: "Amara K.",
    role: "IT Operations Lead, Manufacturing",
  },
  {
    quote:
      "Quoting is fast and the part numbers are always right. That matters when you're buying 40 drives and cannot afford a mismatched firmware revision.",
    name: "Steve M.",
    role: "Infrastructure Architect",
  },
];

export default async function HomePage() {
  const [categories, featured, bestSellers, newArrivals, brands] =
    await Promise.all([
      getCategories(),
      getFeaturedProducts(8),
      getBestSellers(8),
      getNewArrivals(4),
      getManufacturers(),
    ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-950">
        <Image
          src="/images/hero-datacenter.jpg"
          alt="Enterprise data center"
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/90 to-brand-950/40" />
        <div className="container-page relative grid gap-10 py-16 lg:grid-cols-[1.15fr_1fr] lg:py-24">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-500/40 bg-accent-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-400">
              ⚡ 150,000+ parts · Same-day dispatch
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Enterprise IT hardware,
              <span className="block text-accent-400">direct to your rack.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg">
              Network switches, servers, SAS and NVMe storage, ECC memory,
              motherboards, power supplies, optics and auto-ID gear — all tested,
              warranty-backed and priced to beat the big distributors.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-lg bg-accent-500 px-7 py-3.5 text-sm font-bold text-brand-950 transition hover:bg-accent-400"
              >
                Shop the Catalog
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Request a Bulk Quote
              </Link>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {[
                ["22+", "Years in business"],
                ["48 hrs", "Avg. delivery time"],
                ["98.6%", "Order accuracy"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-black text-accent-400">{value}</dt>
                  <dd className="text-xs text-brand-200">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hidden grid-cols-2 gap-4 self-center lg:grid">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="card-hover rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-white">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    sizes="200px"
                    className="object-contain p-2"
                  />
                </div>
                <p className="text-sm font-bold text-white">{category.name}</p>
                <p className="text-xs text-brand-200">
                  {category.productCount} products in stock
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((prop) => (
            <div key={prop.title} className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xl">
                {prop.icon}
              </span>
              <div>
                <h3 className="text-sm font-bold text-brand-900">{prop.title}</h3>
                <p className="text-xs leading-relaxed text-slate-500">{prop.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
              Browse by category
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-brand-950">
              Shop every layer of your stack
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            View all products →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="card-hover group overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <div className="relative aspect-[16/10] bg-slate-50">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-contain p-4 transition duration-300 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-brand-800">
                  {category.productCount} items
                </span>
              </div>
              <div className="border-t border-slate-100 p-4">
                <h3 className="flex items-center gap-2 text-base font-bold text-brand-900">
                  <span>{category.icon}</span>
                  {category.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                  {category.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-white py-14">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
                Hand picked
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-brand-950">
                Featured hardware
              </h2>
            </div>
            <Link
              href="/shop?sort=rating"
              className="text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              See more →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo band */}
      <section className="container-page py-14">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl bg-brand-900 p-8 text-white lg:col-span-2">
            <div className="relative z-10 max-w-lg">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400">
                Volume pricing
              </p>
              <h3 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                Buying 10 units or more? We will beat your current quote.
              </h3>
              <p className="mt-3 text-sm text-brand-100">
                Send us your bill of materials and our sourcing team will come back
                within 4 business hours with stock, lead time and tiered pricing —
                including matched memory banks and pre-configured servers.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block rounded-lg bg-accent-500 px-6 py-3 text-sm font-bold text-brand-950 transition hover:bg-accent-400"
              >
                Get Bulk Pricing
              </Link>
            </div>
            <div className="pointer-events-none absolute -right-16 -top-10 h-72 w-72 rounded-full bg-brand-700/40 blur-2xl" />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
              Just arrived
            </p>
            <h3 className="mt-2 text-xl font-black text-brand-950">New in stock</h3>
            <ul className="mt-4 space-y-4">
              {newArrivals.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    className="flex items-center gap-3 rounded-lg p-1 transition hover:bg-slate-50"
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-lg border border-slate-200 object-contain p-1"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 text-xs font-semibold text-slate-700">
                        {product.shortTitle}
                      </span>
                      <span className="text-sm font-bold text-brand-800">
                        ${product.price.toLocaleString("en-US")}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="bg-white py-14">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
                Most ordered this quarter
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-brand-950">
                Best sellers
              </h2>
            </div>
            <Link
              href="/deals"
              className="text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              Today&apos;s deals →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="container-page py-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-center text-2xl font-black tracking-tight text-brand-950">
            Brands we stock
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Genuine parts, correct coding, manufacturer warranty where applicable.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/shop?brand=${brand.slug}`}
                className="rounded-xl border border-slate-200 px-3 py-4 text-center text-sm font-bold text-slate-600 transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-800"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by marquee */}
      <section className="overflow-hidden bg-brand-950 py-12">
        <div className="container-page">
          <h2 className="text-center text-xl font-bold text-white sm:text-2xl">
            Trusted by leading enterprises and thousands of satisfied customers
          </h2>
        </div>
        <div className="hide-scrollbar mt-8 overflow-hidden">
          <div className="marquee-track gap-10 px-5">
            {[...trustedBy, ...trustedBy].map((name, index) => (
              <span
                key={`${name}-${index}`}
                className="whitespace-nowrap text-lg font-black uppercase tracking-widest text-white/35"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-page py-16">
        <h2 className="text-center text-3xl font-black tracking-tight text-brand-950">
          What our customers say
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="text-amber-500">★★★★★</div>
              <blockquote className="mt-3 text-sm leading-relaxed text-slate-600">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-slate-100 pt-4">
                <span className="block text-sm font-bold text-brand-900">
                  {item.name}
                </span>
                <span className="text-xs text-slate-500">{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}

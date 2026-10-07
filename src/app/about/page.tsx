import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About GotoDirect",
  description:
    "GotoDirect supplies tested, warranty-backed enterprise IT hardware to businesses, schools and government agencies worldwide.",
};

const stats = [
  ["150,000+", "Part numbers catalogued"],
  ["22 years", "Supplying IT hardware"],
  ["120+", "Countries served"],
  ["98.6%", "Order accuracy rate"],
];

const values = [
  {
    icon: "🔎",
    title: "We find what others cannot",
    text: "End-of-life switch modules, legacy RDIMM banks, proprietary system boards — our sourcing desk works global channel, broker and clearance inventory every single day.",
  },
  {
    icon: "🧪",
    title: "Everything is tested",
    text: "Drives get SMART reports, PSUs get load-banked, switches get firmware-checked and config-wiped. If it does not pass, it does not ship.",
  },
  {
    icon: "💬",
    title: "Engineers, not order takers",
    text: "The person answering your call knows the difference between a 2Rx4 and a 2Rx8 RDIMM, and will tell you if the part you asked for is the wrong one.",
  },
  {
    icon: "🤝",
    title: "Priced to earn the next order",
    text: "We quote sharp, we match competitors and we publish real stock levels. No bait pricing on parts that do not exist.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="Who we are"
        title="Enterprise hardware, sourced honestly"
        subtitle="GotoDirect has supplied networking, compute, storage and auto-ID hardware to IT teams across the United States and 120 other countries for more than two decades."
        breadcrumbs={[{ href: "/about", label: "About" }]}
      />

      <section className="container-page grid gap-10 py-14 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
          <Image
            src="/images/hero-datacenter.jpg"
            alt="GotoDirect data center"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-black tracking-tight text-brand-950">
            Built by people who ran the racks
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              GotoDirect started in a 2,000 square foot warehouse with a simple
              frustration: buying server parts was slow, opaque and full of
              surprises. Lead times moved, part numbers did not match, and the
              person on the phone could not tell you whether a DIMM would
              actually post in your board.
            </p>
            <p>
              Two decades later we stock and source more than 150,000 part
              numbers across eight hardware categories, with a test bench for
              every one of them. Schools standardising wiring closets, hospitals
              keeping imaging systems alive, manufacturers extending the life of
              a production line — those are our customers, and uptime is the
              only metric that matters to them.
            </p>
            <p>
              We publish real stock, real pricing and real condition grades. If
              something is refurbished we say so, and we back it with the same
              30-day guarantee as everything else we sell.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-5">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-xl border border-slate-200 p-4">
                <p className="text-2xl font-black text-brand-800">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-page">
          <h2 className="text-center text-3xl font-black tracking-tight text-brand-950">
            How we work
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-slate-200 p-6"
              >
                <p className="text-2xl">{value.icon}</p>
                <h3 className="mt-3 text-lg font-bold text-brand-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="rounded-2xl bg-brand-900 p-10 text-center text-white">
          <h2 className="text-2xl font-black sm:text-3xl">
            Let us quote your next project
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-brand-100">
            Send a bill of materials and we will return stock, lead times and
            tiered pricing within four business hours — including alternates if
            something is scarce.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-lg bg-accent-500 px-7 py-3 text-sm font-bold text-brand-950 transition hover:bg-accent-400"
            >
              Request a Quote
            </Link>
            <Link
              href="/shop"
              className="rounded-lg border border-white/30 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

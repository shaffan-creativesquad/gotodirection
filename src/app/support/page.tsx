import type { Metadata } from "next";
import Link from "next/link";
import { Faq, TrackOrderForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Support, Shipping & Returns",
  description:
    "Track an order, review GotoDirect shipping times, returns, RMA process, warranty terms and payment options.",
};

const faqs = [
  {
    q: "How fast do orders ship?",
    a: "In-stock items ordered before 3PM CST ship the same business day. Standard US ground delivery takes 2–4 business days; 2-day and overnight options are available at checkout. International orders ship via DHL or FedEx International and typically arrive in 3–7 business days.",
  },
  {
    q: "Is shipping really free?",
    a: "Yes — ground shipping is free on all US orders up to 10 LBS. Heavier shipments (servers, chassis, bulk drive orders) are quoted at discounted commercial rates which you will see before payment.",
  },
  {
    q: "What condition are the parts in?",
    a: "Every listing states its condition clearly: New (factory sealed), New Open Box (unused, packaging opened) or Refurbished (professionally tested, cleaned and reconditioned). Refurbished hardware is functionally equivalent to new and carries our warranty.",
  },
  {
    q: "How do returns and RMAs work?",
    a: "You have 30 days from delivery to request a return for any stocked item. Contact support with your order number to receive an RMA, ship the item back in its original packaging, and we will issue a refund or replacement within 3 business days of receipt.",
  },
  {
    q: "What warranty do I get?",
    a: "Factory-sealed items carry the manufacturer's warranty. Everything else is covered by the GotoDirect warranty — typically 1 year, stated on each product page. Extended 3-year coverage can be added to most hardware at checkout.",
  },
  {
    q: "Do you accept purchase orders?",
    a: "Yes. Schools, universities, government agencies and approved enterprises can check out on NET-30 purchase order terms. Submit your PO to sales@gotodirect.com or select Purchase Order at checkout and our finance team will verify the account.",
  },
  {
    q: "Can you source parts that are not listed?",
    a: "Absolutely — that is a large part of what we do. Send us the manufacturer part number and quantity. Our sourcing desk checks global channel inventory, end-of-life stock and broker markets, and comes back with availability and pricing within 4 business hours.",
  },
  {
    q: "Do you ship worldwide?",
    a: "We ship to over 120 countries. Duties and taxes are calculated at checkout for most destinations; for others we provide a commercial invoice so your broker can clear the shipment.",
  },
];

export default function SupportPage() {
  return (
    <div>
      <PageHero
        eyebrow="Customer service"
        title="Support centre"
        subtitle="Track an order, learn how shipping and returns work, or get help choosing the right part for your platform."
        breadcrumbs={[{ href: "/support", label: "Support" }]}
      />

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_340px]">
        <div>
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-brand-900">Track your order</h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter the order number from your confirmation email (format
              GTD-XXXXXXXX).
            </p>
            <div className="mt-4">
              <TrackOrderForm />
            </div>
          </section>

          <h2 className="mb-4 mt-10 text-2xl font-black tracking-tight text-brand-950">
            Frequently asked questions
          </h2>
          <Faq items={faqs} />
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Service highlights
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {[
                "🚚 Free US ground shipping up to 10 LBS",
                "⏱️ Same-day dispatch before 3PM CST",
                "↩️ 30-day money-back guarantee",
                "🛡️ 1-year warranty as standard",
                "🏷️ Best price guarantee — we match and beat",
                "🌍 Shipping to 120+ countries",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-brand-900 p-6 text-white">
            <h3 className="text-sm font-bold text-accent-400">
              Still need a human?
            </h3>
            <p className="mt-2 text-sm text-brand-100">
              Call +1 (888) 203-4073 or send a message and a hardware specialist
              will reply within one business hour.
            </p>
            <Link
              href="/contact"
              className="mt-4 block rounded-lg bg-accent-500 py-2.5 text-center text-sm font-bold text-brand-950 transition hover:bg-accent-400"
            >
              Contact support
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

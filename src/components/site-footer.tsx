import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";

type FooterCategory = { slug: string; name: string };

export function SiteFooter({ categories }: { categories: FooterCategory[] }) {
  return (
    <footer className="mt-20 bg-brand-950 text-brand-100">
      <div className="border-b border-white/10">
        <div className="container-page grid gap-8 py-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="text-2xl font-bold text-white">
              Get deal alerts & stock drops
            </h3>
            <p className="mt-2 max-w-xl text-sm text-brand-200">
              Weekly price drops on switches, drives, memory and printers — plus
              early access to clearance inventory. No spam, unsubscribe anytime.
            </p>
          </div>
          <div className="self-center">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg font-black text-accent-400">
              G
            </span>
            <span className="text-xl font-black tracking-tight text-white">
              GOTO<span className="text-accent-500">DIRECT</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-brand-200">
            GotoDirect supplies enterprise IT hardware — networking, servers,
            storage, memory and auto-ID equipment — to businesses, schools and
            government agencies across the United States and worldwide.
          </p>
          <div className="mt-5 space-y-1 text-sm">
            <p>📞 +1 (888) 203-4073</p>
            <p>✉️ sales@gotodirect.com</p>
            <p>📍 1401 Tech Park Drive, Dallas, TX 75201</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Shop Categories
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className="text-brand-200 transition hover:text-accent-400"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Customer Service
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { href: "/support", label: "Shipping & Delivery" },
              { href: "/support", label: "Returns & RMA" },
              { href: "/support", label: "Warranty Policy" },
              { href: "/support", label: "Payment Options" },
              { href: "/contact", label: "Request a Quote" },
              { href: "/contact", label: "Contact Support" },
            ].map((link, index) => (
              <li key={`${link.label}-${index}`}>
                <Link
                  href={link.href}
                  className="text-brand-200 transition hover:text-accent-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Company
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { href: "/about", label: "About GotoDirect" },
              { href: "/brands", label: "Brands We Carry" },
              { href: "/deals", label: "Today's Deals" },
              { href: "/shop", label: "Full Catalog" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-brand-200 transition hover:text-accent-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-semibold">
            {["VISA", "MASTERCARD", "AMEX", "PAYPAL", "WIRE", "PO"].map((method) => (
              <span
                key={method}
                className="rounded border border-white/15 bg-white/5 px-2 py-1 text-brand-100"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-brand-300 md:flex-row">
          <p>© {new Date().getFullYear()} GotoDirect. All rights reserved.</p>
          <p>
            Trademarks are the property of their respective owners. GotoDirect is
            an independent reseller and is not affiliated with the manufacturers
            listed.
          </p>
        </div>
      </div>
    </footer>
  );
}

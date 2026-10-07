import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getCategories } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "GotoDirect | Buy PC Parts, Servers & Network Hardware Online",
    template: "%s | GotoDirect",
  },
  description:
    "Shop enterprise IT hardware at GotoDirect — network switches, servers, hard drives, SSDs, server memory, motherboards, power supplies, transceivers, thermal printers and barcode scanners. Best price guaranteed with free US shipping.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
        <CartProvider>
          <SiteHeader
            categories={categories.map((category) => ({
              slug: category.slug,
              name: category.name,
              icon: category.icon,
              productCount: category.productCount,
            }))}
          />
          <main className="flex-1">{children}</main>
          <SiteFooter
            categories={categories.map((category) => ({
              slug: category.slug,
              name: category.name,
            }))}
          />
        </CartProvider>
      </body>
    </html>
  );
}

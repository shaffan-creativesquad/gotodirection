import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Shopping Cart" };

export default function CartPage() {
  return (
    <div>
      <PageHero
        title="Your cart"
        subtitle="Review your items, adjust quantities and head to a secure checkout. Need a formal quote or purchase order instead? Just ask."
        breadcrumbs={[{ href: "/cart", label: "Cart" }]}
      />
      <CartView />
    </div>
  );
}

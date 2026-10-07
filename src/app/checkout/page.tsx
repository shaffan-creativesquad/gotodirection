import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Secure Checkout" };

export default function CheckoutPage() {
  return (
    <div>
      <PageHero
        title="Secure checkout"
        subtitle="Free US ground shipping up to 10 LBS. Purchase orders accepted from approved schools, government agencies and enterprises."
        breadcrumbs={[
          { href: "/cart", label: "Cart" },
          { href: "/checkout", label: "Checkout" },
        ]}
      />
      <CheckoutForm />
    </div>
  );
}

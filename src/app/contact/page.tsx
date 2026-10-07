import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = {
  title: "Contact & Quotes",
  description:
    "Talk to the GotoDirect sales and sourcing team — phone, email or request a bulk quote online.",
};

const channels = [
  {
    icon: "📞",
    title: "Call sales",
    value: "+1 (888) 203-4073",
    note: "Mon–Fri, 8AM–7PM CST",
  },
  {
    icon: "✉️",
    title: "Email us",
    value: "sales@gotodirect.com",
    note: "Replies within 1 business hour",
  },
  {
    icon: "💬",
    title: "Live chat",
    value: "Chat with an engineer",
    note: "Available on every page",
  },
  {
    icon: "📍",
    title: "Visit",
    value: "1401 Tech Park Drive, Dallas, TX",
    note: "Will-call by appointment",
  },
];

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="We are here to help"
        title="Contact GotoDirect"
        subtitle="Quotes, sourcing requests, order status and technical questions — our team of hardware specialists answers every message personally."
        breadcrumbs={[{ href: "/contact", label: "Contact" }]}
      />

      <div className="container-page py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel) => (
            <div
              key={channel.title}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <p className="text-2xl">{channel.icon}</p>
              <h2 className="mt-2 text-sm font-bold uppercase tracking-wide text-slate-500">
                {channel.title}
              </h2>
              <p className="mt-1 text-sm font-bold text-brand-900">
                {channel.value}
              </p>
              <p className="text-xs text-slate-500">{channel.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ContactForm />
          <QuoteForm compact />
        </div>
      </div>
    </div>
  );
}

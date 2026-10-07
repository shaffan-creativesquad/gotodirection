import Link from "next/link";

export function PageHero({
  title,
  subtitle,
  breadcrumbs = [],
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumbs?: { href: string; label: string }[];
}) {
  return (
    <section className="border-b border-slate-200 bg-brand-900 text-white">
      <div className="container-page py-10">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-brand-200">
          <Link href="/" className="hover:text-accent-400">
            Home
          </Link>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-2">
              <span>/</span>
              <Link href={crumb.href} className="hover:text-accent-400">
                {crumb.label}
              </Link>
            </span>
          ))}
        </nav>
        {eyebrow && (
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-accent-400">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-100">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

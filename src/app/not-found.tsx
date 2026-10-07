import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-6xl">🔌</p>
      <h1 className="mt-6 text-4xl font-black tracking-tight text-brand-950">
        404 — Part not found
      </h1>
      <p className="mt-3 max-w-xl text-sm text-slate-500">
        The page or product you are looking for is no longer listed. Try a search
        or send us the part number and our sourcing desk will track it down.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/shop"
          className="rounded-lg bg-brand-700 px-6 py-3 text-sm font-bold text-white hover:bg-brand-800"
        >
          Browse catalog
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 hover:border-brand-600"
        >
          Request sourcing
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { SpecGroup } from "@/db/schema";

const TABS = ["Description", "Specifications", "Shipping & Returns", "Reviews"] as const;

type Tab = (typeof TABS)[number];

export function ProductTabs({
  overview,
  highlights,
  specs,
  warranty,
  upc,
  partNumber,
  rating,
  reviewCount,
}: {
  overview: string;
  highlights: string[];
  specs: SpecGroup[];
  warranty: string;
  upc: string;
  partNumber: string;
  rating: number;
  reviewCount: number;
}) {
  const [active, setActive] = useState<Tab>("Description");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <div className="flex overflow-x-auto border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`whitespace-nowrap border-b-2 px-6 py-4 text-sm font-bold transition ${
              active === tab
                ? "border-accent-500 text-brand-900"
                : "border-transparent text-slate-500 hover:text-brand-700"
            }`}
          >
            {tab}
            {tab === "Specifications" && (
              <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-500">
                {specs.reduce((sum, group) => sum + group.rows.length, 0)}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="p-6 lg:p-8">
        {active === "Description" && (
          <div>
            <h3 className="text-lg font-bold text-brand-900">
              Product overview — {partNumber}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">{overview}</p>

            <h4 className="mt-8 text-sm font-bold uppercase tracking-wide text-brand-900">
              Key features
            </h4>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-lg bg-slate-50 p-3 text-sm leading-relaxed text-slate-600"
                >
                  <span className="text-accent-600">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {upc && (
              <p className="mt-6 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">UPC:</span> {upc}
              </p>
            )}
          </div>
        )}

        {active === "Specifications" && (
          <div className="space-y-8">
            {specs.map((group) => (
              <div key={group.title}>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-900">
                  {group.title}
                </h3>
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <table className="w-full text-sm">
                    <tbody>
                      {group.rows.map((row, index) => (
                        <tr
                          key={row.label}
                          className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                        >
                          <th className="w-1/3 border-b border-slate-100 px-4 py-3 text-left font-semibold text-slate-700">
                            {row.label}
                          </th>
                          <td className="border-b border-slate-100 px-4 py-3 text-slate-600">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {active === "Shipping & Returns" && (
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Shipping",
                body: "Free ground shipping within the US on orders up to 10 LBS. Orders placed before 3PM CST ship the same business day. Expedited (2-day and overnight) and worldwide DHL/FedEx options are available at checkout.",
              },
              {
                title: "Returns & RMA",
                body: "30-day no-questions return window on stocked items. Request an RMA number from support, return the item in its original packaging, and we will refund or replace within 3 business days of receipt.",
              },
              {
                title: "Warranty",
                body: warranty,
              },
              {
                title: "Payment options",
                body: "Visa, Mastercard, American Express, Discover, PayPal and wire transfer. Approved schools, government agencies and enterprises can check out on NET-30 purchase orders.",
              },
            ].map((block) => (
              <div
                key={block.title}
                className="rounded-xl border border-slate-200 p-5"
              >
                <h3 className="text-sm font-bold text-brand-900">{block.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        )}

        {active === "Reviews" && (
          <div>
            <div className="flex flex-wrap items-center gap-6 rounded-xl bg-slate-50 p-6">
              <div className="text-center">
                <p className="text-4xl font-black text-brand-900">
                  {rating.toFixed(1)}
                </p>
                <p className="text-amber-500">{"★".repeat(Math.round(rating))}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {reviewCount} verified reviews
                </p>
              </div>
              <div className="flex-1 space-y-1">
                {[5, 4, 3, 2, 1].map((star) => {
                  const width =
                    star === Math.round(rating)
                      ? 68
                      : star === 5
                        ? 76
                        : star === 4
                          ? 18
                          : 3;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-8 text-slate-500">{star}★</span>
                      <span className="h-2 flex-1 overflow-hidden rounded bg-slate-200">
                        <span
                          className="block h-full rounded bg-amber-400"
                          style={{ width: `${width}%` }}
                        />
                      </span>
                      <span className="w-10 text-right text-slate-400">
                        {width}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {[
                {
                  name: "Verified Buyer — IT Director",
                  text: "Exactly as described, arrived in two days and the firmware was current. Ordering more for the second site.",
                },
                {
                  name: "Verified Buyer — Systems Engineer",
                  text: "Packaging was solid, part number matched our BOM and the price beat our distributor quote by a wide margin.",
                },
              ].map((review) => (
                <div
                  key={review.name}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <p className="text-amber-500">★★★★★</p>
                  <p className="mt-2 text-sm text-slate-600">{review.text}</p>
                  <p className="mt-3 text-xs font-semibold text-slate-500">
                    {review.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

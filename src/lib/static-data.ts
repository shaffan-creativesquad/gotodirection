import { seedCategories, seedManufacturers, seedProducts } from "@/db/seed-data";
import type { SpecGroup } from "@/db/schema";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

function productSlug(partNumber: string, shortTitle: string) {
  return `${slugify(partNumber)}-${slugify(shortTitle)}`;
}

export const categoryList = seedCategories.map((cat, i) => ({
  id: i + 1,
  slug: cat.slug,
  name: cat.name,
  tagline: cat.tagline,
  description: cat.description,
  imageUrl: cat.imageUrl,
  icon: cat.icon,
  sortOrder: i,
}));

export const manufacturerList = seedManufacturers.map((mfr, i) => ({
  id: i + 1,
  slug: mfr.slug,
  name: mfr.name,
  blurb: mfr.blurb,
}));

const categoryMap = new Map(categoryList.map((c) => [c.slug, c]));
const manufacturerMap = new Map(manufacturerList.map((m) => [m.slug, m]));

export const productList = seedProducts.map((p, i) => {
  const cat = categoryMap.get(p.category)!;
  const mfr = manufacturerMap.get(p.manufacturer)!;
  return {
    id: i + 1,
    slug: productSlug(p.partNumber, p.shortTitle),
    partNumber: p.partNumber,
    title: p.title,
    shortTitle: p.shortTitle,
    categoryId: cat.id,
    categorySlug: cat.slug,
    categoryName: cat.name,
    manufacturerId: mfr.id,
    manufacturerSlug: mfr.slug,
    manufacturerName: mfr.name,
    price: p.price,
    listPrice: p.listPrice,
    condition: p.condition as string,
    availability: p.stock > 0 ? "In Stock" : "Backorder",
    stock: p.stock,
    upc: p.upc,
    warranty: "1 Year GotoDirect Warranty",
    imageUrl: cat.imageUrl.replace(/\.jpg$/, ".svg"),
    overview: p.overview,
    highlights: p.highlights as string[],
    specs: p.specs as SpecGroup[],
    rating: p.rating,
    reviewCount: p.reviewCount,
    isFeatured: Boolean(p.featured),
    isBestSeller: Boolean(p.bestSeller),
  };
});

export const productBySlug = new Map(productList.map((p) => [p.slug, p]));
export const productById = new Map(productList.map((p) => [p.id, p]));

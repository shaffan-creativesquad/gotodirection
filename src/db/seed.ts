import { sql } from "drizzle-orm";
import { db } from "./index";
import { categories, manufacturers, products } from "./schema";
import { seedCategories, seedManufacturers, seedProducts } from "./seed-data";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

export function productSlug(partNumber: string, shortTitle: string) {
  return `${slugify(partNumber)}-${slugify(shortTitle)}`;
}

let seedPromise: Promise<void> | null = null;

async function runSeed() {
  const existing = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products);

  if ((existing[0]?.count ?? 0) > 0) return;

  const categoryRows = await db
    .insert(categories)
    .values(
      seedCategories.map((category, index) => ({
        slug: category.slug,
        name: category.name,
        tagline: category.tagline,
        description: category.description,
        imageUrl: category.imageUrl,
        icon: category.icon,
        sortOrder: index,
      })),
    )
    .onConflictDoNothing()
    .returning({ id: categories.id, slug: categories.slug });

  const manufacturerRows = await db
    .insert(manufacturers)
    .values(seedManufacturers)
    .onConflictDoNothing()
    .returning({ id: manufacturers.id, slug: manufacturers.slug });

  const categoryMap = new Map(categoryRows.map((row) => [row.slug, row.id]));
  const manufacturerMap = new Map(
    manufacturerRows.map((row) => [row.slug, row.id]),
  );

  if (categoryMap.size === 0 || manufacturerMap.size === 0) {
    const allCategories = await db
      .select({ id: categories.id, slug: categories.slug })
      .from(categories);
    allCategories.forEach((row) => categoryMap.set(row.slug, row.id));
    const allManufacturers = await db
      .select({ id: manufacturers.id, slug: manufacturers.slug })
      .from(manufacturers);
    allManufacturers.forEach((row) => manufacturerMap.set(row.slug, row.id));
  }

  const categoryImage = new Map(
    seedCategories.map((category) => [category.slug, category.imageUrl]),
  );

  await db
    .insert(products)
    .values(
      seedProducts.map((product) => ({
        slug: productSlug(product.partNumber, product.shortTitle),
        partNumber: product.partNumber,
        title: product.title,
        shortTitle: product.shortTitle,
        categoryId: categoryMap.get(product.category)!,
        manufacturerId: manufacturerMap.get(product.manufacturer)!,
        price: product.price.toFixed(2),
        listPrice: product.listPrice.toFixed(2),
        condition: product.condition,
        availability: product.stock > 0 ? "In Stock" : "Backorder",
        stock: product.stock,
        upc: product.upc,
        imageUrl: categoryImage.get(product.category) ?? "/images/cat-switches.jpg",
        overview: product.overview,
        highlights: product.highlights,
        specs: product.specs,
        rating: product.rating.toFixed(1),
        reviewCount: product.reviewCount,
        isFeatured: Boolean(product.featured),
        isBestSeller: Boolean(product.bestSeller),
      })),
    )
    .onConflictDoNothing();
}

export function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = runSeed().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }
  return seedPromise;
}

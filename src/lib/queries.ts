import {
  categoryList,
  manufacturerList,
  productList,
  productBySlug,
} from "@/lib/static-data";
import type { SpecGroup } from "@/db/schema";

export type ProductListItem = {
  id: number;
  slug: string;
  partNumber: string;
  title: string;
  shortTitle: string;
  price: number;
  listPrice: number;
  condition: string;
  availability: string;
  stock: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  categoryName: string;
  categorySlug: string;
  manufacturerName: string;
  manufacturerSlug: string;
};

export type ProductDetail = ProductListItem & {
  overview: string;
  highlights: string[];
  specs: SpecGroup[];
  upc: string;
  warranty: string;
  categoryId: number;
};

export type CategoryItem = (typeof categoryList)[number] & { productCount: number };

export async function getCategories(): Promise<CategoryItem[]> {
  return categoryList.map((cat) => ({
    ...cat,
    productCount: productList.filter((p) => p.categoryId === cat.id).length,
  }));
}

export async function getCategoryBySlug(slug: string) {
  return categoryList.find((c) => c.slug === slug) ?? null;
}

export async function getManufacturers() {
  return manufacturerList.map((mfr) => ({
    ...mfr,
    productCount: productList.filter((p) => p.manufacturerId === mfr.id).length,
  }));
}

export type ProductFilters = {
  categorySlug?: string;
  brands?: string[];
  conditions?: string[];
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  perPage?: number;
};

export async function listProducts(filters: ProductFilters) {
  const page = Math.max(1, filters.page ?? 1);
  const perPage = filters.perPage ?? 12;

  let items = [...productList];

  if (filters.categorySlug) {
    items = items.filter((p) => p.categorySlug === filters.categorySlug);
  }
  if (filters.brands && filters.brands.length > 0) {
    items = items.filter((p) => filters.brands!.includes(p.manufacturerSlug));
  }
  if (filters.conditions && filters.conditions.length > 0) {
    items = items.filter((p) => filters.conditions!.includes(p.condition));
  }
  if (filters.q) {
    const term = filters.q.toLowerCase();
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.partNumber.toLowerCase().includes(term) ||
        p.shortTitle.toLowerCase().includes(term) ||
        p.manufacturerName.toLowerCase().includes(term) ||
        p.categoryName.toLowerCase().includes(term),
    );
  }
  if (typeof filters.minPrice === "number" && !Number.isNaN(filters.minPrice)) {
    items = items.filter((p) => p.price >= filters.minPrice!);
  }
  if (typeof filters.maxPrice === "number" && !Number.isNaN(filters.maxPrice)) {
    items = items.filter((p) => p.price <= filters.maxPrice!);
  }

  switch (filters.sort) {
    case "price-asc":
      items.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      items.sort((a, b) => b.price - a.price);
      break;
    case "name":
      items.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "rating":
      items.sort((a, b) => b.rating - a.rating);
      break;
    default:
      items.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller) || a.id - b.id);
  }

  const total = items.length;
  const sliced = items.slice((page - 1) * perPage, page * perPage);

  return {
    items: sliced,
    total,
    page,
    perPage,
    pageCount: Math.max(1, Math.ceil(total / perPage)),
  };
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const p = productBySlug.get(slug);
  if (!p) return null;
  return p;
}

export async function getRelatedProducts(categoryId: number, excludeId: number) {
  return productList
    .filter((p) => p.categoryId === categoryId && p.id !== excludeId)
    .slice(0, 4);
}

export async function getFeaturedProducts(limit = 8) {
  return productList.filter((p) => p.isFeatured).slice(0, limit);
}

export async function getBestSellers(limit = 8) {
  return productList
    .filter((p) => p.isBestSeller)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export async function getNewArrivals(limit = 4) {
  return [...productList].sort((a, b) => b.id - a.id).slice(0, limit);
}

export async function getAllProductSlugs() {
  return productList.map((p) => ({ slug: p.slug }));
}

export async function searchSuggestions(term: string, limit = 6) {
  if (!term.trim()) return [];
  const lower = term.toLowerCase();
  return productList
    .filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.partNumber.toLowerCase().includes(lower),
    )
    .slice(0, limit)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      partNumber: p.partNumber,
      imageUrl: p.imageUrl,
      price: p.price,
    }));
}

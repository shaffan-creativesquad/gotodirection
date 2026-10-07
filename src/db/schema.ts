import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export type SpecGroup = {
  title: string;
  rows: { label: string; value: string }[];
};

export type OrderLine = {
  productId: number;
  slug: string;
  partNumber: string;
  title: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
};

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
  name: varchar("name", { length: 140 }).notNull(),
  tagline: varchar("tagline", { length: 240 }).notNull().default(""),
  description: text("description").notNull().default(""),
  imageUrl: varchar("image_url", { length: 300 }).notNull().default(""),
  icon: varchar("icon", { length: 16 }).notNull().default("📦"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const manufacturers = pgTable("manufacturers", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
  name: varchar("name", { length: 140 }).notNull(),
  blurb: varchar("blurb", { length: 300 }).notNull().default(""),
});

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 260 }).notNull(),
    partNumber: varchar("part_number", { length: 80 }).notNull(),
    title: text("title").notNull(),
    shortTitle: varchar("short_title", { length: 200 }).notNull().default(""),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
    manufacturerId: integer("manufacturer_id")
      .notNull()
      .references(() => manufacturers.id),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    listPrice: numeric("list_price", { precision: 10, scale: 2 }).notNull(),
    condition: varchar("condition", { length: 40 }).notNull().default("New"),
    availability: varchar("availability", { length: 40 })
      .notNull()
      .default("In Stock"),
    stock: integer("stock").notNull().default(10),
    upc: varchar("upc", { length: 40 }).notNull().default(""),
    warranty: varchar("warranty", { length: 120 })
      .notNull()
      .default("1 Year GotoDirect Warranty"),
    imageUrl: varchar("image_url", { length: 300 }).notNull(),
    overview: text("overview").notNull(),
    highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
    specs: jsonb("specs").$type<SpecGroup[]>().notNull().default([]),
    rating: numeric("rating", { precision: 2, scale: 1 }).notNull().default("4.8"),
    reviewCount: integer("review_count").notNull().default(12),
    isFeatured: boolean("is_featured").notNull().default(false),
    isBestSeller: boolean("is_best_seller").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [uniqueIndex("products_slug_idx").on(table.slug)],
);

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 64 }).notNull(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 32 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 60 }).notNull().default(""),
  company: varchar("company", { length: 180 }).notNull().default(""),
  address: varchar("address", { length: 240 }).notNull(),
  city: varchar("city", { length: 120 }).notNull(),
  state: varchar("state", { length: 120 }).notNull().default(""),
  postalCode: varchar("postal_code", { length: 40 }).notNull().default(""),
  country: varchar("country", { length: 120 }).notNull().default("United States"),
  notes: text("notes").notNull().default(""),
  paymentMethod: varchar("payment_method", { length: 60 })
    .notNull()
    .default("Credit Card"),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  shipping: numeric("shipping", { precision: 10, scale: 2 }).notNull(),
  tax: numeric("tax", { precision: 10, scale: 2 }).notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 40 }).notNull().default("Confirmed"),
  items: jsonb("items").$type<OrderLine[]>().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id, {
    onDelete: "set null",
  }),
  partNumber: varchar("part_number", { length: 80 }).notNull().default(""),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 60 }).notNull().default(""),
  company: varchar("company", { length: 180 }).notNull().default(""),
  quantity: integer("quantity").notNull().default(1),
  message: text("message").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 60 }).notNull().default(""),
  subject: varchar("subject", { length: 200 }).notNull().default(""),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

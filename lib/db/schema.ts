import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

// Categories table – one row per portfolio category (e.g. "Wedding", "Travel")
export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  coverImage: text("cover_image").notNull(), // URL shown on the portfolio grid
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Images table – individual photos inside a category
export const images = pgTable("images", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: text("url").notNull(),
  title: text("title"),
  description: text("description"),
  categorySlug: text("category_slug")
    .notNull()
    .references(() => categories.slug),
  width: integer("width"),
  height: integer("height"),
  isFeatured: boolean("is_featured").default(false), // show on homepage gallery
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

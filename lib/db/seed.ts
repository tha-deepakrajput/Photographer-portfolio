import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import fs from "fs";
import path from "path";
import { categories, images } from "./schema";
import { eq } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL is missing. Add it to .env.local");
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

async function seed() {
  console.log("🌱 Starting dynamic database seeding…");

  // ── 1. Insert categories ────────────────────────────────
  const categoryData = [
    {
      name: "Male Model",
      slug: "male-model",
      coverImage: "/images/portfolio/Male.jpg",
    },
    {
      name: "Female Modal",
      slug: "female-modal",
      coverImage: "/images/portfolio/Female.jpg",
    },
    {
      name: "Wedding",
      slug: "wedding",
      coverImage: "/images/portfolio/WeddingDp.JPG",
    },
    {
      name: "Travel",
      slug: "travel",
      coverImage: "/images/portfolio/TravelDp.JPG",
    },
    {
      name: "Potraits",
      slug: "potrait",
      coverImage: "/images/portfolio/Potrait.jpg", // Kept original spelling from categories
    },
  ];

  for (const cat of categoryData) {
    await db
      .insert(categories)
      .values(cat)
      .onConflictDoNothing({ target: categories.slug });
  }
  console.log(`  ✅ ${categoryData.length} categories inserted or verified.`);

  // ── 2. Insert Featured Gallery Images ───────────────────
  // These are your top 3 featured images shown on the root homepage
  const featuredImageData = [
    {
      url: "/images/Gallery/cover-1.jpg",
      title: "Gallery Cover 1",
      categorySlug: "potrait",
      isFeatured: true,
    },
    {
      url: "/images/Gallery/cover-2.jpg",
      title: "Gallery Cover 2",
      categorySlug: "wedding",
      isFeatured: true,
    },
    {
      url: "/images/Gallery/cover-3.jpg",
      title: "Gallery Cover 3",
      categorySlug: "travel",
      isFeatured: true,
    },
  ];

  for (const img of featuredImageData) {
    await db.insert(images).values(img).onConflictDoNothing();
  }
  console.log(`  ✅ ${featuredImageData.length} featured gallery images inserted.`);

  // ── 3. Scan Directories and Bulk Insert Portfolio Images ─
  let totalImagesInserted = 0;
  const portfolioBaseDir = path.join(process.cwd(), "public/images/portfolio");

  for (const cat of categoryData) {
    const categoryDir = path.join(portfolioBaseDir, cat.slug);
    
    // Check if the directory exists
    if (!fs.existsSync(categoryDir)) {
      console.warn(`  ⚠️ Directory not found: ${categoryDir}. Skipping.`);
      continue;
    }

    // Read all files in this category directory
    const files = fs.readdirSync(categoryDir);
    const validImages = files.filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

    for (const file of validImages) {
      const url = `/images/portfolio/${cat.slug}/${file}`;
      
      // Check if image is already in DB by url to prevent duplicates
      const existing = await db.select().from(images).where(eq(images.url, url)).limit(1);
      
      if (existing.length === 0) {
        await db.insert(images).values({
          url: url,
          title: file, // Default title to filename
          categorySlug: cat.slug,
          isFeatured: false,
        });
        totalImagesInserted++;
      }
    }
    console.log(`  📸 Found and processed ${validImages.length} images for category: ${cat.name}`);
  }

  console.log(`  ✅ Added ${totalImagesInserted} new dynamic portfolio images to DB.`);
  console.log("🎉 Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});

import { notFound } from "next/navigation";
import Lightbox from "@/components/Lightbox";
import { db } from "@/lib/db";
import { images } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const categoryImages = await db
    .select()
    .from(images)
    .where(eq(images.categorySlug, category))
    .orderBy(images.createdAt);

  if (!categoryImages.length) return notFound();

  // Extract just the URLs for the Lightbox component
  const imageUrls = categoryImages.map((img) => img.url);

  return (
    <main className="bg-black text-white pb-24">

      {/* HERO */}
      <section className="text-center pt-28 pb-20">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-widest uppercase">
          {category.replace(/-/g, " ")}
        </h1>
        <div className="w-24 h-px bg-white/40 mx-auto mt-6" />
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-6">
        <Lightbox images={imageUrls} />
      </section>

    </main>
  );
}

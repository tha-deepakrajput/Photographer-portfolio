import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { ne } from "drizzle-orm";

export default async function PortfolioPage() {
  const allCategories = await db
    .select()
    .from(categories)
    .where(ne(categories.slug, "featured-images"))
    .orderBy(categories.createdAt);

  return (
    <main className="min-h-screen pb-24 scroll-smooth">

      {/* ================= HERO ================= */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        
        <Image
          src="/images/PortfolioImage.jpg"
          alt="Portfolio Hero"
          fill
          priority
          sizes="100vw"
          unoptimized={true}
          className="object-cover opacity-40 animate-hero-zoom"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center px-6">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-widest animate-hero-title">
            Portfolio
          </h1>
          <p className="mt-4 text-white/70 animate-hero-subtitle">
            Select a collection
          </p>
        </div>
      </section>

      {/* ================= CATEGORY GRID ================= */}
      <section className="max-w-6xl mx-auto px-6 mt-20">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {allCategories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/portfolio/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl animate-gallery-item"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background Image */}
              <div className="relative h-88 sm:h-104 md:h-112">
                <Image
                  src={category.coverImage}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  unoptimized={true}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition duration-500" />
              </div>

              {/* Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-widest uppercase">
                  {category.name}
                </h2>
              </div>

            </Link>
          ))}
        </div>

      </section>

    </main>
  );
}

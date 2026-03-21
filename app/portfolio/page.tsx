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
    <main className="min-h-screen pb-32 scroll-smooth bg-[#0a0a0a]">

      {/* ================= HERO ================= */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/PortfolioImage.jpg"
          alt="Portfolio Hero"
          fill
          priority
          sizes="100vw"
          unoptimized={true}
          className="object-cover object-top opacity-40 animate-hero-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#0a0a0a]" />
        <div className="relative text-center px-6">
          <p className="text-xs tracking-[0.4em] text-white/40 uppercase mb-4">Collections</p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-widest animate-hero-title">
            Portfolio
          </h1>
          <div className="mt-5 w-16 h-px bg-white/30 mx-auto" />
          <p className="mt-5 text-white/50 text-sm tracking-widest uppercase animate-hero-subtitle">
            Select a collection to explore
          </p>
        </div>
      </section>

      {/* ================= CATEGORY GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-16">

        {/* Large alternating layout for first 2 + grid for rest */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {allCategories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/portfolio/${category.slug}`}
              className="group block animate-gallery-item"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* Card Wrapper with premium border */}
              <div className="relative overflow-hidden rounded-xl"
                style={{
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 48px rgba(0,0,0,0.6)",
                }}
              >
                {/* Image Container */}
                <div className="relative w-full overflow-hidden"
                  style={{ paddingBottom: "120%" }}
                >
                  <Image
                    src={category.coverImage}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    unoptimized={true}
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                    style={{ transformOrigin: "top center" }}
                  />

                  {/* Base gradient - always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Hover overlay — fades in */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Golden top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  {/* Corner accent brackets on hover */}
                  <div
                    className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/0 group-hover:border-white/60 transition-all duration-500 rounded-tl"
                  />
                  <div
                    className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/0 group-hover:border-white/60 transition-all duration-500 rounded-tr"
                  />
                  <div
                    className="absolute bottom-20 left-4 w-8 h-8 border-b border-l border-white/0 group-hover:border-white/60 transition-all duration-500 rounded-bl"
                  />
                  <div
                    className="absolute bottom-20 right-4 w-8 h-8 border-b border-r border-white/0 group-hover:border-white/60 transition-all duration-500 rounded-br"
                  />

                  {/* Bottom text block */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-10">
                    {/* Category count / label */}
                    <p className="text-[10px] tracking-[0.35em] text-white/40 uppercase mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                      Collection
                    </p>

                    {/* Name + arrow row */}
                    <div className="flex items-end justify-between">
                      <h2 className="font-serif text-2xl sm:text-3xl tracking-widest uppercase text-white leading-tight">
                        {category.name}
                      </h2>
                      <div className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 group-hover:border-white/60 group-hover:bg-white/10 transition-all duration-400 shrink-0 ml-3 mb-1">
                        <svg
                          className="w-4 h-4 text-white translate-x-0 group-hover:translate-x-0.5 transition-transform duration-300"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>

                    {/* Thin separator line */}
                    <div className="mt-3 w-8 h-px bg-white/30 group-hover:w-16 transition-all duration-500" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>

    </main>
  );
}

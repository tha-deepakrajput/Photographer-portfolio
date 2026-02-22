import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import { notFound } from "next/navigation";
import { portfolioMeta } from "../portfolio-data";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // 🔥 IMPORTANT: unwrap params
  const { category } = await params;

  const IMAGE_DIR = path.join(
    process.cwd(),
    `public/images/portfolio/${category}`
  );

  let files: string[];

  try {
    files = await fs.readdir(IMAGE_DIR);
  } catch {
    return notFound();
  }

  const images = files
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort();

  if (!images.length) return notFound();

  return (
    <main className="pb-24">

      {/* HERO */}
      <section className="relative text-center pt-28 pb-16">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-widest uppercase">
          {category}
        </h1>
      </section>

      {/* GALLERY */}
      <section className="
          max-w-7xl mx-auto px-6
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4
          gap-8 md:gap-12
      ">
        {images.map((file, index) => {
          const meta = portfolioMeta[file];

          return (
            <figure
              key={file}
              className="group animate-gallery-item"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl aspect-4/5">
                <Image
                  src={`/images/portfolio/${category}/${file}`}
                  alt={meta?.title ?? "Photography"}
                  fill
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
                    25vw
                  "
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-6">
                  <div>
                    {meta?.title && (
                      <h3 className="text-lg tracking-wide">
                        {meta.title}
                      </h3>
                    )}
                    {meta?.description && (
                      <p className="text-sm text-white/70 mt-1">
                        {meta.description}
                      </p>
                    )}
                  </div>
                </div>

              </div>
            </figure>
          );
        })}
      </section>

    </main>
  );
}
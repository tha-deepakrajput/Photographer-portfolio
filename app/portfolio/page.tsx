import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import { portfolioMeta } from "./portfolio-data";

const IMAGE_DIR = path.join(process.cwd(), "public/images/portfolio");

export default async function PortfolioPage() {
  const files = await fs.readdir(IMAGE_DIR);

  const images = files.filter((file) =>
    /\.(jpg|jpeg|png|webp)$/i.test(file)
  );

  return (
    <main className="px-6 pb-24">
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[55vh] flex items-center justify-center mb-24 overflow-hidden">
        {/* Background */}
        <Image
          src="/images/frontImage.jpg"
          alt="Portfolio cover"
          fill
          priority
          className="object-cover opacity-40 animate-hero-zoom"
        />

        <div className="relative text-center">
          <h1 className="text-5xl md:text-7xl font-serif tracking-wide animate-hero-title">
            Portfolio
          </h1>
          <p className="mt-4 text-white/80 text-lg animate-hero-subtitle">
            Moments • Stories • Light
          </p>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {images.map((file, index) => {
          const meta = portfolioMeta[file];

          return (
            <figure
              key={file}
              className="group animate-gallery-item"
              style={{
                animationDelay: `${index * 90}ms`,
              }}
            >
              {/* Image */}
              <div className="overflow-hidden">
                <Image
                  src={`/images/portfolio/${file}`}
                  alt={meta?.title ?? "Photography work"}
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Text */}
              {(meta?.title || meta?.description) && (
                <figcaption className="mt-4 space-y-1">
                  {meta?.title && (
                    <h3 className="text-lg font-medium tracking-wide">
                      {meta.title}
                    </h3>
                  )}
                  {meta?.description && (
                    <p className="text-sm text-white/70">
                      {meta.description}
                    </p>
                  )}
                </figcaption>
              )}
            </figure>
          );
        })}
      </section>
    </main>
  );
}

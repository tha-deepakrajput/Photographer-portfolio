import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import Lightbox from "@/components/Lightbox";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
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
    <main className="bg-black text-white pb-24">

      {/* HERO */}
      <section className="text-center pt-28 pb-20">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-widest uppercase">
          {category}
        </h1>
        <div className="w-24 h-px bg-white/40 mx-auto mt-6" />
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-6">
        <Lightbox images={images} category={category} />
      </section>

    </main>
  );
}

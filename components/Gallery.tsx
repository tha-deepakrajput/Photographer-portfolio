import Image from "next/image";

const images = [
  "/images/Gallery/cover-1.jpg",
  "/images/Gallery/cover-2.jpg",
  "/images/Gallery/cover-3.jpg",
];

export default function Gallery() {
  return (
    <section className="bg-black text-white py-20 sm:py-28 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-widest uppercase">
            Featured Work
          </h2>
          <div className="w-20 h-px bg-white/40 mx-auto mt-6"></div>
        </div>

        {/* Gallery Grid */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-10 md:gap-14
        ">
          {images.map((src, i) => (
            <div
              key={i}
              className="group transition duration-500 hover:-translate-y-2"
            >
              <div className="
                relative
                overflow-hidden
                rounded-2xl
                bg-neutral-900
                shadow-2xl
                shadow-black/60
              ">
                <div className="relative aspect-4/5">
                  <Image
                    src={src}
                    alt="portfolio"
                    fill
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) 50vw,
                      33vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-105
                    "
                    priority={i === 0}
                  />

                  {/* Elegant Gradient Overlay */}
                  <div className="
                    absolute inset-0
                    bg-linear-to-t
                    from-black/70
                    via-black/20
                    to-transparent
                    opacity-0
                    group-hover:opacity-100
                    transition duration-500
                  " />

                  {/* Subtle Hover Border Glow */}
                  <div className="
                    absolute inset-0
                    border border-white/0
                    group-hover:border-white/20
                    transition duration-500
                    rounded-2xl
                  " />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

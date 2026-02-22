import Image from "next/image";

const images = ["/images/p1.jpg", "/images/p2.jpg", "/images/p3.jpg"];

export default function Gallery() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="
        max-w-7xl mx-auto
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6 sm:gap-8 md:gap-10
      ">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden group aspect-4/5"
          >
            <Image
              src={src}
              alt="portfolio"
              fill
              sizes="(max-width: 640px) 100vw,
                     (max-width: 1024px) 50vw,
                     33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

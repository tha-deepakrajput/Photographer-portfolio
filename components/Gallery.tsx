import Image from "next/image";

const images = ["/images/p1.jpg", "/images/p2.jpg", "/images/p3.jpg"];

export default function Gallery() {
  return (
    <section className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {images.map((src, i) => (
        <div key={i} className="overflow-hidden">
          <Image
            src={src}
            alt="portfolio"
            width={600}
            height={800}
            className="hover:scale-110 transition"
          />
        </div>
      ))}
    </section>
  );
}

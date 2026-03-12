"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "/images/Gallery/cover-1.jpg",
  "/images/Gallery/cover-2.jpg",
  "/images/Gallery/cover-3.jpg",
];

export default function ImageSection() {
  return (
    <section className="bg-neutral-950 py-20 px-6">
      <h2 className="text-center text-3xl md:text-5xl font-serif mb-14">
        Photography
      </h2>

      <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {images.map((src, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="relative h-87.5 rounded-xl overflow-hidden"
          >
            <Image
              src={src}
              alt="Portfolio image"
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
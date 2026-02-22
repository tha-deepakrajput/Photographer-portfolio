"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface LightboxProps {
  images: string[];
  category: string;
}

export default function Lightbox({ images, category }: LightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);

  const next = () =>
    setActiveIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );

  const prev = () =>
    setActiveIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );

  // Keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  return (
    <>
      {/* MASONRY GRID */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
        {images.map((file, index) => (
          <div
            key={file}
            className="break-inside-avoid cursor-pointer group"
            onClick={() => setActiveIndex(index)}
          >
            <div className="overflow-hidden rounded-xl bg-neutral-900 shadow-xl shadow-black/40">
              <Image
                src={`/images/portfolio/${category}/${file}`}
                alt="preview"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN MODAL */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ✕
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-6 text-white text-5xl"
          >
            ‹
          </button>

          {/* FULL IMAGE */}
          <div
            className="relative max-w-[95vw] max-h-[90vh] w-auto h-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/images/portfolio/${category}/${images[activeIndex]}`}
              alt="Full Preview"
              width={0}
              height={0}
              sizes="100vw"
              className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain"
              priority
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-6 text-white text-5xl"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}

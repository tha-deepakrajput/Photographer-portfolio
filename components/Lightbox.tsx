"use client";

import { CldImage } from "next-cloudinary";
import { useState, useEffect } from "react";

interface LightboxProps {
  images: string[]; // Full URLs now (e.g. "/images/portfolio/wedding/photo1.jpg" or external URLs)
}

export default function Lightbox({ images }: LightboxProps) {
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
  });

  return (
    <>
      {/* MASONRY GRID */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="break-inside-avoid cursor-pointer group"
            onClick={() => setActiveIndex(index)}
          >
            <div className="overflow-hidden rounded-xl bg-neutral-900 shadow-xl shadow-black/40 relative">
              <CldImage
                src={src}
                alt="preview"
                width={800}
                height={800}
                preserveTransformations
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
            <CldImage
              src={images[activeIndex]}
              alt="Full Preview"
              width={1920}
              height={1920}
              preserveTransformations
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

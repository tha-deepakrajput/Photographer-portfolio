"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* ===== BACKGROUND IMAGE (CINEMATIC ZOOM) ===== */}
      <motion.div
        className="absolute inset-0 bg-[url('/images/photographer.jpg')] bg-cover bg-center"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />

      {/* ===== GRADIENT OVERLAY ===== */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/80" />

      {/* ===== CONTENT ===== */}
      <motion.div
        className="relative z-10 text-center max-w-2xl px-8 py-14 bg-black/40 backdrop-blur-md border border-white/20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.25,
            },
          },
        }}
      >
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-semibold tracking-widest"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Feel Amann
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-lg text-white/80 leading-relaxed"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Capturing stories through light, emotion, and timeless moments
        </motion.p>

        {/* CTA */}
        <motion.a
          href="/portfolio"
          className="inline-block mt-10 px-10 py-4 border border-white tracking-wide transition"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#ffffff",
            color: "#000000",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Visit Portfolio & Book a Shoot 🥹
        </motion.a>
      </motion.div>
    </section>
  );
}

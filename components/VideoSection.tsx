"use client";

import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <>
      <section className="relative min-h-svh flex items-center justify-center overflow-hidden">
        {/* ===== BACKGROUND VIDEO ===== */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/Videos/Video-1.mp4" // put your video inside public/videos
          autoPlay
          muted
          loop
          playsInline
        />

        {/* ===== DARK OVERLAY ===== */}
        <div className="absolute inset-0 bg-black/60" />

        {/* ===== CONTENT ===== */}
        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-wider">
            Cinematic Stories
          </h2>

          <p className="mt-6 text-white/80 max-w-xl mx-auto">
            Experience moments through motion and emotion
          </p>
        </motion.div>
      </section>
      <section className="relative min-h-svh flex items-center justify-center overflow-hidden">
        {/* ===== BACKGROUND VIDEO ===== */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/Videos/Video-3.mp4" // put your video inside public/videos
          autoPlay
          muted
          loop
          playsInline
        />

        {/* ===== DARK OVERLAY ===== */}
        <div className="absolute inset-0 bg-black/60" />

        {/* ===== CONTENT ===== */}
        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-wider">
            Moments in Motion
          </h2>

          <p className="mt-6 text-white/80 max-w-xl mx-auto">
            Where emotion meets timeless elegance
          </p>
        </motion.div>
      </section>
    </>
  );
}

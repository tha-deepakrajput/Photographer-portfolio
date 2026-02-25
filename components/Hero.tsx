"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Linkedin, Facebook, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden">

      {/* ===== BACKGROUND IMAGE ===== */}
      <motion.div
        className="absolute inset-0 bg-[url('/images/Photographer.jpg')] bg-cover bg-center"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
      />

      {/* ===== DARK OVERLAY ===== */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/90" />

      {/* ===== CONTENT WRAPPER ===== */}
      <motion.div
        className="
          relative z-10
          w-[92%] sm:w-[85%] md:w-[70%] lg:w-[55%]
          max-w-4xl
          px-6 sm:px-10 lg:px-14
          py-10 sm:py-14 lg:py-16
          text-center
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          rounded-2xl
          shadow-2xl
        "
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.25 } },
        }}
      >

        {/* TITLE */}
        <motion.h1
          className="
            font-serif
            font-medium
            tracking-[0.2em]
            leading-tight
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
          "
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1 }}
        >
          Feel Amann
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          className="
            mt-6
            text-sm sm:text-base md:text-lg lg:text-xl
            text-white/80
            leading-relaxed
            max-w-2xl mx-auto
          "
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.9 }}
        >
          Capturing stories through light, emotion, and timeless moments
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-10"
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.9 }}
        >
          <Link
            href="/portfolio"
            className="
              inline-block
              px-8 py-4
              text-sm tracking-wider
              border border-white/70
              rounded-full
              transition-all duration-500
              hover:bg-white hover:text-black
              hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]
            "
          >
            Visit Portfolio & Book a Shoot
          </Link>
        </motion.div>

        {/* ===== SOCIAL ICONS ===== */}
        <motion.div
          className="mt-12 flex justify-center gap-6"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1 }}
        >
          {/* Instagram */}
          <a
            href="https://instagram.com/feel_amann_"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-linear-to-tr from-pink-500 via-red-500 to-yellow-500 hover:scale-110 transition duration-300 shadow-lg"
          >
            <Instagram className="text-white" size={20} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#0A66C2] hover:scale-110 transition duration-300 shadow-lg"
          >
            <Linkedin className="text-white" size={20} />
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#1877F2] hover:scale-110 transition duration-300 shadow-lg"
          >
            <Facebook className="text-white" size={20} />
          </a>

          {/* Email */}
          <a
            href="mailto:youremail@example.com"
            className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 hover:scale-110 transition duration-300 shadow-lg"
          >
            <Mail className="text-white" size={20} />
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Linkedin, Facebook, Mail } from "lucide-react";
import { FaBehance } from "react-icons/fa";
import { JSX } from "react";

export default function Hero(): JSX.Element {
  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden bg-black text-white">

      {/* ===== BACKGROUND VIDEO ===== */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/images/Videos/Video-2.mp4" type="video/mp4" />
      </video>

      {/* ===== LIGHT OVERLAY (Less Dark for Clear Video) ===== */}
      <div className="absolute inset-0 bg-black/40" />

      {/* ===== MAIN CONTENT ===== */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* TITLE */}
        <h1
          className="
            font-serif
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            tracking-[0.3em]
            font-semibold
            drop-shadow-[0_5px_25px_rgba(0,0,0,0.7)]
          "
        >
          Feel Amann
        </h1>

        {/* SUBTITLE */}
        <p
          className="
            mt-6
            text-base sm:text-lg md:text-xl
            text-white/85
            max-w-2xl mx-auto
            leading-relaxed
            drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]
          "
        >
          Capturing stories through motion, emotion, and timeless frames.
        </p>

        {/* CTA BUTTON */}
        <div className="mt-10">
          <Link
            href="/portfolio"
            className="
              inline-block
              px-10 py-4
              rounded-full
              bg-white text-black
              font-medium
              tracking-wider
              hover:scale-105
              hover:bg-gray-200
              transition duration-500
              shadow-2xl
            "
          >
            View Portfolio
          </Link>
        </div>
      </motion.div>

      {/* ===== SOCIAL MEDIA (BOTTOM LEFT VERTICAL) ===== */}
      <div className="absolute left-6 bottom-35 z-20 flex flex-col gap-4">
        <a
          href="https://instagram.com/feel_amann_"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition duration-300"
        >
          <Instagram size={22} />
        </a>

        <a
          href="https://www.behance.net/tarunrajput15"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition duration-300"
        >
          <FaBehance size={22} />
        </a>

        <a
          href="https://www.linkedin.com/in/aman-singh-620229334/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition duration-300"
        >
          <Linkedin size={22} />
        </a>

        <a
          href="mailto:Feelphotography8368@gmail.com"
          className="hover:scale-110 transition duration-300"
        >
          <Mail size={22} />
        </a>
      </div>

      {/* ===== SIDE DECORATIVE LINE (Premium Touch) ===== */}
      <div className="absolute left-9 bottom-32 h-24 w-[1px] bg-white/40" />

    </section>
  );
}

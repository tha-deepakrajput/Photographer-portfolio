"use client";

import { useState } from "react";
import Link from "next/link";
import { Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const logoFont = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-md">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* ===== LOGO ===== */}
        <Link href="/" className="group">
          <div className={`flex flex-col leading-none ${logoFont.className}`}>
            <span className="text-lg tracking-[0.35em] uppercase">
              Feel
            </span>
            <span className="text-xl sm:text-2xl tracking-[0.15em] font-bold">
              Amann
            </span>
            <span className="mt-1 h-0.5 w-8 bg-white transition-all duration-300 group-hover:w-14" />
          </div>
        </Link>

        {/* ===== DESKTOP LINKS ===== */}
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest">
          <Link href="/portfolio" className="hover:text-white/70 transition">
            Portfolio
          </Link>
          <Link href="/about" className="hover:text-white/70 transition">
            About
          </Link>
          <Link href="/services" className="hover:text-white/70 transition">
            Services
          </Link>
          <Link href="/contact" className="hover:text-white/70 transition">
            Contact
          </Link>
        </div>

        {/* ===== MOBILE MENU BUTTON ===== */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-between w-6 h-5"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-full bg-white"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="h-0.5 w-full bg-white"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-full bg-white"
          />
        </button>
      </div>

      {/* ===== MOBILE MENU PANEL ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-lg"
          >
            <div className="flex flex-col items-center space-y-8 py-16 text-lg uppercase tracking-widest">
              <Link href="/portfolio" onClick={() => setIsOpen(false)}>
                Portfolio
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link href="/services" onClick={() => setIsOpen(false)}>
                Services
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { submitContact } from "./actions";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen pt-24 sm:pt-28 overflow-hidden text-white">

      {/* ===== PREMIUM BACKGROUND IMAGE ===== */}
      <Image
        src="/images/hero.jpg"
        alt="Contact background"
        fill
        priority
        className="object-cover scale-110"
      />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/80 to-black/95" />

      {/* Subtle Animated Glow */}
      <div className="absolute -top-32 -left-32 w-100 h-100 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-87.5 h-87.5 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />

      {/* ===== CONTENT WRAPPER ===== */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative px-5 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        {/* ===== HEADING ===== */}
        <div className="text-center mb-14 sm:mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-wide"
          >
            Let’s Work Together
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-6 text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed"
          >
            Share your vision, your story, and your ideas.
            I’ll craft something timeless and cinematic for you.
          </motion.p>
        </div>

        {/* ===== FORM CARD ===== */}
        <motion.form
          action={submitContact}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 sm:p-12 md:p-14 space-y-6 shadow-[0_0_80px_rgba(255,255,255,0.06)]"
        >
          {["name", "email", "shootType"].map((field, index) => (
            <motion.input
              key={field}
              name={field}
              type={field === "email" ? "email" : "text"}
              required={field !== "shootType"}
              placeholder={
                field === "shootType"
                  ? "Type of Shoot (Wedding, Portrait, etc.)"
                  : field === "name"
                  ? "Your Name"
                  : "Email Address"
              }
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full bg-transparent border border-white/25 rounded-lg px-4 py-3 text-sm sm:text-base placeholder-white/40 focus:border-white focus:ring-1 focus:ring-white outline-none transition-all duration-300"
            />
          ))}

          <motion.textarea
            name="message"
            required
            rows={5}
            placeholder="Tell me about your project"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full bg-transparent border border-white/25 rounded-lg px-4 py-3 text-sm sm:text-base placeholder-white/40 focus:border-white focus:ring-1 focus:ring-white outline-none resize-none transition-all duration-300"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full border border-white rounded-full py-3 tracking-widest uppercase text-sm hover:bg-white hover:text-black transition-all duration-300"
          >
            Send Inquiry
          </motion.button>
        </motion.form>

        {/* ===== DIRECT CONTACT ===== */}
        <p className="text-center text-white/60 mt-10 text-sm sm:text-base">
          Or email directly at{" "}
          <a
            href="mailto:feelamann@gmail.com"
            className="text-white hover:underline"
          >
            feelamann@gmail.com
          </a>
        </p>

        {/* ===== SOCIAL LINKS ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-6 mt-12"
        >
          <a
            href="https://instagram.com/feel_amann_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:scale-125 transition-transform duration-300"
          >
            <FaInstagram size={28} />
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:scale-125 transition-transform duration-300"
          >
            <FaLinkedin size={28} />
          </a>

          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:scale-125 transition-transform duration-300"
          >
            <FaFacebook size={28} />
          </a>

          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:scale-125 transition-transform duration-300"
          >
            <FaTwitter size={28} />
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
}

import Image from "next/image";
import { submitContact } from "./actions";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen pt-24 sm:pt-28 overflow-hidden">

      {/* ===== BACKGROUND ===== */}
      <Image
        src="/images/hero.jpg"
        alt="Contact background"
        fill
        priority
        className="object-cover opacity-25"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/80 to-black/95" />

      {/* ===== CONTENT ===== */}
      <div className="
        relative
        px-5 sm:px-6 lg:px-8
        max-w-5xl
        mx-auto
        animate-fade-in
      ">

        {/* ===== HEADING ===== */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-semibold
            tracking-wide
          ">
            Let’s Work Together
          </h1>

          <p className="
            mt-4
            text-sm
            sm:text-base
            text-white/70
            max-w-xl
            mx-auto
            leading-relaxed
          ">
            Share your vision, your story, and your ideas.
            I’ll craft something timeless for you.
          </p>
        </div>

        {/* ===== FORM CARD ===== */}
        <form
          action={submitContact}
          className="
            bg-black/40
            backdrop-blur-xl
            border border-white/15
            rounded-3xl
            p-6 sm:p-10 md:p-14
            space-y-6
            shadow-[0_0_60px_rgba(255,255,255,0.05)]
            transition-all
          "
        >
          {/* Name */}
          <input
            name="name"
            required
            placeholder="Your Name"
            className="
              w-full
              bg-transparent
              border border-white/25
              rounded-lg
              px-4 py-3
              text-sm sm:text-base
              placeholder-white/40
              focus:border-white
              focus:ring-1 focus:ring-white
              outline-none
              transition
            "
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            required
            placeholder="Email Address"
            className="
              w-full
              bg-transparent
              border border-white/25
              rounded-lg
              px-4 py-3
              text-sm sm:text-base
              placeholder-white/40
              focus:border-white
              focus:ring-1 focus:ring-white
              outline-none
              transition
            "
          />

          {/* Shoot Type */}
          <input
            name="shootType"
            placeholder="Type of Shoot (Wedding, Portrait, etc.)"
            className="
              w-full
              bg-transparent
              border border-white/25
              rounded-lg
              px-4 py-3
              text-sm sm:text-base
              placeholder-white/40
              focus:border-white
              focus:ring-1 focus:ring-white
              outline-none
              transition
            "
          />

          {/* Message */}
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell me about your project"
            className="
              w-full
              bg-transparent
              border border-white/25
              rounded-lg
              px-4 py-3
              text-sm sm:text-base
              placeholder-white/40
              focus:border-white
              focus:ring-1 focus:ring-white
              outline-none
              transition
              resize-none
            "
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="
              w-full
              border border-white
              rounded-full
              py-3
              tracking-widest
              uppercase
              text-sm
              hover:bg-white
              hover:text-black
              transition-all
              duration-300
            "
          >
            Send Inquiry
          </button>
        </form>

        {/* ===== DIRECT CONTACT ===== */}
        <p className="
          text-center
          text-white/60
          mt-8 sm:mt-10
          text-sm sm:text-base
        ">
          Or email directly at{" "}
          <a
            href="mailto:feelamann@gmail.com"
            className="text-white hover:underline"
          >
            feelamann@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}

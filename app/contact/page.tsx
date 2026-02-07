import Image from "next/image";
import { submitContact } from "./actions";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero.jpg"
        alt="Contact background"
        fill
        priority
        className="object-cover opacity-30"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/90" />

      {/* Content */}
      <div className="relative px-6 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl font-semibold mb-10 text-center">
          Let’s Work Together
        </h1>

        {/* Contact Form */}
        <form
          action={submitContact}
          className="space-y-6 bg-black/50 backdrop-blur-md border border-white/20 p-8 md:p-12 animate-fade-in"
        >
          <input
            name="name"
            required
            placeholder="Your Name"
            className="w-full bg-transparent border border-white/30 px-4 py-3 outline-none placeholder-white/50"
          />

          <input
            name="email"
            type="email"
            required
            placeholder="Email Address"
            className="w-full bg-transparent border border-white/30 px-4 py-3 outline-none placeholder-white/50"
          />

          <input
            name="shootType"
            placeholder="Type of Shoot (Wedding, Portrait, etc.)"
            className="w-full bg-transparent border border-white/30 px-4 py-3 outline-none placeholder-white/50"
          />

          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell me about your project"
            className="w-full bg-transparent border border-white/30 px-4 py-3 outline-none placeholder-white/50"
          />

          <button
            className="w-full border px-8 py-3 tracking-widest uppercase hover:bg-white hover:text-black transition"
          >
            Send Inquiry
          </button>
        </form>

        {/* Direct Contact Info */}
        <p className="text-center text-white/60 mt-8 animate-fade-in">
          Or email me directly at{" "}
          <strong className="text-white">
            feelamann@gmail.com
          </strong>
        </p>
      </div>
    </main>
  );
}

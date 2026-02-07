import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <Image
        src="/images/hero.jpg"
        alt="About background"
        fill
        priority
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <section className="relative max-w-6xl mx-auto px-6 py-24">
        {/* Heading */}
        <div className="mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-serif tracking-wide">
            About Me
          </h1>
          <p className="mt-4 text-white/70 max-w-xl">
            A visual storyteller driven by emotion, light, and authenticity.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Portrait Image */}
          <div className="relative animate-image-reveal">
            <Image
              src="/images/portfolio/fashion-01.jpg"
              alt="Photographer portrait"
              width={600}
              height={750}
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div className="space-y-6 text-lg leading-relaxed text-white/90 animate-slide-in-right">
            <p>
              I’m <strong>Alex Morgan</strong>, a professional photographer with
              over 8 years of experience capturing weddings, portraits, fashion,
              and travel stories.
            </p>

            <p>
              My work is rooted in observing real moments — subtle expressions,
              natural light, and honest emotions. I aim to create imagery that
              feels cinematic yet deeply personal.
            </p>

            <p>
              From intimate weddings to global brands, I collaborate with
              people who value authenticity, storytelling, and timeless visual
              identity.
            </p>

            <p className="text-white/60 italic">
              “Photography is not just about what you see — it’s about what you
              feel.”
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

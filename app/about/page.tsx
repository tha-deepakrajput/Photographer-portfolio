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
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <section className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">

        {/* Heading */}
        <div className="mb-14 sm:mb-20 text-center md:text-left animate-slide-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-wide">
            About Me
          </h1>
          <p className="mt-4 text-white/70 max-w-xl mx-auto md:mx-0 text-sm sm:text-base">
            A visual storyteller driven by emotion, light, and authenticity.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Portrait Image */}
          <div className="relative w-full max-w-md sm:max-w-lg mx-auto md:mx-0 animate-image-reveal">
            <Image
              src="/images/portfolio/fashion-01.jpg"
              alt="Photographer portrait"
              width={600}
              height={750}
              className="object-cover rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-white/90 animate-slide-in-right">

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

            <p className="text-white/60 italic text-sm sm:text-base">
              “Photography is not just about what you see — it’s about what you
              feel.”
            </p>

          </div>
        </div>
      </section>
    </main>
  );
}

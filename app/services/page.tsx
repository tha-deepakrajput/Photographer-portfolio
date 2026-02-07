import Image from "next/image";

const services = [
  {
    title: "Wedding Photography",
    description:
      "Full-day wedding coverage capturing every emotion, detail, and moment.",
  },
  {
    title: "Portrait Sessions",
    description:
      "Personal, couple, and lifestyle portraits with natural lighting.",
  },
  {
    title: "Brand & Commercial",
    description:
      "Professional photography for brands, startups, and marketing campaigns.",
  },
  {
    title: "Travel & Editorial",
    description:
      "Story-driven travel and editorial photography for publications.",
  },
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pb-24">
      {/* ===== BACKGROUND SPLAT / GLOW ===== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[900px] h-[550px] animate-slow-float opacity-25">
          <Image
            src="/images/serviceImage.jpg"
            alt="Background texture"
            fill
            className="object-cover rounded-[45%]"
            priority
          />
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-wide animate-services-title">
            Services
          </h1>
          <p className="mt-4 text-white/70 max-w-xl mx-auto animate-services-subtitle">
            Thoughtfully crafted photography experiences, designed to tell
            stories that last a lifetime.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group service-card bg-black/50 backdrop-blur-md border border-white/20 p-10 transition-all duration-500 hover:border-white hover:-translate-y-2`}
              style={{
                animationDelay: `${index * 120}ms`,
              }}
            >
              <h2 className="text-2xl mb-4 tracking-wide">
                {service.title}
              </h2>
              <p className="text-white/80 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

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
    <main className="relative min-h-screen overflow-hidden pb-20 sm:pb-24">

      {/* ===== BACKGROUND GLOW ===== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="
          relative
          w-125 h-80
          sm:w-162.5 sm:h-100
          md:w-200 md:h-120
          lg:w-225 lg:h-137.5
          opacity-20 sm:opacity-25
          animate-slow-float
        ">
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
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* ===== HEADING ===== */}
        <div className="text-center mt-16 sm:mt-20 md:mt-24 mb-14 sm:mb-20">
          <h1 className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-semibold
            tracking-wide
            animate-services-title
          ">
            Services
          </h1>

          <p className="
            mt-4
            text-sm
            sm:text-base
            md:text-lg
            text-white/70
            max-w-xl
            mx-auto
            leading-relaxed
            animate-services-subtitle
          ">
            Thoughtfully crafted photography experiences, designed to tell
            stories that last a lifetime.
          </p>
        </div>

        {/* ===== SERVICES GRID ===== */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-6
          sm:gap-8
          md:gap-10
        ">
          {services.map((service, index) => (
            <div
              key={index}
              className="
                group
                bg-black/50
                backdrop-blur-md
                border border-white/20
                rounded-2xl
                p-6 sm:p-8 md:p-10
                transition-all duration-500
                hover:border-white
                hover:-translate-y-2
              "
              style={{
                animationDelay: `${index * 120}ms`,
              }}
            >
              <h2 className="
                text-xl
                sm:text-2xl
                mb-3 sm:mb-4
                tracking-wide
              ">
                {service.title}
              </h2>

              <p className="
                text-sm
                sm:text-base
                text-white/80
                leading-relaxed
              ">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

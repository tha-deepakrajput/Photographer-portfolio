import Link from "next/link";
import { Cinzel } from "next/font/google";

const logoFont = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 flex justify-between items-center p-6 bg-black/70 backdrop-blur-md">
      {/* LOGO */}
      <Link href="/" className="group">
        <div className={`flex flex-col leading-none ${logoFont.className}`}>
          <span className="text-xl tracking-[0.35em] uppercase">
            Feel
          </span>
          <span className="text-2xl tracking-[0.15em] font-bold">
            Amann
          </span>

          {/* Accent line */}
          <span className="mt-1 h-0.5 w-10 bg-white transition-all duration-300 group-hover:w-16" />
        </div>
      </Link>

      {/* NAV LINKS */}
      <div className="space-x-6 text-sm uppercase tracking-widest">
        <Link href="/portfolio" className="hover:text-white/70">
          Portfolio
        </Link>
        <Link href="/about" className="hover:text-white/70">
          About
        </Link>
        <Link href="/services" className="hover:text-white/70">
          Services
        </Link>
        <Link href="/contact" className="hover:text-white/70">
          Contact
        </Link>
      </div>
    </nav>
  );
}

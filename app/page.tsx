export const dynamic = "force-dynamic";

import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Testimonial from "@/components/Testimonial";
import VideoSection from "@/components/VideoSection";

export default function Home() {
  return (
    <main>
      <Hero />           {/* Second - Your original image hero */}
      <VideoSection />   {/* First - Video */}
      <Gallery />
      <Testimonial />
    </main>
  );
}

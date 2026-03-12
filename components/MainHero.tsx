import VideoSection from "@/components/VideoSection";
import Hero from "@/components/Hero";
import ImageSection from "@/components/ImageSection";

export default function Home() {
  return (
    <>
      <VideoSection />   {/* First - Video */}
      <Hero />           {/* Second - Your original image hero */}
      <ImageSection />   {/* Third - Images grid */}
    </>
  );
}
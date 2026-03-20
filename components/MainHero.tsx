export const dynamic = "force-dynamic";

import VideoSection from "@/components/VideoSection";
import Hero from "@/components/Hero";
import ImageSection from "@/components/ImageSection";
import { db } from "@/lib/db";
import { images } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  const featuredImages = await db
    .select({ url: images.url, title: images.title })
    .from(images)
    .where(eq(images.isFeatured, true))
    .orderBy(images.createdAt)
    .limit(4);

  // Fallback to first 4 images if no featured ones exist
  const sectionImages =
    featuredImages.length > 0
      ? featuredImages
      : await db
          .select({ url: images.url, title: images.title })
          .from(images)
          .orderBy(images.createdAt)
          .limit(4);

  return (
    <>
      <VideoSection />   {/* First - Video */}
      <Hero />           {/* Second - Your original image hero */}
      <ImageSection images={sectionImages} />   {/* Third - Images grid */}
    </>
  );
}
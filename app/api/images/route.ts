export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { images } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  try {
    let result;

    if (category) {
      result = await db
        .select()
        .from(images)
        .where(eq(images.categorySlug, category))
        .orderBy(images.createdAt);
    } else if (featured === "true") {
      result = await db
        .select()
        .from(images)
        .where(eq(images.isFeatured, true))
        .orderBy(images.createdAt);
    } else {
      result = await db.select().from(images).orderBy(images.createdAt);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

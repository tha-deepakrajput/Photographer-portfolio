"use server";

import { loginAdmin, logoutAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function handleLogin(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin"; 

  if (password === adminPassword) {
    await loginAdmin();
    redirect("/admin/dashboard");
  } else {
    return { error: "Invalid password." };
  }
}

export async function handleLogout() {
  await logoutAdmin();
  redirect("/admin/login");
}

import { db } from "@/lib/db";
import { images } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq, inArray } from "drizzle-orm";

export async function saveUploadedImage(url: string, categorySlug: string, isFeatured: boolean) {
  await db.insert(images).values({
    url,
    categorySlug,
    isFeatured,
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${categorySlug}`);
}

export async function deleteImage(id: string) {
  // Find the image URL before deleting
  const imageRecords = await db.select().from(images).where(eq(images.id, id)).limit(1);
  if (imageRecords.length > 0) {
    const url = imageRecords[0].url;
    // Extract public ID from Cloudinary URL
    const parts = url.split("/upload/");
    if (parts.length >= 2) {
      const afterUpload = parts[1];
      const match = afterUpload.match(/^v\d+\/(.+)\.[a-zA-Z0-9]+$/);
      const publicId = match ? match[1] : afterUpload.split(".")[0];
      
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Failed to delete image from Cloudinary:", err);
      }
    }
  }

  await db.delete(images).where(eq(images.id, id));
  revalidatePath("/admin/dashboard");
  revalidatePath("/");
  revalidatePath("/portfolio");
}

export async function bulkDeleteImages(ids: string[]) {
  if (!ids || ids.length === 0) return;

  const imageRecords = await db.select().from(images).where(inArray(images.id, ids));
  
  const publicIds = imageRecords.map(img => {
    const parts = img.url.split("/upload/");
    if (parts.length >= 2) {
      const match = parts[1].match(/^v\d+\/(.+)\.[a-zA-Z0-9]+$/);
      return match ? match[1] : parts[1].split(".")[0];
    }
    return null;
  }).filter(Boolean) as string[];

  if (publicIds.length > 0) {
    try {
      await cloudinary.api.delete_resources(publicIds);
    } catch (err) {
      console.error("Failed bulk delete from Cloudinary:", err);
    }
  }

  await db.delete(images).where(inArray(images.id, ids));
  
  revalidatePath("/admin/dashboard");
  revalidatePath("/");
  revalidatePath("/portfolio");
}

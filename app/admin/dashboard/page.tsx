export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { categories, images } from "@/lib/db/schema";
import DashboardClient from "./DashboardClient";
// removed desc import
import { handleLogout } from "@/app/admin/actions";

export default async function AdminDashboardPage() {
  // Fetch all categories for the dropdown
  const allCategories = await db.select().from(categories);
  
  // Fetch all images latest first
  const allImages = await db.select().from(images).orderBy(images.createdAt);

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-light tracking-widest uppercase">Admin Panel</h1>
          <form action={handleLogout}>
            <button className="text-sm border border-neutral-700 hover:bg-neutral-800 px-4 py-2 rounded-lg transition">
              Logout
            </button>
          </form>
        </header>

        <DashboardClient categories={allCategories} images={allImages} />
      </div>
    </div>
  );
}

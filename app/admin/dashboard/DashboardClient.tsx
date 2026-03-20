"use client";

import { useState, useRef, useEffect } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { saveUploadedImage, deleteImage, bulkDeleteImages } from "@/app/admin/actions";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface DBImage {
  id: string;
  url: string;
  title: string | null;
  categorySlug: string;
  isFeatured: boolean | null;
  createdAt: Date | null;
}

export default function DashboardClient({
  categories,
  images,
}: {
  categories: Category[];
  images: DBImage[];
}) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.slug || "");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [failedUploads, setFailedUploads] = useState<{ url: string; categorySlug: string; isFeatured: boolean }[]>([]);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  // Use refs to prevent stale closure in Cloudinary onSuccess callback
  const selectedCategoryRef = useRef(selectedCategory);
  const isFeaturedRef = useRef(isFeatured);

  useEffect(() => {
    selectedCategoryRef.current = selectedCategory;
    isFeaturedRef.current = isFeatured;
  }, [selectedCategory, isFeatured]);

  // Handle bulk uploads sequentially to prevent database connection exhaustion
  const uploadQueue = useRef<{ url: string; categorySlug: string; isFeatured: boolean }[]>([]);
  const isProcessingQueue = useRef(false);

  const processQueue = async () => {
    if (isProcessingQueue.current) return;
    isProcessingQueue.current = true;
    setIsUploading(true);

    while (uploadQueue.current.length > 0) {
      const uploadItem = uploadQueue.current.shift();
      if (uploadItem) {
        try {
          await saveUploadedImage(uploadItem.url, uploadItem.categorySlug, uploadItem.isFeatured);
        } catch (e) {
          console.error("Failed to save image to DB:", e);
          setFailedUploads(prev => [...prev, uploadItem]);
          alert("A database connection error occurred. The image was saved to Cloudinary but failed to save to the database. You can retry it below.");
        }
      }
    }

    isProcessingQueue.current = false;
    setIsUploading(false);
  };

  return (
    <div className="space-y-16">
      {/* UPLOAD SECTION */}
      <section className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
        <h2 className="text-2xl font-light mb-6">Upload New Image</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-white transition"
              >
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="featured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-5 h-5 rounded border-neutral-700 bg-black text-white focus:ring-1 focus:ring-white"
              />
              <label htmlFor="featured" className="text-sm text-neutral-300">
                Mark as Featured (Show on Homepage)
              </label>
            </div>
          </div>

          <div>
            <CldUploadWidget
              uploadPreset="ml_default" // Use an unsigned upload preset from Cloudinary here
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onSuccess={(result: any) => {
                const url = result?.info?.secure_url;
                if (url) {
                  uploadQueue.current.push({
                    url,
                    categorySlug: selectedCategoryRef.current,
                    isFeatured: isFeaturedRef.current
                  });
                  processQueue();
                }
              }}
            >
              {({ open }) => (
                <button
                  onClick={() => open()}
                  disabled={isUploading || !selectedCategory}
                  className="w-full bg-white text-black py-4 rounded-lg font-medium hover:bg-neutral-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? "Uploading..." : "Select & Upload Image"}
                </button>
              )}
            </CldUploadWidget>
          </div>
        </div>
      </section>

      {/* FAILED UPLOADS SECTION */}
      {failedUploads.length > 0 && (
        <section className="bg-red-950/30 border border-red-900/50 p-8 rounded-2xl">
          <h2 className="text-2xl font-light mb-4 text-red-400">Failed Uploads ({failedUploads.length})</h2>
          <p className="text-sm text-red-300/80 mb-8">
            These images uploaded to Cloudinary successfully but failed to save to your database due to a connection timeout. 
            Click Retry to attempt saving them again.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {failedUploads.map((failed, idx) => (
              <div key={idx} className="relative aspect-square bg-neutral-900 rounded-xl overflow-hidden shadow-lg border border-red-800/50 group">
                <CldImage
                  src={failed.url}
                  alt="Failed upload"
                  fill
                  className="object-cover opacity-50 group-hover:opacity-30 transition"
                  sizes="200px"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition">
                  <span className="text-[10px] text-white/70 mb-2 truncate w-full text-center">{failed.categorySlug}</span>
                  <button
                    onClick={async () => {
                      try {
                        await saveUploadedImage(failed.url, failed.categorySlug, failed.isFeatured);
                        setFailedUploads(prev => prev.filter((_, i) => i !== idx));
                      } catch {
                        alert("Still failing. Check your database connection.");
                      }
                    }}
                    className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded transition shadow-lg"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GALLERY MANAGER */}
      <section>
        <h2 className="text-2xl font-light mb-8">Manage Portfolio</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {images.map((img) => (
            <div 
              key={img.id} 
              className={`group relative aspect-square rounded-xl overflow-hidden shadow-lg border transition-all duration-300 ${
                selectedImages.has(img.id) ? "border-red-500 ring-2 ring-red-500/50" : "border-neutral-800 bg-neutral-900"
              }`}
            >
              <div 
                className="absolute top-3 right-3 z-30 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  const newSet = new Set(selectedImages);
                  if (newSet.has(img.id)) newSet.delete(img.id);
                  else newSet.add(img.id);
                  setSelectedImages(newSet);
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedImages.has(img.id)}
                  readOnly
                  className="w-5 h-5 rounded border-neutral-700 bg-black/50 text-red-500 focus:ring-1 focus:ring-red-500 shadow-lg pointer-events-none"
                />
              </div>

              <div 
                className="absolute inset-0 z-10 cursor-pointer" 
                onClick={() => {
                  const newSet = new Set(selectedImages);
                  if (newSet.has(img.id)) newSet.delete(img.id);
                  else newSet.add(img.id);
                  setSelectedImages(newSet);
                }}
              />

              <CldImage
                src={img.url}
                alt={img.title || "Portfolio Image"}
                fill
                className="object-cover transition duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
              {img.isFeatured && (
                <span className="absolute top-3 left-3 bg-white text-black text-xs px-2 py-1 rounded font-bold tracking-wider z-20 pointer-events-none">
                  STAR
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 p-4 translate-y-full group-hover:translate-y-0 transition-transform flex justify-between items-center z-30">
                <span className="text-xs text-neutral-300 uppercase">{img.categorySlug}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageToDelete(img.id);
                  }}
                  className="text-red-400 hover:text-red-300 text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREMIUM DELETE MODAL */}
      {imageToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
            onClick={() => !isDeleting && setImageToDelete(null)}
          />
          <div className="relative bg-[#0a0a0a] border border-neutral-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full transform transition-all duration-300 scale-100 opacity-100 animate-in fade-in zoom-in-95">
            <h3 className="text-xl font-light text-white mb-2 tracking-wide">Delete Image</h3>
            <p className="text-sm text-neutral-400 mb-8 leading-relaxed">
              Are you sure you want to permanently delete this image from your portfolio and Cloudinary storage? This action cannot be undone.
            </p>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => setImageToDelete(null)}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 rounded-lg border border-neutral-800 text-neutral-300 hover:bg-neutral-800 transition font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setIsDeleting(true);
                  try {
                    await deleteImage(imageToDelete);
                  } finally {
                    setIsDeleting(false);
                    setImageToDelete(null);
                  }
                }}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 rounded-lg bg-red-600/90 hover:bg-red-500 text-white transition font-medium shadow-lg shadow-red-900/20 disabled:opacity-50 flex items-center justify-center"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BULK ACTION BAR */}
      {selectedImages.size > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-neutral-900 border border-neutral-700 shadow-2xl rounded-full px-6 py-4 flex items-center gap-6 z-50 animate-in slide-in-from-bottom-10 fade-in">
          <span className="text-white font-medium">{selectedImages.size} selected</span>
          <div className="w-px h-6 bg-neutral-700"></div>
          <button
            onClick={() => setSelectedImages(new Set())}
            disabled={isBulkDeleting}
            className="text-neutral-400 hover:text-white transition text-sm disabled:opacity-50"
          >
            Clear
          </button>
          <button
            onClick={async () => {
              if (confirm(`Are you absolutely sure you want to permanently delete ${selectedImages.size} images?`)) {
                setIsBulkDeleting(true);
                try {
                  await bulkDeleteImages(Array.from(selectedImages));
                  setSelectedImages(new Set());
                } catch (e) {
                  alert("Connection failed during bulk deletion.");
                } finally {
                  setIsBulkDeleting(false);
                }
              }
            }}
            disabled={isBulkDeleting}
            className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition disabled:opacity-50 shadow-lg"
          >
            {isBulkDeleting ? "Deleting..." : "Delete Selected"}
          </button>
        </div>
      )}
    </div>
  );
}

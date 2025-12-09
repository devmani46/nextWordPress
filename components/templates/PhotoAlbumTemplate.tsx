"use client";

import { useState } from "react";
import Link from "next/link";
import { Gallery } from "@/lib/wordpress.d";
import PaginationControls from "@/components/ui/PaginationControls";
import GalleryCollage from "@/components/ui/GalleryCollage";

interface PhotoAlbumProps {
  galleries: Gallery[];
  allGalleries?: Gallery[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage?: number;
  };
}

export default function PhotoAlbumTemplate({
  galleries: initialGalleries,
  allGalleries,
  pagination: initialPagination,
}: PhotoAlbumProps) {
  const [currentPage, setCurrentPage] = useState(initialPagination.currentPage);
  const perPage = initialPagination.perPage || 12;

  // Calculate galleries to display based on current page
  const displayGalleries = allGalleries
    ? allGalleries.slice((currentPage - 1) * perPage, currentPage * perPage)
    : initialGalleries;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="grid-container px-4 py-8 md:px-[10%] lg:px-[15%]">
      <h1 className="mb-8 text-3xl font-bold">Album Gallery</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayGalleries.map((gallery) => (
          <Link
            key={gallery.id}
            href={`/photo-album/${gallery.slug}`}
            className="group block overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative aspect-video overflow-hidden bg-muted">
              <GalleryCollage gallery={gallery} />
              {gallery.images && gallery.images.length > 0 && (
                <div className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
                  {gallery.images.length} Images
                </div>
              )}
            </div>
            <div className="p-4">
              <h2
                className="line-clamp-2 text-lg font-semibold"
                dangerouslySetInnerHTML={{ __html: gallery.title.rendered }}
              />
            </div>
          </Link>
        ))}
      </div>

      {initialPagination.totalPages > 1 && (
        <div className="mt-12">
          <PaginationControls
            currentPage={currentPage}
            totalPages={initialPagination.totalPages}
            onPageChange={handlePageChange}
            useUrlParams={false}
          />
        </div>
      )}
    </div>
  );
}



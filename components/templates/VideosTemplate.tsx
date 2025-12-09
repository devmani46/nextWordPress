"use client";

import { useState } from "react";
import { Video } from "@/lib/wordpress.d";
import PaginationControls from "@/components/ui/PaginationControls";
import VideoCard from "@/components/videos/VideoCard";
import Head from "next/head";

interface VideosProps {
  videos: Video[];
  allVideos?: Video[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage?: number;
  };
}

export default function VideosTemplate({
  videos: initialVideos,
  allVideos,
  pagination: initialPagination,
}: VideosProps) {
  const [currentPage, setCurrentPage] = useState(initialPagination.currentPage);
  const perPage = initialPagination.perPage || 12;

  // Calculate videos to display based on current page
  const displayVideos = allVideos
    ? allVideos.slice((currentPage - 1) * perPage, currentPage * perPage)
    : initialVideos;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>Videos - NRNA</title>
        <meta
          name="description"
          content="Browse our collection of videos from NRNA"
        />
      </Head>

      <div className="grid-container px-4 py-8 md:px-[10%] lg:px-[15%]">
        <h1 className="mb-8 text-3xl font-bold">Videos</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
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
    </>
  );
}

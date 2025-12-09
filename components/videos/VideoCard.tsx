"use client";

import { useState } from "react";
import { Video } from "@/lib/wordpress.d";

interface VideoCardProps {
  video: Video;
}

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoId = getYouTubeVideoId(video.video_youtube_url);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking on the iframe
    if (isHovered) {
      e.preventDefault();
    }
  };

  return (
    <div
      className="group block overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {!isHovered && thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={video.title.rendered}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : isHovered && videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&fs=1&enablejsapi=1`}
            className="h-full w-full"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            title={video.title.rendered}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
            No Video
          </div>
        )}
        
        {/* Play button overlay when not hovered */}
        {!isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity group-hover:opacity-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 transition-transform group-hover:scale-110">
              <svg
                className="h-8 w-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2
          className="line-clamp-2 text-lg font-semibold"
          dangerouslySetInnerHTML={{ __html: video.title.rendered }}
        />
      </div>
    </div>
  );
}

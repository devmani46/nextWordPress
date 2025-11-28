import { useState } from "react";
import Link from "next/link";
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

  return (
    <Link
      href={`/videos/${video.slug}`}
      className="group block overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1`}
            className="h-full w-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={video.title.rendered}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
            No Video
          </div>
        )}
      </div>
      <div className="p-4">
        <h2
          className="line-clamp-2 text-lg font-semibold"
          dangerouslySetInnerHTML={{ __html: video.title.rendered }}
        />
      </div>
    </Link>
  );
}

import { Gallery } from "@/lib/wordpress.d";

interface GalleryCollageProps {
  gallery: Gallery;
}

export default function GalleryCollage({ gallery }: GalleryCollageProps) {
  const images = gallery.images || [];
  const featuredImage = gallery._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  // Get top images: prefer gallery images, fallback to featured image
  const topImages = images.length > 0 ? images.slice(0, 3) : featuredImage ? [{ url: featuredImage, alt: gallery.title.rendered }] : [];

  if (topImages.length === 0) {
    return (
      <div className="bg-gray-200 text-gray-400 flex h-full w-full items-center justify-center">
        No Image
      </div>
    );
  }

  // Single image
  if (topImages.length === 1) {
    return (
      <img
        src={topImages[0].url || undefined}
        alt={topImages[0].alt || gallery.title.rendered}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    );
  }

  // Two images - side by side
  if (topImages.length === 2) {
    return (
      <div className="grid grid-cols-2 h-full w-full gap-1">
        <img
          src={topImages[0].url || undefined}
          alt={topImages[0].alt || gallery.title.rendered}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <img
          src={topImages[1].url || undefined}
          alt={topImages[1].alt || gallery.title.rendered}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    );
  }

  // Three or more images - collage layout
  return (
    <div className="grid grid-cols-2 h-full w-full gap-1">
      <img
        src={topImages[0].url || undefined}
        alt={topImages[0].alt || gallery.title.rendered}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="grid grid-rows-2 gap-1">
        <img
          src={topImages[1].url || undefined}
          alt={topImages[1].alt || gallery.title.rendered}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <img
          src={topImages[2].url || undefined}
          alt={topImages[2].alt || gallery.title.rendered}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

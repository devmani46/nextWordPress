import { GetServerSideProps } from "next";
import Link from "next/link";
import { getGalleriesPaginated } from "@/lib/wordpress";
import { Gallery, WordPressResponse } from "@/lib/wordpress.d";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useRouter } from "next/router";

interface PhotoAlbumProps {
  galleries: Gallery[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
  };
}

export default function PhotoAlbumTemplate({
  galleries,
  pagination,
}: PhotoAlbumProps) {
  const router = useRouter();
  const { currentPage, totalPages } = pagination;

  // Helper to generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink href={`/photo-album?page=1`}>1</PaginationLink>
        </PaginationItem>,
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`/photo-album?page=${i}`}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href={`/photo-album?page=${totalPages}`}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Album Gallery</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {galleries.map((gallery) => (
          <Link
            key={gallery.id}
            href={`/photo-album/${gallery.slug}`}
            className="group block overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              {gallery.images && gallery.images.length > 0 ? (
                <img
                  src={gallery.images[0].url}
                  alt={gallery.images[0].alt || gallery.title.rendered}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : gallery._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                <img
                  src={gallery._embedded["wp:featuredmedia"][0].source_url}
                  alt={gallery.title.rendered}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="bg-gray-200 text-gray-400 flex h-full w-full items-center justify-center">
                  No Image
                </div>
              )}
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

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={`/photo-album?page=${currentPage - 1}`}
                  />
                </PaginationItem>
              )}

              {renderPaginationItems()}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href={`/photo-album?page=${currentPage + 1}`}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query.page) || 1;
  const perPage = 12; // Match screenshot grid (3 or 4 per row, 12 is divisible by both)

  try {
    const response: WordPressResponse<Gallery[]> = await getGalleriesPaginated(
      page,
      perPage,
    );

    return {
      props: {
        galleries: response.data,
        pagination: {
          total: response.headers.total,
          totalPages: response.headers.totalPages,
          currentPage: page,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return {
      notFound: true,
    };
  }
};

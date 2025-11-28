import { GetServerSideProps } from "next";
import Link from "next/link";
import { getVideosPaginated } from "@/lib/wordpress";
import { Video, WordPressResponse } from "@/lib/wordpress.d";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import VideoCard from "@/components/videos/VideoCard";
import Head from "next/head";

interface VideosProps {
  videos: Video[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
  };
}

export default function VideosTemplate({ videos, pagination }: VideosProps) {
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
          <PaginationLink href={`/videos?page=1`}>1</PaginationLink>
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
            href={`/videos?page=${i}`}
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
          <PaginationLink href={`/videos?page=${totalPages}`}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
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

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Videos</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={`/videos?page=${currentPage - 1}`}
                    />
                  </PaginationItem>
                )}

                {renderPaginationItems()}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`/videos?page=${currentPage + 1}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query.page) || 1;
  const perPage = 12; // Match screenshot grid (3 or 4 per row, 12 is divisible by both)

  try {
    const response: WordPressResponse<Video[]> = await getVideosPaginated(
      page,
      perPage,
    );

    return {
      props: {
        videos: response.data,
        pagination: {
          total: response.headers.total,
          totalPages: response.headers.totalPages,
          currentPage: page,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching videos:", error);
    return {
      notFound: true,
    };
  }
};

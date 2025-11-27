import {
  getNoticesPaginated,
  getAllNoticeCategories,
  getNoticeImage,
} from "@/lib/wordpress";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Section, Container, Prose } from "@/components/craft";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Head from "next/head";
import { GetServerSideProps } from "next";

export default function Page({
  notices,
  categories,
  totalPages,
  page,
  category,
}: {
  notices: any[];
  categories: any[];
  totalPages: number;
  page: number;
  category?: string;
}) {
  // Create pagination URL helper
  const createPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set("page", newPage.toString());
    if (category) params.set("category", category);
    return `/notices${params.toString() ? `?${params.toString()}` : ""}`;
  };

  return (
    <>
      <Head>
        <title>Notices</title>
        <meta name="description" content="Browse all our notices" />
      </Head>
      <Section>
        <Container>
          <div className="space-y-8">
            <Prose>
              <h2>Notices</h2>
            </Prose>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Link
                href="/notices"
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  !category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/notices?category=${cat.id}`}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-colors",
                    category === cat.id.toString()
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Notices Grid */}
            {notices.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {notices.map((notice) => (
                  <Link
                    key={notice.id}
                    href={`/notices/${notice.slug}`}
                    className="group flex flex-col gap-4 rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-4 transition-all hover:shadow-md"
                  >
                    <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray/10">
                      {notice.imageUrl ? (
                        <img
                          src={notice.imageUrl}
                          alt={notice.title.rendered}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray/20 text-gray">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-gray">
                        {new Date(notice.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <h3
                        className="text-lg font-semibold leading-tight group-hover:text-blue-normal"
                        dangerouslySetInnerHTML={{
                          __html: notice.title.rendered,
                        }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
                <p>No notices found</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center py-8">
                <Pagination>
                  <PaginationContent>
                    {page > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          href={createPaginationUrl(page - 1)}
                        />
                      </PaginationItem>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((pageNum) => {
                        return (
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          Math.abs(pageNum - page) <= 1
                        );
                      })
                      .map((pageNum, index, array) => {
                        const showEllipsis =
                          index > 0 && pageNum - array[index - 1] > 1;
                        return (
                          <div key={pageNum} className="flex items-center">
                            {showEllipsis && <span className="px-2">...</span>}
                            <PaginationItem>
                              <PaginationLink
                                href={createPaginationUrl(pageNum)}
                                isActive={pageNum === page}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          </div>
                        );
                      })}

                    {page < totalPages && (
                      <PaginationItem>
                        <PaginationNext href={createPaginationUrl(page + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category, page: pageParam } = context.query;
  const page = pageParam ? parseInt(pageParam as string, 10) : 1;
  const postsPerPage = 9;

  const [noticesResponse, categories] = await Promise.all([
    getNoticesPaginated(page, postsPerPage, { category: category as string }),
    getAllNoticeCategories(),
  ]);

  const { data: noticesData, headers } = noticesResponse;
  const { total, totalPages } = headers;

  const notices = await Promise.all(
    noticesData.map(async (notice) => {
      const imageUrl = await getNoticeImage(notice);
      return { ...notice, imageUrl };
    })
  );

  return {
    props: {
      notices,
      categories,
      totalPages,
      page,
      category: category || null,
    },
  };
};

import {
  getPostsPaginated,
  getAllAuthors,
  getAllTags,
  getAllCategories,
  searchAuthors,
  searchTags,
  searchCategories,
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
import { PostCard } from "@/components/posts/post-card";
import { FilterPosts } from "@/components/posts/filter";
import { SearchInput } from "@/components/posts/search-input";
import Head from "next/head";
import { GetServerSideProps } from "next";

export default function Page({
  posts,
  authors,
  tags,
  categories,
  total,
  totalPages,
  page,
  author,
  tag,
  category,
  search,
}: {
  posts: any[];
  authors: any[];
  tags: any[];
  categories: any[];
  total: number;
  totalPages: number;
  page: number;
  author?: string;
  tag?: string;
  category?: string;
  search?: string;
}) {
  // Create pagination URL helper
  const createPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set("page", newPage.toString());
    if (category) params.set("category", category);
    if (author) params.set("author", author);
    if (tag) params.set("tag", tag);
    if (search) params.set("search", search);
    return `/posts${params.toString() ? `?${params.toString()}` : ""}`;
  };

  return (
    <>
      <Head>
        <title>Blog Posts</title>
        <meta name="description" content="Browse all our blog posts" />
      </Head>
      <Section>
        <Container>
          <div className="space-y-8">
            <Prose>
              <h2>All Posts</h2>
              <p className="text-muted-foreground">
                {total} {total === 1 ? "post" : "posts"} found
                {search && " matching your search"}
              </p>
            </Prose>

            <div className="space-y-4">
              <SearchInput defaultValue={search} />

              <FilterPosts
                authors={authors}
                tags={tags}
                categories={categories}
                selectedAuthor={author}
                selectedTag={tag}
                selectedCategory={category}
              />
            </div>

            {posts.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
                <p>No posts found</p>
              </div>
            )}

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
                        // Show current page, first page, last page, and 2 pages around current
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
  const {
    author,
    tag,
    category,
    page: pageParam,
    search,
  } = context.query;

  const page = pageParam ? parseInt(pageParam as string, 10) : 1;
  const postsPerPage = 9;

  const [postsResponse, authors, tags, categories] = await Promise.all([
    getPostsPaginated(page, postsPerPage, {
      author: author as string,
      tag: tag as string,
      category: category as string,
      search: search as string,
    }),
    search ? searchAuthors(search as string) : getAllAuthors(),
    search ? searchTags(search as string) : getAllTags(),
    search ? searchCategories(search as string) : getAllCategories(),
  ]);

  const { data: posts, headers } = postsResponse;
  const { total, totalPages } = headers;

  return {
    props: {
      posts,
      authors,
      tags,
      categories,
      total,
      totalPages,
      page,
      author: author || null,
      tag: tag || null,
      category: category || null,
      search: search || null,
    },
  };
};

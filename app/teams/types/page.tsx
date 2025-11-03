import {
  getAllTeamTypes,
  getTeamsByTeamTypePaginated,
} from "@/lib/wordpress";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Section, Container } from "@/components/craft";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Types",
  description: "Browse team members by type",
};

export const dynamic = "auto";
export const revalidate = 600;

export default async function TeamTypesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const typesPerPage = 12;

  const types = await getAllTeamTypes();

  // Create pagination URL helper
  const createPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set("page", newPage.toString());
    return `/teams/types${params.toString() ? `?${params.toString()}` : ""}`;
  };

  const totalPages = Math.ceil(types.length / typesPerPage);
  const startIndex = (page - 1) * typesPerPage;
  const endIndex = startIndex + typesPerPage;
  const paginatedTypes = types.slice(startIndex, endIndex);

  return (
    <Section>
      <Container>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Team Types</h1>
            <p className="text-muted-foreground">
              {types.length} {types.length === 1 ? "type" : "types"} found
            </p>
          </div>

          {paginatedTypes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTypes.map((type) => (
                <div
                  key={type.id}
                  className="border p-6 bg-accent/30 rounded-lg group flex justify-between flex-col not-prose gap-4 hover:bg-accent/75 transition-all"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-medium group-hover:underline decoration-muted-foreground underline-offset-4 decoration-dotted transition-all">
                      {type.name}
                    </h3>
                    {type.description && (
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {type.count} {type.count === 1 ? "member" : "members"}
                    </p>
                  </div>
                  <a
                    href={`/teams?team_type=${type.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    View Members →
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
              <p>No team types found</p>
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
  );
}

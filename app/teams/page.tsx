import {
  getTeamsPaginated,
  getAllAuthors,
  getAllTeamCategories,
  getAllTeamTypes,
  searchAuthors,
  searchTeamCategories,
  searchTeamTypes,
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
import { TeamCard } from "@/components/posts/team-card";
import { FilterTeams } from "@/components/posts/filter-teams";
import { SearchTeams } from "@/components/posts/search-teams";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teams",
  description: "Meet our team members",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TeamsPage({
  searchParams,
}: {
  searchParams: Promise<{
    author?: string;
    team_category?: string;
    team_type?: string;
    page?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const { author, team_category, team_type, page: pageParam, search } = params;

  // Handle pagination
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const teamsPerPage = 9;

  // Fetch data based on search parameters using efficient pagination
  const [teamsResponse, authors, teamCategories, teamTypes] = await Promise.all([
    getTeamsPaginated(page, teamsPerPage, { author, team_category, team_type, search }),
    search ? searchAuthors(search) : getAllAuthors(),
    search ? searchTeamCategories(search) : getAllTeamCategories(),
    search ? searchTeamTypes(search) : getAllTeamTypes(),
  ]);

  const { data: teams, headers } = teamsResponse;
  const { total, totalPages } = headers;

  // Create pagination URL helper
  const createPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set("page", newPage.toString());
    if (team_category) params.set("team_category", team_category);
    if (author) params.set("author", author);
    if (team_type) params.set("team_type", team_type);
    if (search) params.set("search", search);
    return `/teams${params.toString() ? `?${params.toString()}` : ""}`;
  };

  return (
    <Section>
      <Container>
        <div className="space-y-8">
          <Prose>
            <h1>Our Team</h1>
            <p className="text-muted-foreground">
              {total} {total === 1 ? "team member" : "team members"} found
              {search && " matching your search"}
            </p>
          </Prose>

          <div className="space-y-4">
            <SearchTeams defaultValue={search} />

            <FilterTeams
              authors={authors}
              teamCategories={teamCategories}
              teamTypes={teamTypes}
              selectedAuthor={author}
              selectedTeamCategory={team_category}
              selectedTeamType={team_type}
            />
          </div>

          {teams.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          ) : (
            <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
              <p>No team members found</p>
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
  );
}

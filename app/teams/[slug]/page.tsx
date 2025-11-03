import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Section, Container } from "@/components/craft";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  getTeamBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getTeamCategoryById,
  getTeamTypeById,
} from "@/lib/wordpress";

interface TeamPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const team = await getTeamBySlug(params.slug);

  if (!team) {
    return {
      title: "Team Member Not Found",
    };
  }

  return {
    title: team.title?.rendered || "Team Member",
    description: team.excerpt?.rendered?.replace(/<[^>]*>/g, "") || "Team member details",
  };
}

export async function generateStaticParams() {
  try {
    const slugs = await import("@/lib/wordpress").then(m => m.getAllTeamSlugs());
    return slugs;
  } catch (error) {
    console.error("Error generating static params for teams:", error);
    return [];
  }
}

export default async function TeamPage({ params }: TeamPageProps) {
  const team = await getTeamBySlug(params.slug);

  if (!team) {
    notFound();
  }

  const media = team.featured_media
    ? await getFeaturedMediaById(team.featured_media)
    : null;
  const author = team.author ? await getAuthorById(team.author) : null;
  const date = new Date(team.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Get team categories and types
  const teamCategories = await Promise.all(
    team.team_category.map((id) => getTeamCategoryById(id))
  );
  const teamTypes = await Promise.all(
    team.team_type.map((id) => getTeamTypeById(id))
  );

  return (
    <Section>
      <Container>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            {media?.source_url && (
              <div className="h-96 w-full overflow-hidden relative rounded-md border">
                <Image
                  className="h-full w-full object-cover"
                  src={media.source_url}
                  alt={team.title?.rendered || "Team member"}
                  width={600}
                  height={400}
                />
              </div>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {author && <p>By {author.name}</p>}
              <p>{date}</p>
            </div>

            {/* Display team categories and types */}
            <div className="flex flex-wrap gap-2">
              {teamCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/teams?team_category=${category.id}`}
                  className={cn(
                    badgeVariants({ variant: "secondary" }),
                    "!no-underline"
                  )}
                >
                  {category.name}
                </Link>
              ))}
              {teamTypes.map((type) => (
                <Link
                  key={type.id}
                  href={`/teams?team_type=${type.id}`}
                  className={cn(
                    badgeVariants({ variant: "outline" }),
                    "!no-underline"
                  )}
                >
                  {type.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h1
              className="text-4xl font-bold"
              dangerouslySetInnerHTML={{
                __html: team.title?.rendered || "Untitled Team Member",
              }}
            />
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: team.content?.rendered || "No content available",
              }}
            />
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/teams"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Teams
          </Link>
        </div>
      </Container>
    </Section>
  );
}

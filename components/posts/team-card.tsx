  import Image from "next/image";
import Link from "next/link";

import { Team } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";

import {
  getFeaturedMediaById,
  getAuthorById,
  getTeamCategoryById,
  getTeamTypeById,
} from "@/lib/wordpress";

export async function TeamCard({ team }: { team: Team }) {
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
    <Link
      href={`/teams/${team.slug}`}
      className={cn(
        "border p-4 bg-accent/30 rounded-lg group flex justify-between flex-col not-prose gap-8",
        "hover:bg-accent/75 transition-all"
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="h-48 w-full overflow-hidden relative rounded-md border flex items-center justify-center bg-muted">
          {media?.source_url ? (
            <Image
              className="h-full w-full object-cover"
              src={media.source_url}
              alt={team.title?.rendered || "Team member thumbnail"}
              width={400}
              height={200}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-muted-foreground">
              No image available
            </div>
          )}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: team.title?.rendered || "Untitled Team Member",
          }}
          className="text-xl text-primary font-medium group-hover:underline decoration-muted-foreground underline-offset-4 decoration-dotted transition-all"
        ></div>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: team.excerpt?.rendered
              ? team.excerpt.rendered.split(" ").slice(0, 12).join(" ").trim() +
                "..."
              : "No excerpt available",
          }}
        ></div>

        {/* Display team categories and types */}
        <div className="flex flex-wrap gap-2">
          {teamCategories.map((category) => (
            <span
              key={category.id}
              className={cn(
                badgeVariants({ variant: "secondary" }),
                "!no-underline text-xs"
              )}
            >
              {category.name}
            </span>
          ))}
          {teamTypes.map((type) => (
            <span
              key={type.id}
              className={cn(
                badgeVariants({ variant: "outline" }),
                "!no-underline text-xs"
              )}
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <hr />
        <div className="flex justify-between items-center text-xs">
          <p>{author?.name || "Unknown Author"}</p>
          <p>{date}</p>
        </div>
      </div>
    </Link>
  );
}

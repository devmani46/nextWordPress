  "use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Author, Category, Tag } from "@/lib/wordpress.d";

interface FilterTeamsProps {
  authors: Author[];
  teamCategories: Category[];
  teamTypes: Tag[];
  selectedAuthor?: string;
  selectedTeamCategory?: string;
  selectedTeamType?: string;
}

export function FilterTeams({
  authors,
  teamCategories,
  teamTypes,
  selectedAuthor,
  selectedTeamCategory,
  selectedTeamType,
}: FilterTeamsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [author, setAuthor] = useState(selectedAuthor || "");
  const [teamCategory, setTeamCategory] = useState(selectedTeamCategory || "");
  const [teamType, setTeamType] = useState(selectedTeamType || "");

  useEffect(() => {
    setAuthor(selectedAuthor || "");
    setTeamCategory(selectedTeamCategory || "");
    setTeamType(selectedTeamType || "");
  }, [selectedAuthor, selectedTeamCategory, selectedTeamType]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (author && author !== "all-authors") {
      params.set("author", author);
    } else {
      params.delete("author");
    }

    if (teamCategory && teamCategory !== "all-categories") {
      params.set("team_category", teamCategory);
    } else {
      params.delete("team_category");
    }

    if (teamType && teamType !== "all-types") {
      params.set("team_type", teamType);
    } else {
      params.delete("team_type");
    }

    // Reset to page 1 when filters change
    params.delete("page");

    router.push(`/teams${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const clearFilters = () => {
    setAuthor("");
    setTeamCategory("");
    setTeamType("");
    router.push("/teams");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={author} onValueChange={setAuthor}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by author" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-authors">All Authors</SelectItem>
            {authors.map((author) => (
              <SelectItem key={author.id} value={author.id.toString()}>
                {author.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={teamCategory} onValueChange={setTeamCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-categories">All Categories</SelectItem>
            {teamCategories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={teamType} onValueChange={setTeamType}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-types">All Types</SelectItem>
            {teamTypes.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button onClick={applyFilters} size="sm">
          Apply Filters
        </Button>
        <Button onClick={clearFilters} variant="outline" size="sm">
          Clear
        </Button>
      </div>
    </div>
  );
}

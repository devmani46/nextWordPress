import Link from "next/link";
import { ReportsMenuItem } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  categories: ReportsMenuItem[];
  selectedCategory: string;
}

export default function CategoryTabs({
  categories,
  selectedCategory,
}: CategoryTabsProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-6 border-b border-gray-200 pb-2 mb-8">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={cat.url || "#"}
          className={cn(
            "pb-2 text-sm font-medium transition-colors hover:text-blue-600",
            selectedCategory === cat.title
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          )}
        >
          {cat.title}
        </Link>
      ))}
    </div>
  );
}

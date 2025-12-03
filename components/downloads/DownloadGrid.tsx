import { Resource } from "@/lib/wordpress.d";
import DownloadCard from "./DownloadCard";

interface DownloadGridProps {
  resources: Resource[];
  isLoading?: boolean;
}

export default function DownloadGrid({ resources, isLoading }: DownloadGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-[300px] animate-pulse rounded-xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
        <div className="text-center">
          <p className="text-lg font-medium">No downloads found</p>
          <p className="mt-1 text-sm">Try adjusting your search criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {resources.map((resource) => (
        <DownloadCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}

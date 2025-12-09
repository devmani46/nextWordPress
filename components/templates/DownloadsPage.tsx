"use client";

import { Resource, WordPressPaginationHeaders } from "@/lib/wordpress.d";
import PaginationControls from "@/components/ui/PaginationControls";
import { useSearchParams } from "next/navigation";
import DownloadGrid from "@/components/downloads/DownloadGrid";
import SearchBar from "@/components/downloads/SearchBar";

interface DownloadsPageProps {
  resources: Resource[];
  pagination: WordPressPaginationHeaders;
}

export default function DownloadsPage({ resources, pagination }: DownloadsPageProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get("page")) || 1;

  return (
    <div className="grid-container px-4 py-8 md:px-[10%] lg:px-[15%]">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="text-3xl font-bold text-gray-900">Downloads</h1>
        <SearchBar />
      </div>

      <DownloadGrid resources={resources} />

      <div className="mt-8 flex justify-center">
        <PaginationControls
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          useUrlParams={true}
        />
      </div>
    </div>
  );
}

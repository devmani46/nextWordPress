"use client";

import { Report, WordPressPaginationHeaders } from "@/lib/wordpress.d";
import PaginationControls from "@/components/ui/PaginationControls";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/downloads/SearchBar";
import ReportsGrid from "@/components/reports/ReportsGrid";

interface ReportsPublicationsPageProps {
  reports: Report[];
  pagination: WordPressPaginationHeaders;
  categoryTitle?: string;
}

export default function ReportsPublicationsPage({
  reports,
  pagination,
  categoryTitle,
}: ReportsPublicationsPageProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get("page")) || 1;

  return (
    <div className="grid-container px-4 py-8 md:px-[10%] lg:px-[15%]">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="text-3xl font-bold text-gray-900">
          {categoryTitle || "Reports & Publications"}
        </h1>
        <SearchBar />
      </div>

      <ReportsGrid reports={reports} />

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

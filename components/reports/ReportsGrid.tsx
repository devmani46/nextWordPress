import { Report } from "@/lib/wordpress.d";
import ReportCard from "./ReportCard";

interface ReportsGridProps {
  reports: Report[];
  isLoading?: boolean;
}

export default function ReportsGrid({ reports, isLoading }: ReportsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[200px] animate-pulse rounded-xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
        <div className="text-center">
          <p className="text-lg font-medium">No reports found</p>
          <p className="mt-1 text-sm">Try adjusting your search criteria or category</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}

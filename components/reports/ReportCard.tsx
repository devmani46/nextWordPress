import { Report } from "@/lib/wordpress.d";
import { format } from "date-fns";
import { Download, FileText } from "lucide-react";
import Image from "next/image";

interface ReportCardProps {
  report: Report;
}

export default function ReportCard({ report }: ReportCardProps) {
  const title = report.title.rendered;
  const date = report.date ? format(new Date(report.date), "MMMM d, yyyy") : "";

  // Get first file (only one file per report as per requirements)
  const firstFile = report.pdf_files?.[0];
  const fileUrl = firstFile?.url || "";
  const fileName = firstFile?.title || title || "download";

  const isPDF = fileName.toLowerCase().endsWith(".pdf") || fileUrl.toLowerCase().endsWith(".pdf");

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileUrl) {
      const downloadUrl = `/api/download?url=${encodeURIComponent(
        fileUrl,
      )}&filename=${encodeURIComponent(fileName)}`;
      window.location.href = downloadUrl;
    }
  };

  return (
    <div className="border-gray-100 group relative flex w-full flex-row items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      {/* Thumbnail - Left Side */}
      <a
        href={fileUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-100 relative h-[70px] w-[74px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg"
        onClick={(e) => {
          if (!fileUrl) e.preventDefault();
        }}
      >
        {isPDF && fileUrl ? (
          <div className="relative h-full w-full">
            <iframe
              src={`${fileUrl}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
              className="max-w-74 pointer-events-none absolute inset-0 max-h-72 w-full origin-top-left scale-150"
              title={`${title} preview`}
            />
            <div className="absolute inset-0 bg-transparent transition-colors hover:bg-black/5" />
          </div>
        ) : (
          <div className="text-gray-400 flex h-full items-center justify-center">
            <FileText className="h-8 w-8" />
          </div>
        )}
      </a>

      {/* Content - Right Side */}
      <div className="flex flex-grow flex-col justify-between py-1">
        <div>
          {date && <div className="label-medium mb-1 text-gray">{date}</div>}

          <a
            href={fileUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-left"
            onClick={(e) => {
              if (!fileUrl) e.preventDefault();
            }}
          >
            <h3
              className="p1-medium transition-colors group-hover:text-blue-normal"
              title={title}
            >
              {title}
            </h3>
          </a>
          <p className="text-gray-500 mt-1 text-sm">
            {fileName.split(".").pop()?.toUpperCase() || "File"}
          </p>
        </div>
      </div>

      {/* Download Button */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={handleDownload}
          className="text-gray-400 flex h-8 w-8 items-center justify-center transition-colors hover:text-blue-normal"
          aria-label="Download"
          title="Download file"
        >
          <Download className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

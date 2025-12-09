import { Resource } from "@/lib/wordpress.d";
import { format } from "date-fns";
import { Download, FileText } from "lucide-react";
import Image from "next/image";

interface DownloadCardProps {
  resource: Resource;
}

export default function DownloadCard({ resource }: DownloadCardProps) {
  const title = resource.title.rendered;
  const date = format(new Date(resource.date), "MMMM d, yyyy");

  const firstFile = resource.resource_files?.[0];
  const fileUrl = firstFile?.url || "";
  const fileName = firstFile?.filename || title || "download";

  const isPDF = fileName.toLowerCase().endsWith(".pdf");

  const thumbnailUrl =
    resource._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium
      ?.source_url || resource._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileUrl) {
      // Use the proxy API to download the file
      // This avoids CORS issues and forces download
      const downloadUrl = `/api/download?url=${encodeURIComponent(
        fileUrl,
      )}&filename=${encodeURIComponent(fileName)}`;

      // Trigger download by navigating to the proxy URL
      // Since the proxy sets Content-Disposition: attachment, it won't navigate away
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
            {/* PDF Preview using iframe */}
            <iframe
              src={`${fileUrl}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
              className="max-w-74 pointer-events-none absolute inset-0 max-h-72 w-full origin-top-left scale-150"
              title={`${title} preview`}
            />
            {/* Overlay to prevent iframe interaction and show it's clickable */}
            <div className="absolute inset-0 bg-transparent transition-colors hover:bg-black/5" />
          </div>
        ) : thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="text-gray-400 flex h-full items-center justify-center">
            <FileText className="h-8 w-8" />
          </div>
        )}
      </a>

      {/* Content - Right Side */}
      <div className="flex flex-grow flex-col justify-between py-1">
        <div>
          <div className="label-medium mb-1 text-gray">{date}</div>

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
          {/* Show file type/extension */}
          <p className="text-gray-500 mt-1 text-sm">
            {fileName.split(".").pop()?.toUpperCase() || "File"}
          </p>
        </div>
      </div>

      {/* Download Button - Bottom Right Absolute or Flex */}
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

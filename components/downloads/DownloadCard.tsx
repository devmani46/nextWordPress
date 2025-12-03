
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
  
  const isPDF = fileName.toLowerCase().endsWith('.pdf');
  
  const thumbnailUrl = resource._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium?.source_url || 
                       resource._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileUrl) {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  return (
    <div className="group relative flex w-full flex-row items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      {/* Thumbnail - Left Side */}
      <a 
        href={fileUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
        onClick={(e) => {
          if (!fileUrl) e.preventDefault();
        }}
      >
        {isPDF && fileUrl ? (
          <div className="relative h-full w-full">
            {/* PDF Preview using iframe */}
            <iframe
              src={`${fileUrl}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
              className="absolute inset-0 h-full w-full pointer-events-none scale-150 origin-top-left"
              title={`${title} preview`}
            />
            {/* Overlay to prevent iframe interaction and show it's clickable */}
            <div className="absolute inset-0 bg-transparent hover:bg-black/5 transition-colors" />
          </div>
        ) : thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <FileText className="h-8 w-8" />
          </div>
        )}
      </a>

      {/* Content - Right Side */}
      <div className="flex flex-grow flex-col justify-between py-1">
        <div>
            <div className="mb-1 text-xs font-medium text-gray-500">
            {date}
            </div>
            
            <a 
              href={fileUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-left"
              onClick={(e) => {
                if (!fileUrl) e.preventDefault();
              }}
            >
                <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors" title={title}>
                {title}
                </h3>
            </a>
            {/* Show file type/extension */}
            <p className="mt-1 text-sm text-gray-500">
              {fileName.split('.').pop()?.toUpperCase() || 'File'}
            </p>
        </div>
      </div>

      {/* Download Button - Bottom Right Absolute or Flex */}
      <div className="absolute bottom-4 right-4">
          <button
            onClick={handleDownload}
            className="flex h-8 w-8 items-center justify-center text-gray-400 transition-colors hover:text-blue-600"
            aria-label="Download"
            title="Download file"
          >
            <Download className="h-5 w-5" />
          </button>
      </div>
    </div>
  );
}

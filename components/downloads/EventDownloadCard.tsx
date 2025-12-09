import { format } from "date-fns";
import { Download, FileText } from "lucide-react";
import Image from "next/image";

interface EventDownloadCardProps {
  download: {
    title: string;
    file: {
      id: number;
      url: string;
      filename: string;
    };
  };
  date?: string; // You can pass event date if needed
  thumbnailUrl?: string; // Pass featured image from parent component
}

export default function EventDownloadCard({
  download,
  date,
  thumbnailUrl,
}: EventDownloadCardProps) {
  const title = download.title;
  const fileUrl = download.file?.url || "";
  const fileName = download.file?.filename || title || "download";

  const isPDF = fileName.toLowerCase().endsWith(".pdf");

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
      {/* Thumbnail */}
      <a
        href={fileUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => !fileUrl && e.preventDefault()}
        className="bg-gray-100 relative h-24 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg"
      >
        {isPDF ? (
          <iframe
            src={`${fileUrl}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
            className="pointer-events-none absolute inset-0 origin-top-left scale-150"
          />
        ) : thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="text-gray-400 flex h-full items-center justify-center">
            <FileText className="h-8 w-8" />
          </div>
        )}
      </a>

      {/* Right Content */}
      <div className="flex flex-grow flex-col justify-between py-1">
        <div>
          {date && <div className="label-medium mb-1 text-gray">{date}</div>}

          <a
            href={fileUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => !fileUrl && e.preventDefault()}
            className="block text-left"
          >
            <h3 className="p1-medium transition-colors group-hover:text-blue-600">
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
          className="text-gray-400 flex h-8 w-8 items-center justify-center transition-colors hover:text-blue-600"
        >
          <Download className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

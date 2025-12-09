"use client";

import { useState } from "react";
import { Notice, Category } from "@/lib/wordpress";
import { Page } from "@/lib/wordpress";
import Link from "next/link";
import PaginationControls from "@/components/ui/PaginationControls";
import { cn } from "@/lib/utils";

interface NoticesTemplateProps {
  page: Page;
  notices: Notice[];
  allNotices?: Notice[];
  categories?: Category[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage?: number;
  };
}

export default function NoticesTemplate({
  page,
  notices: initialNotices,
  allNotices,
  categories = [],
  pagination: initialPagination,
}: NoticesTemplateProps) {
  const [currentPage, setCurrentPage] = useState(initialPagination.currentPage);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const perPage = initialPagination.perPage || 13;

  // Filter notices by category if selected
  const filteredNotices = selectedCategory
    ? (allNotices || initialNotices).filter((notice) =>
        notice.notice_category?.includes(selectedCategory)
      )
    : (allNotices || initialNotices);

  // Calculate notices to display based on current page
  const displayNotices = filteredNotices.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // Recalculate total pages based on filtered results
  const totalFilteredPages = Math.ceil(filteredNotices.length / perPage);

  const remainingNotices = displayNotices.slice(1);
  const gridAreas = [
    "a",
    "b",
    "d",
    "c",
    "e",
    "f",
    "l",
    "g",
    "j",
    "h",
    "m",
    "i",
    "n",
  ];

  return (
    <div className="grid-container px-[15%]">
      <h1 
        className="mb-8 text-3xl font-bold"
        dangerouslySetInnerHTML={{ __html: page.title.rendered }}
      />

      {/* Category Sub-Nav */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-6 pb-2">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setCurrentPage(1);
            }}
            className={cn(
              "pb-2 text-sm font-medium transition-colors hover:text-blue-600",
              selectedCategory === null
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            )}
          >
            All Notice
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage(1);
              }}
              className={cn(
                "pb-2 text-sm font-medium transition-colors hover:text-blue-600",
                selectedCategory === cat.id
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      <style>{`
        .parent {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          /* adjust the row height to taste; 80px is just an example */
          grid-template-rows: repeat(6, 120px);
          gap: 8px;
          grid-template-areas:
            "a a b c"
            "a a b e"
            "a a d e"
            "f g h i"
            "f j h n"
            "l j m n";
          padding: 24px;
        }

        @media (max-width: 800px) {
          .parent {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: none;
            grid-auto-rows: 80px;
            grid-template-areas:
              "a a"
              "a a"
              "b c"
              "d e"
              "f g"
              "h i"
              "j k"
              "l m"
              "n n";
          }
        }
      `}</style>

      <div className="parent">
        {/* First element */}
        <Link
          href={`/notices/${displayNotices[0].slug}`}
          style={{ gridArea: gridAreas[0] }}
          className="flex flex-col overflow-hidden rounded-lg bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)]"
        >
          {displayNotices[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <div className="h-[60%] w-full overflow-hidden">
              <img
                src={displayNotices[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
                alt={displayNotices[0].title.rendered}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col justify-center p-4">
            <p className="mb-1 text-xs text-gray-600">
              {new Date(displayNotices[0].date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p
              className="p1-regular line-clamp-2"
              dangerouslySetInnerHTML={{ __html: displayNotices[0].title.rendered }}
            />
          </div>
        </Link>

        {/* Remaining elements */}
        {remainingNotices.map((notice, index) => {
          const showImage = index === 0 || index % 4 === 0 || index % 4 === 3;

          return (
            <Link
              href={`/notices/${notice.slug}`}
              key={index}
              style={{ gridArea: gridAreas[index + 1] }}
              className="flex flex-col overflow-hidden rounded-lg bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)]"
            >
              {showImage &&
                notice._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                  <div className="h-[60%] w-full overflow-hidden">
                    <img
                      src={notice._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
                      alt={notice.title.rendered}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              <div className="flex flex-1 flex-col justify-center p-3">
                <p className="mb-1 text-xs text-gray-600">
                  {new Date(notice.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p
                  className="p1-regular line-clamp-2 text-sm"
                  dangerouslySetInnerHTML={{ __html: notice.title.rendered }}
                />
              </div>
            </Link>
          );
        })}
      </div>

      {totalFilteredPages > 1 && (
        <div className="mt-12">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalFilteredPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            useUrlParams={false}
          />
        </div>
      )}
    </div>
  );
}

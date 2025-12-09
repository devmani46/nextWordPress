"use client";

import { useState } from "react";
import { News } from "@/lib/wordpress";
import { Page } from "@/lib/wordpress";
import Link from "next/link";
import PaginationControls from "@/components/ui/PaginationControls";

interface NewsTemplateProps {
  page: Page;
  news: News[];
  allNews?: News[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage?: number;
  };
}

export default function NewsTemplate({
  page,
  news: initialNews,
  allNews,
  pagination: initialPagination,
}: NewsTemplateProps) {
  const [currentPage, setCurrentPage] = useState(initialPagination.currentPage);
  const perPage = initialPagination.perPage || 13;

  // Calculate news to display based on current page
  const displayNews = allNews
    ? allNews.slice((currentPage - 1) * perPage, currentPage * perPage)
    : initialNews;

  const remainingNews = displayNews.slice(1);
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
          href={`/news/${displayNews[0].slug}`}
          style={{ gridArea: gridAreas[0] }}
          className="flex flex-col overflow-hidden rounded-lg bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)]"
        >
          {displayNews[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <div className="h-[60%] w-full overflow-hidden">
              <img
                src={displayNews[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
                alt={displayNews[0].title.rendered}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col justify-center p-4">
            <p className="mb-1 text-xs text-gray-600">
              {new Date(displayNews[0].date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p
              className="p1-regular line-clamp-2"
              dangerouslySetInnerHTML={{ __html: displayNews[0].title.rendered }}
            />
          </div>
        </Link>

        {/* Remaining elements */}
        {remainingNews.map((newsItem, index) => {
          const showImage = index === 0 || index % 4 === 0 || index % 4 === 3;

          return (
            <Link
              href={`/news/${newsItem.slug}`}
              key={index}
              style={{ gridArea: gridAreas[index + 1] }}
              className="flex flex-col overflow-hidden rounded-lg bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)]"
            >
              {showImage &&
                newsItem._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                  <div className="h-[60%] w-full overflow-hidden">
                    <img
                      src={newsItem._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
                      alt={newsItem.title.rendered}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              <div className="flex flex-1 flex-col justify-center p-3">
                <p className="mb-1 text-xs text-gray-600">
                  {new Date(newsItem.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p
                  className="p1-regular line-clamp-2 text-sm"
                  dangerouslySetInnerHTML={{ __html: newsItem.title.rendered }}
                />
              </div>
            </Link>
          );
        })}
      </div>

      {initialPagination.totalPages > 1 && (
        <div className="mt-12">
          <PaginationControls
            currentPage={currentPage}
            totalPages={initialPagination.totalPages}
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

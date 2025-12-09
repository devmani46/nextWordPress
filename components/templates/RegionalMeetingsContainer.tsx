import { Event, RegionalMeeting } from "@/lib/wordpress";
import { Page } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useState } from "react";

interface RegionalMeetingsContainerTemplateProps {
  page: Page;
  regional_meetings: RegionalMeeting[];
  pagination?: {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  };
}

export default function RegionalMeetingsContainerTemplate({
  page,
  regional_meetings: initialMeetings,
  pagination,
}: RegionalMeetingsContainerTemplateProps) {
  const [regionalMeetings, setRegionalMeetings] =
    useState<RegionalMeeting[]>(initialMeetings);
  const [currentPage, setCurrentPage] = useState(pagination?.currentPage || 1);
  const [loading, setLoading] = useState(false);
  const totalPages = pagination?.totalPages || 1;

  const loadPage = async (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage || loading)
      return;

    setLoading(true);
    // Scroll to top of the projects section
    const section = document.querySelector(".regional-meetings-container");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/regional_meetings?_embed&per_page=${
          pagination?.perPage || 9
        }&page=${page}`,
      );

      if (!res.ok) throw new Error("Failed to fetch regionalMeetings");

      const newRegionalMeetings: RegionalMeeting[] = await res.json();

      setRegionalMeetings(newRegionalMeetings);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    // Always show first page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            loadPage(1);
          }}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    );

    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Calculate range around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if close to ends
    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, 4);
    }
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 3);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              loadPage(i);
            }}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              loadPage(totalPages);
            }}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  //   const regionalMeetings = regional_meetings ?? [];
  //   const remainingRegionalMeetings =
  //     regionalMeetings.length > 1 ? regionalMeetings.slice(1) : [];

  //   if (regionalMeetings.length === 0) return null;

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

  const items = Array.from({ length: gridAreas.length }, (_, i) => i + 1);

  return (
    <div className="px-[15%]">
      <div className="regional-meetings-container grid max-w-full grid-cols-4 grid-rows-[repeat(5,150px)] gap-4">
        {/* FIRST EVENT (2×3 span) */}
        <Link
          href={`/regional_meetings/${regionalMeetings[0].slug}`}
          className="col-span-2 row-span-3 flex flex-col overflow-hidden rounded-xl bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] p-5"
        >
          {regionalMeetings[0]._embedded?.["wp:featuredmedia"]?.[0]
            ?.source_url && (
            <img
              src={
                regionalMeetings[0]._embedded?.["wp:featuredmedia"]?.[0]
                  ?.source_url
              }
              className="h-[80%] w-full rounded-lg object-cover"
            />
          )}
          <p className="mt-3 text-xl font-medium">
            {regionalMeetings[0].title.rendered}
          </p>
          <p className="p1-regular text-gray">
            {regionalMeetings[0].rm_location}
          </p>
        </Link>

        {/* REMAINING 1×1 CELLS */}
        {regionalMeetings.slice(1).map((regional_meeting, index) => (
          <Link
            key={index}
            href={`/events/${regional_meeting.slug}`}
            className="flex flex-col overflow-hidden rounded-xl bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] p-5"
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {regional_meeting._embedded?.["wp:featuredmedia"]?.[0]
                ?.source_url && (
                <Image
                  height={64}
                  width={100}
                  alt="event-image"
                  src={
                    regional_meeting._embedded?.["wp:featuredmedia"]?.[0]
                      ?.source_url
                  }
                  className="rounded-lg"
                />
              )}
              <div className="event-date flex flex-col text-violet-normal">
                <p className="h2">
                  {new Date(regional_meeting.rm_start_date).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                    },
                  )}
                </p>
                <p className="p1-regular">
                  {new Date(regional_meeting.rm_start_date).toLocaleDateString(
                    "en-GB",
                    {
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </p>
              </div>
            </div>
            <p className="p1-medium mt-3">{regional_meeting.title.rendered}</p>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    loadPage(currentPage - 1);
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {renderPaginationItems()}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    loadPage(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

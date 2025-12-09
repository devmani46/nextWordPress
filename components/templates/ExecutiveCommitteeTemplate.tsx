"use client";

import { Page, ExecutiveCommittee } from "@/lib/wordpress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import BannerTwo from "../banner/banner2";
import Image from "next/image";
import { useState } from "react";
import PaginationControls from "../ui/PaginationControls";
// Hardcoded test data - 60 items for pagination testing
// const TEST_COMMITTEES: ExecutiveCommittee[] = Array.from({ length: 100 }, (_, i) => ({
//   id: i + 1,
//   date: new Date().toISOString(),
//   date_gmt: new Date().toISOString(),
//   modified: new Date().toISOString(),
//   modified_gmt: new Date().toISOString(),
//   slug: `member-${i + 1}`,
//   status: "publish" as const,
//   link: `https://example.com/member-${i + 1}`,
//   guid: {
//     rendered: `https://example.com/?p=${i + 1}`
//   },
//   title: {
//     rendered: `Member ${i + 1}`
//   },
//   featured_media: 0,
//   committee_role: `Role ${i + 1}`,
//   committee_institution: `Institution ${i + 1}`,
//   committee_country: `Country ${i + 1}`,
//   hierarchy_order: i < 1 ? 1 : i < 6 ? 2 : i < 12 ? 3 : 4,
//   image_url: undefined,
//   _embedded: undefined
// }));
interface ExecutiveCommitteeTemplateProps {
  page: Page;
  committees: ExecutiveCommittee[];
  currentPage?: number;
}

function getCommitteeImageUrl(
  committee: ExecutiveCommittee,
): string | undefined {
  if (committee.image_url) {
    return committee.image_url;
  }

  const embeddedUrl =
    committee._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  if (embeddedUrl) {
    return embeddedUrl;
  }

  return undefined;
}

function getItemsForPage(
  committees: ExecutiveCommittee[],
  page: number,
): ExecutiveCommittee[] {
  // Sort by hierarchy_order first, then by id
  const sorted = [...committees].sort((a, b) => {
    if (a.hierarchy_order !== b.hierarchy_order) {
      return a.hierarchy_order - b.hierarchy_order;
    }
    return a.id - b.id;
  });

  if (page === 1) {
    // Page 1: Show first 24 items
    return sorted.slice(0, 24);
  } else {
    // Page 2+: Show 30 items per page (5 rows × 6 columns)
    const page1ItemCount = 24;
    const itemsPerPage = 30;
    const startIndex = page1ItemCount + (page - 2) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sorted.slice(startIndex, endIndex);
  }
}

function calculateTotalPages(totalItems: number): number {
  if (totalItems <= 24) return 1;

  const remainingItems = totalItems - 24;
  const additionalPages = Math.ceil(remainingItems / 30);
  return 1 + additionalPages;
}

export default function ExecutiveCommitteeTemplate({
  page,
  committees,
  currentPage: initialPage = 1,
}: ExecutiveCommitteeTemplateProps) {
  // Use test data for pagination testing
  // const testCommittees = TEST_COMMITTEES;
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate pagination
  // const totalPages = calculateTotalPages(testCommittees.length);
  // const currentItems = getItemsForPage(testCommittees, currentPage);
  const totalPages = calculateTotalPages(committees.length);
  const currentItems = getItemsForPage(committees, currentPage);

  return (
    <div>
      <header className="m-auto flex w-[70%] justify-between">
        <p className="h2">Executive Committee</p>
        <div className="dropdowns flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Tenure</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Group</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Team Type </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
              <DropdownMenuItem>test</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <section className="hierarchy mt-12 flex flex-col gap-6 px-[15%]">
        {currentPage === 1 ? (
          // Page 1: 12-column grid with specific positioning
          <div className="grid grid-cols-12 grid-rows-5 gap-4">
            {currentItems.map((member, index) => {
              const imageUrl = getCommitteeImageUrl(member);

              // Define positioning for each item based on the grid layout
              const gridPositions = [
                "col-span-2 col-start-6", // 1
                "col-span-2 col-start-2 row-start-2", // 2
                "col-span-2 col-start-4 row-start-2", // 3
                "col-span-2 col-start-6 row-start-2", // 4
                "col-span-2 col-start-8 row-start-2", // 5
                "col-span-2 col-start-10 row-start-2", // 6
                "col-span-2 row-start-3", // 7
                "col-span-2 col-start-3 row-start-3", // 8
                "col-span-2 col-start-5 row-start-3", // 9
                "col-span-2 col-start-7 row-start-3", // 10
                "col-span-2 col-start-9 row-start-3", // 11
                "col-span-2 col-start-11 row-start-3", // 12
                "col-span-2 row-start-4", // 13
                "col-span-2 col-start-3 row-start-4", // 14
                "col-span-2 col-start-5 row-start-4", // 15
                "col-span-2 col-start-7 row-start-4", // 16
                "col-span-2 col-start-9 row-start-4", // 17
                "col-span-2 col-start-11 row-start-4", // 18
                "col-span-2 row-start-5", // 19
                "col-span-2 col-start-3 row-start-5", // 20
                "col-span-2 col-start-5 row-start-5", // 21
                "col-span-2 col-start-7 row-start-5", // 22
                "col-span-2 col-start-9 row-start-5", // 23
                "col-span-2 col-start-11 row-start-5", // 24
              ];

              return (
                <div
                  key={member.id}
                  className={`${gridPositions[index]} flex justify-center`}
                >
                  <div className="member-card w-full max-w-[180px] overflow-hidden rounded-2xl bg-white bg-gradient-to-b from-[#E8EAF6] to-[#E3F2FD] p-[10px] pb-0 transition-shadow duration-300 hover:shadow-xl">
                    <div className="member-image relative max-h-[140px] min-h-[140px] overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={member.title.rendered}
                          fill
                          className="rounded-xl object-cover"
                          sizes="180px"
                        />
                      ) : (
                        <div className="bg-gray-300 h-full w-full" />
                      )}
                    </div>
                    <div className="p-3 text-center">
                      <p className="p2-semi-bold mb-1 text-[#1565C0]">
                        {member.title.rendered}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="label-regular">{member.committee_role}</p>
                        <span>•</span>
                        {member.committee_institution && (
                          <p className="label-regular">
                            {member.committee_institution}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Page 2+: 5 rows × 6 columns grid layout
          <div className="flex flex-col gap-4">
            {Array.from({
              length: Math.min(5, Math.ceil(currentItems.length / 6)),
            }).map((_, rowIndex) => {
              const rowStart = rowIndex * 6;
              const rowEnd = rowStart + 6;
              const rowItems = currentItems.slice(rowStart, rowEnd);

              return (
                <div
                  key={rowIndex}
                  className="grid grid-cols-6 justify-items-center gap-4"
                >
                  {rowItems.map((member) => {
                    const imageUrl = getCommitteeImageUrl(member);
                    return (
                      <div
                        key={member.id}
                        className="member-card w-full max-w-[180px] overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                      >
                        <div className="member-image bg-gray-200 relative h-40 w-full overflow-hidden">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={member.title.rendered}
                              fill
                              className="object-cover"
                              sizes="180px"
                            />
                          ) : (
                            <div className="bg-gray-300 h-full w-full" />
                          )}
                        </div>
                        <div className="bg-gradient-to-b from-[#E8EAF6] to-[#E3F2FD] p-3 text-center">
                          <p className="mb-1 line-clamp-2 text-sm font-semibold text-[#1565C0]">
                            {member.title.rendered}
                          </p>
                          <p className="text-gray-600 line-clamp-2 text-xs">
                            {member.committee_role}
                          </p>
                          {member.committee_institution && (
                            <p className="text-gray-500 mt-1 line-clamp-1 text-xs">
                              {member.committee_institution}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        useUrlParams={false}
      />

      <section className="banner-container mt-28">
        <BannerTwo />
      </section>
    </div>
  );
}

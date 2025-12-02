"use client";

import { Page, OurNCC, Region } from "@/lib/wordpress";
import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from "../animate-ui/primitives/base/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OurNCCTemplateProps {
  page: Page;
  ourNCCs: OurNCC[];
  regions?: Region[];
}

interface GroupedTenure {
  range: string;
  tenures: OurNCC[];
}

export default function OurNCCTemplate({
  page,
  ourNCCs = [],
  regions = [],
}: OurNCCTemplateProps) {
  // Group tenures by fixed 3-year blocks based on ncc_year_of_tenure
  const groupedTenures = useMemo(() => {
    const groups: Record<string, OurNCC[]> = {};

    ourNCCs.forEach((ncc) => {
      // ncc_year_of_tenure is a string like "2022"
      const year = parseInt(ncc.ncc_year_of_tenure);

      if (year) {
        // Map each year to its fixed 3-year block
        // 2023, 2024, 2025 -> "2023-26"
        // 2020, 2021, 2022 -> "2020-22"
        // 2026, 2027, 2028 -> "2026-29"
        let blockStartYear: number;

        if (year >= 2023 && year <= 2025) {
          blockStartYear = 2023;
        } else if (year >= 2020 && year <= 2022) {
          blockStartYear = 2020;
        } else if (year >= 2026 && year <= 2028) {
          blockStartYear = 2026;
        } else {
          // For other years, calculate the block dynamically
          // Find the nearest block start (years divisible by 3 offset)
          blockStartYear = Math.floor((year - 2020) / 3) * 3 + 2020;
        }

        const blockEndYear = blockStartYear + 2;
        const range = `${blockStartYear}-${blockEndYear.toString().slice(-2)}`;

        if (!groups[range]) {
          groups[range] = [];
        }
        groups[range].push(ncc);
      }
    });

    // Sort groups descending by year
    return Object.entries(groups)
      .sort(([rangeA], [rangeB]) => {
        const startA = parseInt(rangeA.split("-")[0]);
        const startB = parseInt(rangeB.split("-")[0]);
        return startB - startA;
      })
      .map(([range, tenures]) => ({ range, tenures }));
  }, [ourNCCs]);

  // Extract unique regions from data if regions prop is empty or to ensure matching
  const availableRegions = useMemo(() => {
    if (regions.length > 0) return regions;

    const uniqueRegionNames = Array.from(
      new Set(ourNCCs.map((ncc) => ncc.ncc_region).filter(Boolean)),
    );
    return uniqueRegionNames.map((name, index) => ({
      id: index,
      name: name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      taxonomy: "region" as const,
      count: 0,
      description: "",
      link: "",
      meta: {},
    }));
  }, [regions, ourNCCs]);

  return (
    <div>
      <section className="m-auto w-[90%] py-10 lg:w-[70%]">
        <h1 className="h2 text-gray-900 mb-8 text-3xl font-bold">
          {page.title.rendered}
        </h1>

        {groupedTenures.map((group) => (
          <TenureGroup
            key={group.range}
            range={group.range}
            tenures={group.tenures}
            regions={availableRegions}
          />
        ))}

        {/* Banner Block */}
        <div className="relative mt-16 flex flex-col items-center overflow-hidden rounded-2xl bg-blue-900 p-10 text-center text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-90"></div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="mb-4 text-2xl font-bold">
              Discover NRNA Committees, Taskforces & Subcommittees
            </h3>
            <p className="mb-6 text-blue-100">
              Working Together To Drive Key Initiatives And Responsibilities.
            </p>
            <Link
              href="/ourncc"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-blue-700 transition-colors hover:bg-blue-50"
            >
              View NCCs Tenure
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function TenureGroup({
  range,
  tenures,
  regions,
}: {
  range: string;
  tenures: OurNCC[];
  regions: Region[];
}) {
  const [selectedRegion, setSelectedRegion] = useState<string>(
    regions[0]?.slug || "",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter by region
  const filteredTenures = useMemo(() => {
    if (!selectedRegion) return tenures;
    return tenures.filter((tenure) => {
      // Match by region name since ncc_region is a string
      const region = regions.find((r) => r.slug === selectedRegion);
      return region && tenure.ncc_region === region.name;
    });
  }, [tenures, selectedRegion, regions]);

  // Pagination
  const totalPages = Math.ceil(filteredTenures.length / itemsPerPage);
  const paginatedTenures = filteredTenures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="mb-16">
      <h2 className="text-gray-800 mb-6 text-2xl font-semibold">
        NRNA NCCs Tenure ({range})
      </h2>

      <Tabs
        defaultValue={regions[0]?.slug || ""}
        onValueChange={(val) => {
          setSelectedRegion(val);
          setCurrentPage(1); // Reset page on region change
        }}
        className="w-full"
      >
        <TabsList className="border-gray-200 mb-8 h-auto w-full flex-wrap justify-start gap-6 border-b bg-transparent p-0">
          {regions.map((region) => (
            <TabsTab
              key={region.slug}
              value={region.slug}
              className="text-gray-500 hover:text-gray-700 rounded-none border-b-2 border-transparent bg-transparent px-0 py-2 transition-all data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
            >
              {region.name}
            </TabsTab>
          ))}
        </TabsList>

        <div className="mt-4">
          <div className="border-gray-100 overflow-hidden rounded-md border shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[60px]">S.N.</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>NCC Est. Date</TableHead>
                  <TableHead>Official Email</TableHead>
                  <TableHead>Website</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTenures.length > 0 ? (
                  paginatedTenures.map((tenure, index) => (
                    <TableRow key={tenure.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell>{tenure.ncc_country_name || "-"}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{tenure.ncc_name}</span>
                          <span className="text-gray-500 text-xs">
                            {tenure.ncc_role}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{tenure.ncc_est_date || "-"}</TableCell>
                      <TableCell>{tenure.ncc_official_email || "-"}</TableCell>
                      <TableCell>
                        {tenure.ncc_website ? (
                          <a
                            href={tenure.ncc_website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block max-w-[200px] truncate text-blue-600 hover:underline"
                          >
                            {tenure.ncc_website}
                          </a>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end space-x-2 py-4">
              <button
                className="hover:bg-gray-100 rounded-full p-2 disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>
              <button
                className="hover:bg-gray-100 rounded-full p-2 disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}

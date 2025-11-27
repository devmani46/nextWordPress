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
  // Group tenures by 3-year ranges based on ncc_year_of_tenure
  const groupedTenures = useMemo(() => {
    const groups: Record<string, OurNCC[]> = {};

    ourNCCs.forEach((ncc) => {
      // ncc_year_of_tenure is a string like "2022"
      const startYear = parseInt(ncc.ncc_year_of_tenure);

      if (startYear) {
        // Calculate the 3-year block
        // Example: 2023 -> 2023-25
        // Logic: range = `${startYear}-${(startYear + 2).toString().slice(-2)}`
        const endYear = startYear + 2;
        const range = `${startYear}-${endYear.toString().slice(-2)}`;
        
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
    
    const uniqueRegionNames = Array.from(new Set(ourNCCs.map(ncc => ncc.ncc_region).filter(Boolean)));
    return uniqueRegionNames.map((name, index) => ({
        id: index,
        name: name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        taxonomy: "region" as const,
        count: 0,
        description: "",
        link: "",
        meta: {}
    }));
  }, [regions, ourNCCs]);

  return (
    <div>
      <section className="m-auto w-[90%] lg:w-[70%] py-10">
        <h1 className="h2 mb-8 text-3xl font-bold text-gray-900">
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
        <div className="mt-16 relative rounded-2xl overflow-hidden bg-blue-900 text-white p-10 flex flex-col items-center text-center">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-90"></div>
             <div className="relative z-10 max-w-2xl">
                <h3 className="text-2xl font-bold mb-4">Discover NRNA Committees, Taskforces & Subcommittees</h3>
                <p className="mb-6 text-blue-100">Working Together To Drive Key Initiatives And Responsibilities.</p>
                <Link href="/ourncc" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors">
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
    regions[0]?.slug || ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter by region
  const filteredTenures = useMemo(() => {
    if (!selectedRegion) return tenures;
    return tenures.filter((tenure) => {
        // Match by region name since ncc_region is a string
        const region = regions.find(r => r.slug === selectedRegion);
        return region && tenure.ncc_region === region.name;
    });
  }, [tenures, selectedRegion, regions]);

  // Pagination
  const totalPages = Math.ceil(filteredTenures.length / itemsPerPage);
  const paginatedTenures = filteredTenures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
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
        <TabsList className="mb-6 flex-wrap h-auto bg-transparent border-b border-gray-200 w-full justify-start gap-6 p-0">
          {regions.map((region) => (
            <TabsTab
              key={region.slug}
              value={region.slug}
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent px-0 py-2 text-gray-500 hover:text-gray-700 border-b-2 border-transparent transition-all"
            >
              {region.name}
            </TabsTab>
          ))}
        </TabsList>

        <div className="mt-4">
            <div className="rounded-md border border-gray-100 overflow-hidden shadow-sm">
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
                                <span className="text-xs text-gray-500">{tenure.ncc_role}</span>
                            </div>
                        </TableCell>
                        <TableCell>{tenure.ncc_est_date || "-"}</TableCell>
                        <TableCell>{tenure.ncc_official_email || "-"}</TableCell>
                        <TableCell>
                            {tenure.ncc_website ? (
                                <a href={tenure.ncc_website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-[200px] block">
                                    {tenure.ncc_website}
                                </a>
                            ) : "-"}
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
                  className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                                currentPage === page
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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


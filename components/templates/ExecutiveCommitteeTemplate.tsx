import { Page, ExecutiveCommittee } from "@/lib/wordpress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import CircleFollowCard from "../banner/fw-banner";
import BannerTwo from "../banner/banner2";
import Image from "next/image";

interface ExecutiveCommitteeTemplateProps {
  page: Page;
  committees: ExecutiveCommittee[];
  currentPage?: number;
}

function getCommitteeImageUrl(committee: ExecutiveCommittee): string | undefined {
  if (committee.image_url) {
    return committee.image_url;
  }
  
  const embeddedUrl = committee._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  if (embeddedUrl) {
    return embeddedUrl;
  }
  
  return undefined;
}

function organizeCommitteesByHierarchy(
  committees: ExecutiveCommittee[],
  currentPage: number = 1
) {
  const sorted = [...committees].sort((a, b) => {
    if (a.hierarchy_order !== b.hierarchy_order) {
      return a.hierarchy_order - b.hierarchy_order;
    }
    return a.id - b.id;
  });

  const topLevelItems = sorted.filter((item) => item.hierarchy_order === 1);
  const topLevelItem = topLevelItems.length > 0 ? topLevelItems[0] : null;

  const queue = sorted.filter((item) => item.id !== topLevelItem?.id);

  if (currentPage === 1) {
    const rows: ExecutiveCommittee[][] = [];

    if (topLevelItem) {
      rows.push([topLevelItem]);
    }

    let queueIndex = 0;
    
    const firstRow: ExecutiveCommittee[] = [];
    const order2Items = queue.filter((item) => item.hierarchy_order === 2);
    
    for (let i = 0; i < Math.min(7, order2Items.length); i++) {
      firstRow.push(order2Items[i]);
      queueIndex++;
    }
    
    if (firstRow.length < 6) {
      const remainingNeeded = 6 - firstRow.length;
      const nextItems = queue.slice(queueIndex, queueIndex + remainingNeeded);
      firstRow.push(...nextItems);
      queueIndex += nextItems.length;
    }
    
    if (firstRow.length > 0) {
      rows.push(firstRow);
    }

    while (queueIndex < queue.length) {
      const row = queue.slice(queueIndex, queueIndex + 6);
      if (row.length > 0) {
        rows.push(row);
      }
      queueIndex += 6;
    }

    return { rows, queueIndex };
  } else {
    const rows: ExecutiveCommittee[][] = [];


    const order2Items = queue.filter((item) => item.hierarchy_order === 2);
    const firstRowCount = Math.min(6, queue.length);
    
    const itemsPerPage = 36;
    
    
    const page1ItemCount = 37; 
    const startIndex = page1ItemCount + (currentPage - 2) * itemsPerPage;
    
    let queueIndex = startIndex;
    
    while (queueIndex < queue.length && rows.length < 6) {
      const row = queue.slice(queueIndex, queueIndex + 6);
      if (row.length > 0) {
        rows.push(row);
      }
      queueIndex += 6;
    }

    return { rows, queueIndex };
  }
}

export default function ExecutiveCommitteeTemplate({
  page,
  committees,
  currentPage = 1,
}: ExecutiveCommitteeTemplateProps) {
  const { rows } = organizeCommitteesByHierarchy(committees, currentPage);

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

      <section className="hierarchy mt-6 flex flex-col gap-4 px-[15%]">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`row flex justify-center gap-4 ${
              row.length === 1 ? "" : "flex-wrap"
            }`}
          >
            {row.map((member) => {
              const imageUrl = getCommitteeImageUrl(member);
              return (
                <div
                  key={member.id}
                  className="member-card rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-3"
                >
                  <div className="member-image mb-2 h-36 w-36 rounded-xl bg-gray overflow-hidden relative">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={member.title.rendered}
                        fill
                        className="object-cover"
                        sizes="144px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300" />
                    )}
                  </div>
                  <p className="p2-semibold text-blue-normal">
                    {member.title.rendered}
                  </p>
                  <p className="label-regular">
                    {member.committee_role}
                    {member.committee_institution &&
                      ` | ${member.committee_institution}`}
                    {member.committee_country &&
                      ` | ${member.committee_country}`}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </section>

      <section className="banner-container mt-28">
        <BannerTwo />
      </section>
    </div>
  );
}

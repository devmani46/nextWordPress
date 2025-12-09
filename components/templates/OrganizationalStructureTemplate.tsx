import { OrganizationalStructurePage } from "@/lib/wordpress";
import Image from "next/image";

interface OrganizationalStructureTemplateProps {
  page: OrganizationalStructurePage;
}

export default function OrganizationalStructureTemplate({
  page,
}: OrganizationalStructureTemplateProps) {
  const title = page.meta.organizational_structure_title as string;
  const imageUrl = page.organizational_structure_image_url;
  const statTitle = page.meta.organizational_structure_stat_title as string;
  const statDescription = page.meta
    .organizational_structure_stat_description as string;

  return (
    <div className="container mx-auto px-4 py-8 md:px-[15%]">
      {/* Page Title */}
      <h1 className="h2 mb-8 text-black">{title}</h1>

      {/* Main Structure Image */}
      {imageUrl && (
        <div className="relative mb-12 flex w-full flex-col">
          <Image
            src={imageUrl}
            alt={title}
            width={1200}
            height={800}
            className="h-auto w-full"
            priority
          />
          <div className="mt-3 flex h-[72px] w-[50%] flex-col items-center justify-center self-end rounded-xl bg-[#2A2A6B] py-4 text-white">
            <p className="p1-medium leading-none">{statTitle}</p>
            <p className="h3 font-bold leading-none">{statDescription}</p>
          </div>
        </div>
      )}

      {/* Statistics Block */}
    </div>
  );
}

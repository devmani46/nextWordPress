import { getWordPressImage } from "@/lib/utils";
import { Page, Project } from "@/lib/wordpress";
import parse from "html-react-parser";
import Link from "next/link";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface ProjectContainerTemplateProps {
  page: Page;
  projects: Project[];
  pagination?: {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  };
}

export default function ProjectContainerTemplate({
  page,
  projects: initialProjects,
  pagination,
}: ProjectContainerTemplateProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [currentPage, setCurrentPage] = useState(
    pagination?.currentPage || 1,
  );
  const [loading, setLoading] = useState(false);
  const totalPages = pagination?.totalPages || 1;

  const loadPage = async (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage || loading) return;

    setLoading(true);
    // Scroll to top of the projects section
    const section = document.querySelector(".projects-container");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/projects?_embed&per_page=${
          pagination?.perPage || 9
        }&page=${page}`,
      );
      
      if (!res.ok) throw new Error("Failed to fetch projects");

      const newProjects: Project[] = await res.json();
      
      setProjects(newProjects);
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
          onClick={(e) => { e.preventDefault(); loadPage(1); }}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (currentPage > 3) {
       items.push(<PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>);
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
            onClick={(e) => { e.preventDefault(); loadPage(i); }}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (currentPage < totalPages - 2) {
      items.push(<PaginationItem key="ellipsis-end"><PaginationEllipsis /></PaginationItem>);
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={(e) => { e.preventDefault(); loadPage(totalPages); }}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <section className="px-[15%]">
      <p className="h3">Transformative Projects Worldwide</p>

      <div className={`projects-container mt-6 grid grid-cols-3 grid-rows-3 gap-8 transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
        {projects.map((project, index) => {
          const imageUrl = getWordPressImage(
            project._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
          );
          return (
            <Link href={`/projects/${project.slug}`} key={project.id}>
              <div
                className="project-card flex h-full max-w-80 flex-col overflow-hidden rounded-2xl border border-blue-light-hover bg-white pl-0 transition-transform duration-500 will-change-transform hover:scale-105"
              >
                <div className="project-card-text p-6">
                  <p className="label-medium mb-1 text-gray">
                    {new Date(project.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <div className="p1-medium line-clamp-2">{parse(project.title.rendered)}</div>
                </div>
                <div
                  className="project-card-image relative flex h-60 w-full flex-col justify-end bg-gray"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="buttons-container flex bg-gray bg-opacity-10 text-white backdrop-blur-lg">
                    <button className="basis-1/2 border-r border-t py-3 transition-colors hover:bg-blue-normal hover:text-white-light">
                      Register
                    </button>
                    <button className="basis-1/2 border-t py-3 transition-colors hover:bg-blue-normal hover:text-white-light">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); loadPage(currentPage - 1); }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {renderPaginationItems()}

              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); loadPage(currentPage + 1); }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
}

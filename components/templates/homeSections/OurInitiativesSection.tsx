import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import WhiteButton from "@/components/ui/whitebutton";
import { getWordPressImage } from "@/lib/utils";
import { getAllProjects, Project } from "@/lib/wordpress";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import { Skeleton } from "@/components/ui/skeleton";

interface OurInitiativesSectionProps {
  our_initiatives_title: string;
  our_initiatives_description: string;
}

export default function OurInitiativesSection({
  our_initiatives_title,
  our_initiatives_description,
}: OurInitiativesSectionProps) {
  const [projects, setProjects] = useState<Project[] | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" });

  const fetchData = async () => {
    if (hasFetched) return;
    setHasFetched(true);
    setIsLoading(true);

    try {
      //Execute the 'get' functions
      const [fetchedProjects] = await Promise.all([getAllProjects()]);
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Failed to fetch Projects", error);
    } finally {
      setIsLoading(false);
    }
  };

  //Fetch when the component comes into view
  useEffect(() => {
    if (isInView) {
      fetchData();
    }
  }, [isInView]);

  // Ensure data exists before trying to map
  const displayProjects = projects || [];

  return (
    <div ref={ref}>
      <div className="our-initiatives-text flex flex-col gap-3 pl-10 md:pl-[15%]">
        <p className="p1-regular">Our Initiatives</p>
        <p className="h3">{our_initiatives_title}</p>
        <div className="flex w-[80%] items-center justify-between">
          <p className="p1-regular text-gray">{our_initiatives_description}</p>
          <WhiteButton className="hidden md:flex" icon>
            View More
          </WhiteButton>
        </div>
      </div>
      {isLoading ? (
        <Carousel className="project-cards-container mt-11 flex gap-8">
          <CarouselContent className="flex gap-4 pb-10 pl-14 pt-4 md:pl-60">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <CarouselItem
                key={i}
                className="project-card flex max-w-80 flex-col overflow-hidden rounded-2xl bg-white pl-0"
              >
                {/* Text Section */}
                <div className="project-card-text flex flex-col gap-2 p-6">
                  <Skeleton className="h-4 w-28" /> {/* Date */}
                  <Skeleton className="h-5 w-3/4" /> {/* Title */}
                  <Skeleton className="h-5 w-2/3" /> {/* Title line 2 */}
                </div>

                {/* Image Section */}
                <div className="project-card-image bg-gray-200 relative flex h-60 w-full flex-col justify-end">
                  <Skeleton className="absolute inset-0 h-full w-full" />

                  {/* Buttons */}
                  <div className="buttons-container bg-gray-300 flex bg-opacity-20 backdrop-blur-lg">
                    <Skeleton className="h-10 basis-1/2 border-r" />
                    <Skeleton className="h-10 basis-1/2" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <Carousel className="project-cards-container mt-11 flex gap-8">
          <CarouselContent className="flex gap-4 pb-10 pl-14 pt-4 md:pl-60">
            {displayProjects.map((project) => {
              // get featured image URL
              const imageUrl = getWordPressImage(
                project._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
              );

              return (
                <CarouselItem
                  key={project.id}
                  className="project-card flex max-w-80 flex-col overflow-hidden rounded-2xl bg-white pl-0 transition-transform duration-500 will-change-transform hover:scale-105"
                >
                  <div className="project-card-text p-6">
                    <p className="label-medium mb-1 text-gray">
                      {new Date(project.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="p1-medium">{parse(project.title.rendered)}</p>
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
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
}

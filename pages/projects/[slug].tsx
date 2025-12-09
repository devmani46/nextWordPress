import BlueButton from "@/components/ui/bluebutton";
import { getAllProjects, getProjectBySlug, Project } from "@/lib/wordpress";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import CircleFollowCard from "@/components/banner/fw-banner";
import EventDownloadCard from "@/components/downloads/EventDownloadCard";
import OurInitiativesSection from "@/components/templates/homeSections/OurInitiativesSection";
import MoreProjectsSection from "@/components/templates/specificProjectSections/MoreProjects";
import MoreNewsSection from "@/components/templates/specificProjectSections/NewsSection";
import GalleryGrid from "@/components/gallery-grid/gallery-grid";
import WhiteButton from "@/components/ui/whitebutton";

export default function ProjectPage({ project }: { project: Project }) {
  const project_images = project.project_image_gallery || [];
  const project_date = new Date(project.project_date);
  const formattedDate = project_date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <section className="px-[15%]">
        <div className="flex items-center justify-between">
          <div>
            <p className="h2">{project.project_hero_title}</p>
            <p className="p1-medium text-gray">{formattedDate}</p>
          </div>
          <div className="flex gap-3">
            <Link href="#">
              <BlueButton>Donate Here</BlueButton>{" "}
            </Link>
            <Link href="#">
              <WhiteButton className="border border-blue-normal py-6 text-blue-normal">
                Share
              </WhiteButton>
            </Link>
          </div>
        </div>
        <p className="mt-3 text-xl font-medium italic text-blue-normal">
          {project.project_sub_title}
        </p>

        <div className="relative mt-6 h-[550px] w-full rounded-2xl bg-gray">
          {project._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <Image
              src={project._embedded["wp:featuredmedia"][0].source_url}
              alt="event-image"
              layout="fill"
              className="rounded-xl"
            />
          )}
        </div>

        <div className="description mt-20 px-[10%]">
          <p className="p1-regular text-gray">{project.project_description}</p>
        </div>

        <div className="objective mt-20 flex flex-col gap-3 px-[10%]">
          <p className="p1-regular">Objective</p>
          <p className="h3">{project.project_objective_title}</p>
          <div className="prose text-gray marker:text-gray">
            {parse(project.project_objective_description)}
          </div>
        </div>

        {project.project_locations && (
          <div className="mt-11 flex flex-col gap-6 px-[10%]">
            {project.project_locations.map(
              (
                location: { place: string; date: string; description: string },
                index: number,
              ) => (
                <div
                  className="location-div grid grid-cols-[200px_1fr] gap-40"
                  key={index}
                >
                  <p className="p1-medium flex-shrink-0">{location.place}</p>
                  <p className="text-gray">{location.description}</p>
                </div>
              ),
            )}
          </div>
        )}
      </section>

      <div className="banner mt-24 px-[15%]">
        <CircleFollowCard />
      </div>

      <section className="downloads mt-20 px-[15%]">
        <p className="h3 mb-6">Downloads</p>
        <div className="flex gap-2">
          {project.project_downloads.map(
            (
              item: {
                title: string;
                file: {
                  id: number;
                  url: string;
                  filename: string;
                };
              },
              index: number,
            ) => (
              <div className="basis-1/3">
                <EventDownloadCard key={index} download={item} />
              </div>
            ),
          )}
        </div>
      </section>

      <section className="mt-20 px-[15%]">
        <MoreNewsSection latest_news_title="News" latest_news_description="" />
      </section>

      <section className="mt-20">
        <GalleryGrid image_list={project_images} />
      </section>

      <section className="more-projects mt-20 bg-[linear-gradient(to_bottom,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_60%,transparent_60%,transparent_100%)] py-20">
        <MoreProjectsSection
          our_initiatives_title="More Projects"
          our_initiatives_description="Explore NRNA projects driving impact across communities and supporting global nepali initiatives"
          project_slug={project.slug}
        />
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getAllProjects();
  const paths = projects.map((project: any) => ({
    params: { slug: project.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
    },
    revalidate: 10,
  };
};

import {
  getPageBySlug,
  getAllPages,
  getAllNotices,
  getAllProjects,
  getAllEvents,
  getAllNews,
  getAllActivities,
  getAllOurNCCs,
  getAllExecutiveCommittees,
  getFeaturedMediaById,
} from "@/lib/wordpress";
import { Page as WPPage } from "@/lib/wordpress";

import HomeTemplate from "@/components/templates/HomeTemplate";
import DefaultTemplate from "@/components/templates/DefaultTemplate";
import ActivitiesTemplate from "@/components/templates/ActivitiesTemplate";
import WhoWeAreTemplate from "@/components/templates/WhoWeAre";
import ExecutiveCommitteeTemplate from "@/components/templates/ExecutiveCommitteeTemplate";
import OurNCCTemplate from "@/components/templates/OurNCCTemplate";
import CommitteesTaskforcesTemplate from "@/components/templates/CommitteesTaskforcesTemplate";
import EventtestTemplate from "@/components/templates/EventTestTemplate";

import { GetStaticProps } from "next";
import OrganizationalStructureTemplate from "@/components/templates/OrganizationalStructureTemplate";
import VideosTemplate from "@/components/templates/VideosTemplate";
import PhotoAlbumTemplate from "@/components/templates/PhotoAlbumTemplate";

export async function getStaticPaths() {
  try {
    const pages = await getAllPages();

    if (!Array.isArray(pages)) {
      console.error("getAllPages returned non-array data:", pages);
      return {
        paths: [],
        fallback: "blocking",
      };
    }

    // Filter out any pages that might be undefined or have no slug
    const validPages = pages.filter((page) => page && page.slug);

    return {
      paths: validPages.map((page) => ({
        params: { slug: page.slug },
      })),
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  if (!slug) {
    console.error("Page slug is undefined in getStaticProps");
    return { notFound: true };
  }

  try {
    const page = await getPageBySlug(slug);

    if (!page) {
      console.log(`Page not found for slug: ${slug}`);
      return { notFound: true };
    }

    const props: any = {
      page,
      slug,
    };

    // Fetch additional data for specific pages
    if (slug === "home") {
      const [whowearePage, notices, projects, events, news] = await Promise.all(
        [
          getPageBySlug("whoweare"),
          getAllNotices(),
          getAllProjects(),
          getAllEvents(),
          getAllNews(),
        ],
      );

      props.whowearePage = whowearePage;
      props.notices = notices;
      props.projects = projects;
      props.events = events;
      props.news = news;
    }

    if (slug === "activities") {
      const activities = await getAllActivities();
      props.activities = activities;
    }

    if (slug === "ourncc") {
      const ourNCCs = await getAllOurNCCs();
      props.ourNCCs = ourNCCs;
    }

    if (slug === "executivecommittee") {
      const committees = await getAllExecutiveCommittees();
      
      // Always fetch featured media separately since _embedded is not reliable
      if (committees && committees.length > 0) {
        const committeesWithMedia = await Promise.all(
          committees.map(async (committee) => {
            if (committee.featured_media && committee.featured_media > 0) {
              try {
                const media = await getFeaturedMediaById(committee.featured_media);
                return {
                  ...committee,
                  image_url: media.source_url, // Direct property for easy access
                  _embedded: {
                    "wp:featuredmedia": [media]
                  }
                };
              } catch (error) {
                console.error(`Failed to fetch media ${committee.featured_media}:`, error);
                return committee;
              }
            }
            return committee;
          })
        );
        props.committees = committeesWithMedia;
      } else {
        props.committees = committees;
      }
    }

    return {
      props,
      revalidate: 10,
    };
  } catch (error) {
    console.error(`Error in getStaticProps for slug ${slug}:`, error);
    return { notFound: true };
  }
};

export default function Page(props: any) {
  const { page, slug } = props;
  let Template;

  switch (slug) {
    case "home":
      Template = HomeTemplate;
      break;
    case "activities":
      Template = ActivitiesTemplate;
      break;
    case "eventtest":
      Template = EventtestTemplate;
      break;
    case "whoweare":
      Template = WhoWeAreTemplate;
      break;
    case "executivecommittee":
      Template = ExecutiveCommitteeTemplate;
      break;
    case "ourncc":
      Template = OurNCCTemplate;
      break;
    case "committeestaskforce":
      Template = CommitteesTaskforcesTemplate;
      break;
    case "nrna-organizational-structure":
      Template = OrganizationalStructureTemplate;
      break;
    // case "videos":
    //   Template = VideosTemplate;
    //   break;
    // case "photo-album":
    //   Template = PhotoAlbumTemplate;
    //   break;
    default:
      Template = DefaultTemplate;
  }

  return <Template {...props} />;
}

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
      props.committees = committees;
    }

    if (slug === "committeestaskforce") {
      const rawPage = page as any;

      // Initialize meta if it doesn't exist
      if (!page.meta) {
        page.meta = {};
      }

      // Map Hero
      if (rawPage.hero) {
        page.meta.hero_title = rawPage.hero.title;
        page.meta.hero_description = rawPage.hero.description;

        // Fetch Hero Images
        if (Array.isArray(rawPage.hero.images)) {
          const heroImageUrls = await Promise.all(
            rawPage.hero.images.map(async (imgObj: any) => {
              const id = typeof imgObj === "object" ? imgObj.image : imgObj;
              if (id) {
                try {
                  const media = await getFeaturedMediaById(Number(id));
                  return media.source_url;
                } catch (e) {
                  console.error(`Failed to fetch hero image ${id}`, e);
                  return null;
                }
              }
              return null;
            }),
          );
          page.meta.hero_images = heroImageUrls.filter(
            (url) => url !== null,
          ) as string[];
        }
      }

      // Map Why
      if (rawPage.why) {
        page.meta.why_title = rawPage.why.title;
        page.meta.why_description = rawPage.why.description;

        if (rawPage.why.image) {
          try {
            const media = await getFeaturedMediaById(Number(rawPage.why.image));
            page.meta.why_image = media.source_url;
          } catch (e) {
            console.error(`Failed to fetch why image ${rawPage.why.image}`, e);
          }
        }
      }

      // Map How
      if (rawPage.how) {
        page.meta.how_title = rawPage.how.title;
        page.meta.how_description = rawPage.how.description;

        if (rawPage.how.image) {
          try {
            const media = await getFeaturedMediaById(Number(rawPage.how.image));
            page.meta.how_image = media.source_url;
          } catch (e) {
            console.error(`Failed to fetch how image ${rawPage.how.image}`, e);
          }
        }
      }

      // Map Banner 1
      if (rawPage.banner1) {
        page.meta.banner1_title = rawPage.banner1.title;
        page.meta.banner1_description = rawPage.banner1.description;
        page.meta.banner1_cta_link = rawPage.banner1.cta_link;
        page.meta.banner1_cta_title = rawPage.banner1.cta_title;
        page.meta.banner1_stats = rawPage.banner1.stats;
      }

      // Map Teams
      if (rawPage.teams) {
        page.meta.teams_members = rawPage.teams.members;
      }

      // Map Banner 2
      if (rawPage.banner2) {
        page.meta.banner2_title = rawPage.banner2.title;
        page.meta.banner2_description = rawPage.banner2.description;
        page.meta.banner2_cta_link = rawPage.banner2.cta_link;
        page.meta.banner2_cta_title = rawPage.banner2.cta_title;
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

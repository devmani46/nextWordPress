import {
  getPageBySlug,
  getAllPages,
  getAllNotices,
  getAllProjects,
  getAllEvents,
  getAllNews,
  getAllActivities,
  getActivitiesPaginated,
  getProjectsPaginated,
  getAllOurNCCs,
  getAllExecutiveCommittees,
  getFeaturedMediaById,
  getAllGalleries,
  getAllVideos,
  getGalleriesPaginated,
  getVideosPaginated,
  getAllRegionalMeetings,
  getRegionalMeetingsPaginated,
  getAllNoticeCategories,
} from "@/lib/wordpress";
import { Page as WPPage } from "@/lib/wordpress";

import HomeTemplate from "@/components/templates/HomeTemplate";
import DefaultTemplate from "@/components/templates/DefaultTemplate";
import ActivitiesTemplate from "@/components/templates/ActivitiesTemplate";
import NewsTemplate from "@/components/templates/NewsTemplate";
import NoticesTemplate from "@/components/templates/NoticesTemplate";
import WhoWeAreTemplate from "@/components/templates/WhoWeAre";
import ExecutiveCommitteeTemplate from "@/components/templates/ExecutiveCommitteeTemplate";
import OurNCCTemplate from "@/components/templates/OurNCCTemplate";
import CommitteesTaskforcesTemplate from "@/components/templates/CommitteesTaskforcesTemplate";
import EventtestTemplate from "@/components/templates/EventTestTemplate";

import { GetStaticProps } from "next";
import OrganizationalStructureTemplate from "@/components/templates/OrganizationalStructureTemplate";
import VideosTemplate from "@/components/templates/VideosTemplate";
import PhotoAlbumTemplate from "@/components/templates/PhotoAlbumTemplate";
import EventContainerTemplate from "@/components/templates/EventContainerTemplate";
import PrivacyPolicyTemplate from "@/components/templates/PrivacyPolicyTemplate";
import TermsAndConditionsTemplate from "@/components/templates/TermsAndConditionsTemplate";
import ProjectContainerTemplate from "@/components/templates/ProjectsContainerTemplate";
import NRNADiscountTemplate from "@/components/templates/NRNADiscountTemplate";
import RegionalMeetingsContainerTemplate from "@/components/templates/RegionalMeetingsContainer";
import ContactUsTemplate from "@/components/templates/ContactUsTemplate";
import ReportsPublicationsPage from "@/components/templates/ReportsPublicationsPage";
import { getAllReports, getReportsMenu } from "@/lib/wordpress";

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
      const [whowearePage] = await Promise.all(
        //old [whowearePage, notices, projects, events, news]
        [
          getPageBySlug("whoweare"),
          // getAllNotices(),
          // getAllProjects(),
          // getAllEvents(),
          // getAllNews(),
        ],
      );

      props.whowearePage = whowearePage;
      // props.notices = notices;
      // props.projects = projects;
      // props.events = events;
      // props.news = news;
    }

    if (slug === "activities") {
      const allActivities = await getAllActivities();

      const perPage = 13;
      const total = allActivities.length;
      const totalPages = Math.ceil(total / perPage);

      props.allActivities = allActivities;
      props.activities = allActivities.slice(0, perPage);
      props.pagination = {
        total,
        totalPages,
        currentPage: 1,
        perPage,
      };
    }

    if (slug === "events") {
      const events = await getAllEvents();
      props.events = events;
    }

    if (slug === "news") {
      const allNews = await getAllNews();

      const perPage = 13;
      const total = allNews.length;
      const totalPages = Math.ceil(total / perPage);

      props.allNews = allNews;
      props.news = allNews.slice(0, perPage);
      props.pagination = {
        total,
        totalPages,
        currentPage: 1,
        perPage,
      };
    }

    if (slug === "notices") {
      const [allNotices, categories] = await Promise.all([
        getAllNotices(),
        getAllNoticeCategories(),
      ]);

      const perPage = 13;
      const total = allNotices.length;
      const totalPages = Math.ceil(total / perPage);

      props.allNotices = allNotices;
      props.notices = allNotices.slice(0, perPage);
      props.categories = categories;
      props.pagination = {
        total,
        totalPages,
        currentPage: 1,
        perPage,
      };
    }

    if (slug === "regionalmeetings") {
      const perPage = 13;
      const regionalMeetingsData = await getRegionalMeetingsPaginated(
        1,
        perPage,
      );

      props.regional_meetings = regionalMeetingsData.data;
      props.pagination = {
        total: regionalMeetingsData.headers.total,
        totalPages: regionalMeetingsData.headers.totalPages,
        currentPage: 1,
        perPage,
      };
    }

    if (slug === "projects") {
      const perPage = 9;
      const projectsData = await getProjectsPaginated(1, perPage);

      props.projects = projectsData.data;
      props.pagination = {
        total: projectsData.headers.total,
        totalPages: projectsData.headers.totalPages,
        currentPage: 1,
        perPage,
      };
    }

    if (slug === "ourncc") {
      const ourNCCs = await getAllOurNCCs();
      props.ourNCCs = ourNCCs;
    }

    if (slug === "executivecommittee") {
      const committees = await getAllExecutiveCommittees();
      props.committees = committees;
    }

    if (slug === "reports-publications") {
      const reports = await getAllReports();
      const menuItems = await getReportsMenu();
      
      // Get navbar categories
      const rootItem = menuItems.find(item => item.title === "Reports & Publications") || menuItems[0];
      const navbarCategories = rootItem?.children?.map(cat => cat.title) || [];
      
      // Filter to only show reports that have at least one category in navbar (case-insensitive)
      const filteredReports = reports.filter(report =>
        report.category_titles.some(cat => 
          navbarCategories.some(navCat => navCat.toLowerCase() === cat.toLowerCase())
        )
      );
      
      props.reports = filteredReports;
      props.pagination = { total: filteredReports.length, totalPages: Math.ceil(filteredReports.length / 12) };
    }

    if (slug === "photo-album") {
      const allGalleries = await getAllGalleries();

      const perPage = 12;
      const total = allGalleries.length;
      const totalPages = Math.ceil(total / perPage);

      props.allGalleries = allGalleries;
      props.galleries = allGalleries.slice(0, perPage);
      props.pagination = {
        total,
        totalPages,
        currentPage: 1,
        perPage,
      };
    }

    if (slug === "videos") {
      // Fetch all videos from WordPress for client-side pagination
      const allVideos = await getAllVideos();

      const perPage = 12; // 4x3 grid
      const total = allVideos.length;
      const totalPages = Math.ceil(total / perPage);

      props.allVideos = allVideos;
      props.videos = allVideos.slice(0, perPage);
      props.pagination = {
        total,
        totalPages,
        currentPage: 1,
        perPage,
      };
    }

    if (slug === "committeestaskforce") {
      const rawPage = page as any;

      if (!page.meta) {
        page.meta = {};
      }

      if (rawPage.hero) {
        page.meta.hero_title = rawPage.hero.title;
        page.meta.hero_description = rawPage.hero.description;

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

      if (rawPage.banner1) {
        page.meta.banner1_title = rawPage.banner1.title;
        page.meta.banner1_description = rawPage.banner1.description;
        page.meta.banner1_cta_link = rawPage.banner1.cta_link;
        page.meta.banner1_cta_title = rawPage.banner1.cta_title;
        page.meta.banner1_stats = rawPage.banner1.stats;
      }

      if (rawPage.teams) {
        page.meta.teams_members = rawPage.teams.members;
      }

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
    case "videos":
      Template = VideosTemplate;
      break;
    case "photo-album":
      Template = PhotoAlbumTemplate;
      break;
    case "events":
      Template = EventContainerTemplate;
      break;
    case "news":
      Template = NewsTemplate;
      break;
    case "notices":
      Template = NoticesTemplate;
      break;
    case "regionalmeetings":
      Template = RegionalMeetingsContainerTemplate;
      break;
    case "projects":
      Template = ProjectContainerTemplate;
      break;
    case "nrnadiscount":
      Template = NRNADiscountTemplate;
      break;
    case "privacy-policy":
      Template = PrivacyPolicyTemplate;
      break;
    case "terms-and-conditions":
      Template = TermsAndConditionsTemplate;
      break;
    case "contact-us":
      Template = ContactUsTemplate;
      break;
    case "reports-publications":
      Template = ReportsPublicationsPage;
      break;
    default:
      Template = DefaultTemplate;
  }

  return <Template {...props} />;
}

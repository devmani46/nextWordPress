import {
  getPageBySlug,
  getAllPages,
  getAllNotices,
  getAllProjects,
  getAllEvents,
  getAllNews,
  getAllActivities,
  getAllOurNCCs,
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

export async function getStaticPaths() {
  const pages = await getAllPages();

  return {
    paths: pages.map((page) => ({
      params: { slug: page.slug },
    })),
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const page = await getPageBySlug(slug);

  if (!page) {
    return { notFound: true };
  }

  const props: any = {
    page,
    slug,
  };

  // Fetch additional data for specific pages
  if (slug === "home") {
    const [whowearePage, notices, projects, events, news] = await Promise.all([
      getPageBySlug("whoweare"),
      getAllNotices(),
      getAllProjects(),
      getAllEvents(),
      getAllNews(),
    ]);

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

  return {
    props,
    revalidate: 10,
  };
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
    default:
      Template = DefaultTemplate;
  }

  return <Template {...props} />;
}

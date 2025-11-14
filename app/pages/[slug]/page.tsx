// import { getPageBySlug, getAllPages } from "@/lib/wordpress";
// import { Section, Container, Prose } from "@/components/craft";
// import { siteConfig } from "@/site.config";

// import type { Metadata } from "next";

// // Revalidate pages every hour
// export const revalidate = 3600;

// export async function generateStaticParams() {
//   const pages = await getAllPages();

//   return pages.map((page) => ({
//     slug: page.slug,
//   }));
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//   const { slug } = await params;
//   const page = await getPageBySlug(slug);

//   if (!page) {
//     return {};
//   }

//   const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
//   ogUrl.searchParams.append("title", page.title.rendered);
//   // Strip HTML tags for description and limit length
//   const description = page.excerpt?.rendered
//     ? page.excerpt.rendered.replace(/<[^>]*>/g, "").trim()
//     : page.content.rendered
//         .replace(/<[^>]*>/g, "")
//         .trim()
//         .slice(0, 200) + "...";
//   ogUrl.searchParams.append("description", description);

//   return {
//     title: page.title.rendered,
//     description: description,
//     openGraph: {
//       title: page.title.rendered,
//       description: description,
//       type: "article",
//       url: `${siteConfig.site_domain}/pages/${page.slug}`,
//       images: [
//         {
//           url: ogUrl.toString(),
//           width: 1200,
//           height: 630,
//           alt: page.title.rendered,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: page.title.rendered,
//       description: description,
//       images: [ogUrl.toString()],
//     },
//   };
// }

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const page = await getPageBySlug(slug);

//   return (
//     <Section>
//       <Container>
//         <Prose>
//           <h2>{page.title.rendered}</h2>
//           <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
//         </Prose>
//       </Container>
//     </Section>
//   );
// }

import { getPageBySlug, getAllPages } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import HomeTemplate from "@/components/templates/HomeTemplate";
import DefaultTemplate from "@/components/templates/DefaultTemplate";
import ActivitiesTemplate from "@/components/templates/ActivitiesTemplate";
import WhoWeAreTemplate from "@/components/templates/WhoWeAre";
import ExecutiveCommitteeTemplate from "@/components/templates/ExecutiveCommitteeTemplate";
import OurNCCTemplate from "@/components/templates/OurNCCTemplate";
import CommitteesTaskforcesTemplate from "@/components/templates/CommitteesTaskforcesTemplate";

export const revalidate = 10;

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return <div>Page not found</div>;
  }

  let Template;

  switch (slug) {
    case "home":
      Template = HomeTemplate;
      break;
    case "activities":
      Template = ActivitiesTemplate;
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

  return (
    // <Section>
    //   <Container>
    //     <Prose>
    <Template page={page} />
    //     </Prose>
    //   </Container>
    // </Section>
  );
}

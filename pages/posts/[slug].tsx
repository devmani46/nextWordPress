import {
  getPostBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
  getAllPostSlugs,
} from "@/lib/wordpress";

import { Section, Container, Article, Prose } from "@/components/craft";
import { badgeVariants } from "@/components/ui/badge";
import { cn, getWordPressImage } from "@/lib/utils";
import Image from "next/image";
import { siteConfig } from "@/site.config";

import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

export default function Page({
  post,
  featuredMedia,
  author,
  category,
  date,
}: {
  post: any;
  featuredMedia: any;
  author: any;
  category: any;
  date: string;
}) {
  if (!post) {
    return null;
  }

  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  const ogUrl = `${siteConfig.site_domain}/posts/${post.slug}`;

  return (
    <>
      <Head>
        <title>{post.title.rendered}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={post.title.rendered} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={ogUrl} />
        <meta
          property="og:image"
          content={`${siteConfig.site_domain}/api/og?title=${encodeURIComponent(
            post.title.rendered
          )}&description=${encodeURIComponent(description)}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title.rendered} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`${siteConfig.site_domain}/api/og?title=${encodeURIComponent(
            post.title.rendered
          )}&description=${encodeURIComponent(description)}`}
        />
      </Head>
      <Section>
        <Container>
          <Prose>
            <h1>
              <Balancer>
                <span
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                ></span>
              </Balancer>
            </h1>
            <div className="flex justify-between items-center gap-4 text-sm mb-4">
              <h5>
                Published {date} by{" "}
                {author.name && (
                  <span>
                    <a href={`/posts/?author=${author.id}`}>{author.name}</a>{" "}
                  </span>
                )}
              </h5>

              <Link
                href={`/posts/?category=${category.id}`}
                className={cn(
                  badgeVariants({ variant: "outline" }),
                  "!no-underline"
                )}
              >
                {category.name}
              </Link>
            </div>
            {featuredMedia?.source_url && (
              <div className="h-96 my-12 md:h-[500px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25 relative">
                <Image
                  className="object-cover"
                  src={getWordPressImage(featuredMedia.source_url)}
                  alt={post.title.rendered}
                  fill
                />
              </div>
            )}
          </Prose>

          <Article
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </Container>
      </Section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllPostSlugs();
  // Filter out any undefined or invalid slug items
  const paths = slugs
    .filter((slug) => slug && slug.slug)
    .map((slug) => ({
      params: { slug: slug.slug },
    }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const featuredMedia = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const author = await getAuthorById(post.author);
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = await getCategoryById(post.categories[0]);

  return {
    props: {
      post,
      featuredMedia,
      author,
      category,
      date,
    },
    revalidate: 10,
  };
};

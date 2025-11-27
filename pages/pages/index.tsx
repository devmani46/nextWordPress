import { getAllPages } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import BackButton from "@/components/back";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";

export default function Page({ pages }: { pages: any[] }) {
  return (
    <>
      <Head>
        <title>All Pages</title>
        <meta name="description" content="Browse all pages of our blog posts" />
        <link rel="canonical" href="/posts/pages" />
      </Head>
      <Section>
        <Container className="space-y-6">
          <Prose className="mb-8">
            <h2>All Pages</h2>
            <ul className="grid">
              {pages.map((page: any) => (
                <li key={page.id}>
                  <Link href={`/${page.slug}`}>{page.title.rendered}</Link>
                </li>
              ))}
            </ul>
          </Prose>
          <BackButton />
        </Container>
      </Section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pages = await getAllPages();
  return {
    props: {
      pages,
    },
    revalidate: 600,
  };
};

import { getAllTags } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import BackButton from "@/components/back";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";

export default function Page({ tags }: { tags: any[] }) {
  return (
    <>
      <Head>
        <title>All Tags</title>
        <meta name="description" content="Browse all tags of our blog posts" />
        <link rel="canonical" href="/posts/tags" />
      </Head>
      <Section>
        <Container className="space-y-6">
          <Prose className="mb-8">
            <h2>All Tags</h2>
            <ul className="grid">
              {tags.map((tag: any) => (
                <li key={tag.id}>
                  <Link href={`/posts/?tag=${tag.id}`}>{tag.name}</Link>
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
  const tags = await getAllTags();
  return {
    props: {
      tags,
    },
    revalidate: 600,
  };
};

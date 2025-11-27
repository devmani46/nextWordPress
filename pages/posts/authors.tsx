import { getAllAuthors } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import BackButton from "@/components/back";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";

export default function Page({ authors }: { authors: any[] }) {
  return (
    <>
      <Head>
        <title>All Authors</title>
        <meta name="description" content="Browse all authors of our blog posts" />
        <link rel="canonical" href="/posts/authors" />
      </Head>
      <Section>
        <Container className="space-y-6">
          <Prose className="mb-8">
            <h2>All Authors</h2>
            <ul className="grid">
              {authors.map((author: any) => (
                <li key={author.id}>
                  <Link href={`/posts/?author=${author.id}`}>{author.name}</Link>
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
  const authors = await getAllAuthors();
  return {
    props: {
      authors,
    },
    revalidate: 600,
  };
};

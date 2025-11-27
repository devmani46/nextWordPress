import { getAllCategories } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import BackButton from "@/components/back";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";

export default function Page({ categories }: { categories: any[] }) {
  return (
    <>
      <Head>
        <title>All Categories</title>
        <meta
          name="description"
          content="Browse all categories of our blog posts"
        />
        <link rel="canonical" href="/posts/categories" />
      </Head>
      <Section>
        <Container className="space-y-6">
          <Prose className="mb-8">
            <h2>All Categories</h2>
            <ul className="grid">
              {categories.map((category: any) => (
                <li key={category.id}>
                  <Link href={`/posts/?category=${category.id}`}>
                    {category.name}
                  </Link>
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
  const categories = await getAllCategories();
  return {
    props: {
      categories,
    },
    revalidate: 600,
  };
};

import { getNewsBySlug, getAllNews, getNewsByIds, News } from "@/lib/wordpress";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { parseActivityContent } from "@/lib/parseActivityContent";

interface NewsPageProps {
  news: News;
  relatedNews: News[];
}

export default function NewsPage({ news, relatedNews }: NewsPageProps) {
  if (!news) {
    return <div className="p-10 text-center">News not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 lg:px-[10%]">
      {/* Title */}
      <h1
        className="mb-2 text-3xl font-bold leading-tight lg:text-4xl"
        dangerouslySetInnerHTML={{ __html: news.title.rendered }}
      />
      
      {/* Date */}
      <p className="mb-6 text-sm text-gray-600">
        {new Date(news.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Main Content Layout */}
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Main Content Area - 2/3 width */}
        <div className="activity-content flex-1 lg:basis-2/3">
          {/* Featured Image */}
          {news._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <img
              src={news._embedded["wp:featuredmedia"][0].source_url}
              alt={news.title.rendered}
              className="mb-6 w-full rounded-lg object-cover"
            />
          )}

          {/* News Content with WYSIWYG and YouTube embedding */}
          <div className="prose prose-lg max-w-none whitespace-pre-wrap">
            {parseActivityContent(
              news.news_content || news.content?.rendered || ""
            )}
          </div>
        </div>

        {/* Related News Sidebar - 1/3 width */}
        {relatedNews && relatedNews.length > 0 && (
          <aside className="lg:basis-1/3">
            <h2 className="mb-4 text-xl font-semibold">Other News</h2>
            <div className="flex flex-col gap-4">
              {relatedNews.map((relatedItem) => (
                <Link
                  key={relatedItem.id}
                  href={`/news/${relatedItem.slug}`}
                  className="group flex gap-3 rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-4 transition-all hover:shadow-md"
                >
                  {/* Thumbnail */}
                  <div className="h-[68px] w-[78px] flex-shrink-0 overflow-hidden rounded-xl bg-gray-200">
                    {relatedItem._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                      <img
                        src={relatedItem._embedded["wp:featuredmedia"][0].source_url}
                        alt={relatedItem.title.rendered}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-blue-100 to-blue-200" />
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="mb-1 text-xs text-gray-600">
                      {new Date(relatedItem.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p
                      className="line-clamp-2 text-sm font-medium leading-tight group-hover:text-blue-600"
                      dangerouslySetInnerHTML={{ __html: relatedItem.title.rendered }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allNews = await getAllNews();
  const paths = allNews.map((news: News) => ({
    params: { slug: news.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const news = await getNewsBySlug(slug);

  if (!news) {
    return {
      notFound: true,
    };
  }

  // Fetch related news if they exist
  let relatedNews: News[] = [];
  if (news.news_related && news.news_related.length > 0) {
    const relatedIds = news.news_related.map((id) => parseInt(id, 10));
    relatedNews = await getNewsByIds(relatedIds);
  }

  return {
    props: {
      news,
      relatedNews,
    },
    revalidate: 10,
  };
};

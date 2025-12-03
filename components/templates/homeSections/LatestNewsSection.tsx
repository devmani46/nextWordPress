import WhiteButton from "@/components/ui/whitebutton";
import { getWordPressImage } from "@/lib/utils";
import { getAllNews, News } from "@/lib/wordpress";
import { useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface LatestNewsAndUpdatesSectionProps {
  latest_news_title: string;
  latest_news_description: string;
}

export default function LatestNewsAndUpdatesSection({
  latest_news_title,
  latest_news_description,
}: LatestNewsAndUpdatesSectionProps) {
  const [news, setNews] = useState<News[] | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" });

  const fetchData = async () => {
    if (hasFetched) return;
    setHasFetched(true);
    setIsLoading(true);

    try {
      //Execute the 'get' functions
      const [fetchedNews] = await Promise.all([getAllNews()]);
      setNews(fetchedNews);
    } catch (error) {
      console.error("Failed to fetch news", error);
    } finally {
      setIsLoading(false);
    }
  };

  //Fetch when the component comes into view
  useEffect(() => {
    if (isInView) {
      fetchData();
    }
  }, [isInView]);

  // Ensure data exists before trying to map
  const displayNews = news || [];

  return (
    <div ref={ref}>
      <div className="latest-news-text mb-10 flex flex-col gap-3">
        <p className="p1-regular">Latest News & Updates</p>
        <p className="h3">{latest_news_title}</p>
        <div className="flex w-full items-center justify-between">
          <p className="p1-regular">{latest_news_description}</p>
          <WhiteButton
            className="invisible border border-gray border-opacity-10 md:visible"
            icon
          >
            View More
          </WhiteButton>
        </div>
      </div>

      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <p>Loading news...</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 lg:flex-nowrap">
          {displayNews.length > 0 && (
            <div className="big-news flex flex-col gap-2 transition-transform hover:cursor-pointer">
              <div className="image-container h-[80%] w-full overflow-hidden rounded-xl">
                <Image
                  src={getWordPressImage(
                    displayNews?.[0]._embedded?.["wp:featuredmedia"]?.[0]
                      ?.source_url,
                  )}
                  className="big-news-image mb-3 w-full object-cover transition-transform duration-500 hover:scale-110"
                  alt="latest news image"
                  width={600}
                  height={400}
                />
              </div>
              <p className="label-medium text-gray">
                {new Date(displayNews?.[0].date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="font-bold">{displayNews?.[0].title.rendered}</p>
            </div>
          )}
          <div className="more-news flex flex-col gap-3 divide-y divide-black divide-opacity-30">
            {displayNews.slice(1, 5).map((single_news, index) => (
              <div
                key={index}
                className="news-card flex flex-col gap-2 pt-3 transition-transform duration-500 will-change-transform hover:-translate-x-1 hover:-translate-y-1 hover:cursor-pointer"
              >
                <p className="label-medium text-gray">
                  {new Date(single_news.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="font-bold">{single_news.title.rendered}</p>
              </div>
            ))}
          </div>
          <WhiteButton
            className="border border-gray border-opacity-10 lg:hidden"
            icon
          >
            View More
          </WhiteButton>
        </div>
      )}
    </div>
  );
}

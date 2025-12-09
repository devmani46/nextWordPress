import { Skeleton } from "@/components/ui/skeleton";
import WhiteButton from "@/components/ui/whitebutton";
import { getWordPressImage } from "@/lib/utils";
import { getAllNews, News } from "@/lib/wordpress";
import { useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface MoreNewsSectionProps {
  latest_news_title: string;
  latest_news_description: string;
}

export default function MoreNewsSection({
  latest_news_title,
  latest_news_description,
}: MoreNewsSectionProps) {
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
      <div className="latest-news-text mb-5 flex flex-col gap-3">
        <p className="h3">{latest_news_title}</p>
      </div>

      {isLoading ? (
        <div className="flex flex-wrap gap-8 lg:flex-nowrap">
          {/* --- Big News Skeleton --- */}
          <div className="big-news flex w-full flex-col gap-2 lg:w-auto">
            <div className="image-container h-[80%] w-full overflow-hidden rounded-xl">
              <Skeleton className="h-64 w-full rounded-xl" />{" "}
              {/* large image */}
            </div>
            <Skeleton className="h-4 w-40" /> {/* date */}
            <Skeleton className="h-6 w-3/4" /> {/* title */}
          </div>

          {/* --- More News Skeleton (4 items) --- */}
          <div className="more-news flex w-full flex-col gap-3 divide-y divide-black divide-opacity-30 lg:w-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="news-card flex flex-col gap-2 pt-3">
                <Skeleton className="h-4 w-32" /> {/* date */}
                <Skeleton className="h-5 w-3/4" /> {/* title */}
              </div>
            ))}
          </div>

          {/* --- Mobile “View More” button skeleton --- */}
          <Skeleton className="h-10 w-32 rounded-lg border border-gray border-opacity-10 lg:hidden" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 lg:flex-nowrap">
          <div className="more-news flex flex-col gap-3 divide-y divide-black divide-opacity-30">
            {displayNews.slice(0, 4).map((single_news, index) => (
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

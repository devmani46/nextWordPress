import { Spotlight } from "@/components/motion-primitives/spotlight";
import WhiteButton from "@/components/ui/whitebutton";
import { Event, getAllEvents, getAllNotices, Notice } from "@/lib/wordpress";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface StayUpdatedSectionProps {
  stay_updated_title: string;
  stay_updated_description: string;
}

export default function StayUpdatedSection({
  stay_updated_title,
  stay_updated_description,
}: StayUpdatedSectionProps) {
  const [notices, setNotices] = useState<Notice[] | null>(null);
  const [events, setEvents] = useState<Event[] | null>(null);
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
      const [fetchedNotices, fetchedEvents] = await Promise.all([
        getAllNotices(),
        getAllEvents(),
      ]);
      setNotices(fetchedNotices);
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Failed to fetch notices/events:", error);
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
  const displayNotices = notices || [];
  const displayEvents = events || [];

  return (
    <section
      ref={ref}
      className="stay-updated bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] px-8 py-20 md:px-[15%]"
    >
      <div className="stay-updated-text mb-11 flex flex-col gap-3">
        <p className="p1-regular">Stay Updated</p>
        <p className="h3">{stay_updated_title}</p>
        <p className="p1-regular text-gray">{stay_updated_description}</p>
      </div>

      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <p>Loading updates...</p>
        </div>
      ) : (
        <div className="notice-and-events flex flex-wrap gap-10 lg:flex-nowrap">
          <div className="notices flex flex-col items-start gap-6 lg:basis-1/2">
            <p className="h5">Notice</p>
            <div className="notice-card-container flex flex-col gap-3">
              {/*display four notices*/}
              {displayNotices.slice(0, 4).map((notice, index) => (
                <div
                  key={index}
                  className="notice-card flex flex-col gap-2 rounded-xl border border-white-normal bg-blue-light p-4 transition-all duration-500 will-change-auto hover:-translate-x-1 hover:-translate-y-1 hover:cursor-pointer hover:bg-blue-light-hover"
                >
                  <Spotlight
                    className="from-blue-light-hover via-blue-normal-hover to-blue-light-hover blur-3xl dark:from-blue-light-hover dark:via-blue-light-hover dark:to-blue-light-hover"
                    size={124}
                  />
                  <div className="relative h-full w-full rounded-xl bg-white dark:bg-black"></div>
                  <p className="label-medium text-gray">
                    {new Date(notice.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="p1-medium">{notice.title.rendered}</p>
                </div>
              ))}
            </div>
            <WhiteButton icon>View More</WhiteButton>
          </div>
          <div className="events flex flex-col items-start gap-5 lg:basis-1/2">
            <p className="h5">Events</p>
            <div className="event-card-container grid grid-cols-2 grid-rows-2 gap-4">
              {/*Display four events*/}
              {displayEvents.slice(0, 4).map((event, index) => (
                <div
                  key={index}
                  className="event-card rounded-lg border border-white-light bg-blue-light p-4 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:cursor-pointer hover:bg-blue-light-hover"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    {event._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                      <Image
                        height={64}
                        width={100}
                        alt="event-image"
                        src={
                          event._embedded?.["wp:featuredmedia"]?.[0]?.source_url
                        }
                        className="rounded-lg"
                      />
                    )}
                    <div className="event-date flex flex-col text-violet-normal">
                      <p className="h2">
                        {new Date(event.event_start_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                          },
                        )}
                      </p>
                      <p className="p1-regular">
                        {new Date(event.event_start_date).toLocaleDateString(
                          "en-GB",
                          {
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="p1-medium">{event.title.rendered}</p>
                    <p className="label-medium text-gray">Kathmandu, Nepal</p>
                  </div>
                </div>
              ))}
            </div>

            <WhiteButton icon>View More</WhiteButton>
          </div>
        </div>
      )}
    </section>
  );
}

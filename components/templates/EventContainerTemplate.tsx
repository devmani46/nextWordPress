import { Event } from "@/lib/wordpress";
import { Page } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";

interface EventContainerTemplateProps {
  page: Page;
  events: Event[];
}

export default function EventContainerTemplate({
  page,
  events,
}: EventContainerTemplateProps) {
  const remainingEvents = events.slice(1);
  const gridAreas = [
    "a",
    "b",
    "d",
    "c",
    "e",
    "f",
    "l",
    "g",
    "j",
    "h",
    "m",
    "i",
    "n",
  ];

  const items = Array.from({ length: gridAreas.length }, (_, i) => i + 1);

  return (
    <div className="px-[15%]">
      <div className="grid max-w-full grid-cols-4 grid-rows-[repeat(5,150px)] gap-4">
        {/* FIRST EVENT (2×3 span) */}
        <Link
          href={`/events/${events[0].slug}`}
          className="col-span-2 row-span-3 flex flex-col overflow-hidden rounded-xl bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] p-5"
        >
          {events[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <img
              src={events[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
              className="h-[80%] w-full rounded-lg object-cover"
            />
          )}
          <p className="mt-3 text-xl font-medium">{events[0].title.rendered}</p>
          <p className="p1-regular text-gray">{events[0].event_location}</p>
        </Link>

        {/* REMAINING 1×1 CELLS */}
        {remainingEvents.map((event, index) => (
          <Link
            key={index}
            href={`/events/${event.slug}`}
            className="flex flex-col overflow-hidden rounded-xl bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] p-5"
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {event._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                <Image
                  height={64}
                  width={100}
                  alt="event-image"
                  src={event._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
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
            <p className="p1-medium mt-3">{event.title.rendered}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

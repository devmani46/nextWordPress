import { Activity } from "@/lib/wordpress";
import { Page } from "@/lib/wordpress";
import Link from "next/link";

interface ActivitiesTemplateProps {
  page: Page;
  activities: Activity[];
}

export default function ActivitiesTemplate({
  page,
  activities,
}: ActivitiesTemplateProps) {
  const remainingActivities = activities.slice(1);

  return (
    <div className="grid-container px-[15%]">
      <div className="grid grid-cols-4 grid-rows-4 gap-2">
        <Link
          href={`/activities/${activities[0].slug}`}
          className="latest col-span-2 row-span-2 flex flex-col gap-3 rounded-lg bg-gray bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] p-5"
        >
          {activities[0]?._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <img
              src={
                activities[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url
              }
              className="h-[350px] w-[485px]"
            />
          )}
          <p className="p1-regular">{activities[0].title.rendered}</p>
        </Link>
        {remainingActivities.map((activity, index) => (
          <Link
            href={`/activities/${activity.slug}`}
            key={index}
            className="rounded-lg bg-blue-normal bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)]"
          >
            {activity._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
              <img
                src={activity._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
              />
            )}
            <p className="p1-regular"> {activity.title.rendered}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

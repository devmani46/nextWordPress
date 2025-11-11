import { Activity, getAllActivities } from "@/lib/wordpress";
import { Page } from "@/lib/wordpress";
import Link from "next/link";

interface ActivitiesTemplateProps {
  page: Page;
}

export default async function ActivitiesTemplate({
  page,
}: ActivitiesTemplateProps) {
  const activities: Activity[] = await getAllActivities();
  const remainingActivities = activities.slice(1);

  return (
    <div className="grid-container px-[15%]">
      <div className="grid grid-cols-4 grid-rows-4 gap-2">
        <Link
          href={`/activities/${activities[0].slug}`}
          className="latest flex flex-col gap-3 p-5 col-span-2 row-span-2 bg-gray bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] rounded-lg"
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
            className="bg-blue-normal rounded-lg
                    bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)]"
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

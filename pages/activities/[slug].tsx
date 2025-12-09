import { getActivityBySlug, getAllActivities, getActivitiesByIds, Activity } from "@/lib/wordpress";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { parseActivityContent } from "@/lib/parseActivityContent";

interface ActivityPageProps {
  activity: Activity;
  relatedActivities: Activity[];
}

export default function ActivityPage({ activity, relatedActivities }: ActivityPageProps) {
  if (!activity) {
    return <div className="p-10 text-center">Activity not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 lg:px-[10%]">
      {/* Title */}
      <h1
        className="mb-2 text-3xl font-bold leading-tight lg:text-4xl"
        dangerouslySetInnerHTML={{ __html: activity.title.rendered }}
      />
      
      {/* Date */}
      <p className="mb-6 text-sm text-gray-600">
        {new Date(activity.date).toLocaleDateString("en-US", {
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
          {activity._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <img
              src={activity._embedded["wp:featuredmedia"][0].source_url}
              alt={activity.title.rendered}
              className="mb-6 w-full rounded-lg object-cover"
            />
          )}

          {/* Activity Content with WYSIWYG and YouTube embedding */}
          <div className="prose prose-lg max-w-none whitespace-pre-wrap">
            {parseActivityContent(
              activity.activity_content || activity.content?.rendered || ""
            )}
          </div>
        </div>

        {/* Related Activities Sidebar - 1/3 width */}
        {relatedActivities && relatedActivities.length > 0 && (
          <aside className="lg:basis-1/3">
            <h2 className="mb-4 text-xl font-semibold">Other Activities</h2>
            <div className="flex flex-col gap-4">
              {relatedActivities.map((relatedActivity) => (
                <Link
                  key={relatedActivity.id}
                  href={`/activities/${relatedActivity.slug}`}
                  className="group flex gap-3 rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-4 transition-all hover:shadow-md"
                >
                  {/* Thumbnail */}
                  <div className="h-[68px] w-[78px] flex-shrink-0 overflow-hidden rounded-xl bg-gray-200">
                    {relatedActivity._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                      <img
                        src={relatedActivity._embedded["wp:featuredmedia"][0].source_url}
                        alt={relatedActivity.title.rendered}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-blue-100 to-blue-200" />
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="mb-1 text-xs text-gray-600">
                      {new Date(relatedActivity.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p
                      className="line-clamp-2 text-sm font-medium leading-tight group-hover:text-blue-600"
                      dangerouslySetInnerHTML={{ __html: relatedActivity.title.rendered }}
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
  const activities = await getAllActivities();
  const paths = activities.map((activity: Activity) => ({
    params: { slug: activity.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const activity = await getActivityBySlug(slug);

  if (!activity) {
    return {
      notFound: true,
    };
  }

  // Fetch related activities if they exist
  let relatedActivities: Activity[] = [];
  if (activity.activity_related_activities && activity.activity_related_activities.length > 0) {
    const relatedIds = activity.activity_related_activities.map((id) => parseInt(id, 10));
    relatedActivities = await getActivitiesByIds(relatedIds);
  }

  return {
    props: {
      activity,
      relatedActivities,
    },
    revalidate: 10,
  };
};

import { getActivityBySlug } from "@/lib/wordpress";

export default async function ActivityPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const activity = await getActivityBySlug(slug);

  if (!activity) {
    return <div className="p-10 text-center">Activity not found.</div>;
  }

  const imageUrl = activity._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  console.log(activity);

  return (
    <div className="px-[15%] py-10">
      <h1
        className="text-2xl font-semibold mb-4"
        dangerouslySetInnerHTML={{ __html: activity.title.rendered }}
      />
      {activity._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
        <img
          src={activity._embedded["wp:featuredmedia"][0].source_url}
          alt={activity.title.rendered}
          className="rounded-md mb-6"
        />
      )}
      <div
        dangerouslySetInnerHTML={{
          __html: activity.content?.rendered || activity.activity_content,
        }}
      />
    </div>
  );
}

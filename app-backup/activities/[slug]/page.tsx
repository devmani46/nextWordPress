import { getActivityBySlug } from "@/lib/wordpress";

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
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
        className="mb-4 text-2xl font-semibold"
        dangerouslySetInnerHTML={{ __html: activity.title.rendered }}
      />
      <p className="label-medium text-gray">January 16 2024</p>
      <div className="flex-container flex gap-16">
        <div className="activity-content basis-2/3">
          {activity._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <img
              src={activity._embedded["wp:featuredmedia"][0].source_url}
              alt={activity.title.rendered}
              className="mb-6 w-full rounded-md"
            />
          )}
          <div
            dangerouslySetInnerHTML={{
              __html:
                activity.content?.rendered || activity.activity_content || "",
            }}
          />
        </div>

        <div className="other-activities flex basis-1/3 flex-col gap-3">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <div
              key={index}
              className="acitivity-card flex gap-[10px] rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-4"
            >
              <div className="h-[68px] w-[78px] shrink-0 rounded-xl bg-gray"></div>
              <div className="activity-card-text">
                <p className="label-medium mb-1 text-gray">January 15, 2024</p>
                <p className="p1-medium">
                  एनआरएनएद्वारा सेती प्रादेशिक अस्पताललाई अक्सिजन प्लान्ट
                  हस्तान्तरण
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

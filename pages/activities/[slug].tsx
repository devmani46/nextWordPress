import { getActivityBySlug, getAllActivities } from "@/lib/wordpress";
import { GetStaticProps, GetStaticPaths } from "next";

export default function ActivityPage({ activity }: { activity: any }) {
  if (!activity) {
    return <div className="p-10 text-center">Activity not found.</div>;
  }

  return (
    <div className="px-[15%] py-10">
      <h1
        className="mb-4 text-2xl font-semibold"
        dangerouslySetInnerHTML={{ __html: activity.title.rendered }}
      />
      <p className="label-medium text-gray">
        {new Date(activity.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })}
      </p>
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
          {/* Placeholder for other activities if needed, or fetch them */}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const activities = await getAllActivities();
  const paths = activities.map((activity: any) => ({
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

  return {
    props: {
      activity,
    },
    revalidate: 10,
  };
};

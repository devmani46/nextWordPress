import {
  getNoticeBySlug,
  getNoticesByIds,
  getNoticeImage,
  getAllNotices,
} from "@/lib/wordpress";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";

export default function NoticePage({
  notice,
  relatedNoticesWithImages,
  imageUrl,
}: {
  notice: any;
  relatedNoticesWithImages: any[];
  imageUrl?: string;
}) {
  if (!notice) {
    return <div className="p-10 text-center">Notice not found.</div>;
  }

  return (
    <div className="px-[15%] py-10">
      <h1
        className="mb-4 text-2xl font-semibold"
        dangerouslySetInnerHTML={{ __html: notice.title.rendered }}
      />
      <p className="label-medium text-gray mb-6">
        {new Date(notice.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div className="flex flex-col md:flex-row gap-16">
        <div className="notice-content md:basis-2/3">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={notice.title.rendered}
              className="mb-6 w-full rounded-md object-cover"
            />
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: notice.notice_content || "<p>No content available.</p>",
            }}
            className="prose max-w-none"
          />
        </div>

        <div className="other-notices flex md:basis-1/3 flex-col gap-3">
          <h3 className="text-xl font-semibold mb-2">Related Notices</h3>
          {relatedNoticesWithImages.length > 0 ? (
            relatedNoticesWithImages.map((item) => (
              <Link
                key={item.id}
                href={`/notices/${item.slug}`}
                className="notice-card flex gap-[10px] rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-4 transition-all hover:shadow-sm"
              >
                <div className="h-[68px] w-[78px] shrink-0 rounded-xl bg-gray/10 overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title.rendered}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray/20" />
                  )}
                </div>
                <div className="notice-card-text flex-1">
                  <p className="label-medium mb-1 text-gray">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p
                    className="p1-medium line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                  />
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No related notices found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const notices = await getAllNotices();
  const paths = notices.map((notice: any) => ({
    params: { slug: notice.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const notice = await getNoticeBySlug(slug);

  if (!notice) {
    return {
      notFound: true,
    };
  }

  // Fetch related notices based on IDs in notice_related
  let relatedNotices: any[] = [];
  if (notice.notice_related && notice.notice_related.length > 0) {
    const relatedIds = notice.notice_related.map((id: string) =>
      parseInt(id, 10)
    );
    relatedNotices = await getNoticesByIds(relatedIds);
  }

  const imageUrl = await getNoticeImage(notice);

  // Process related notices images in parallel
  const relatedNoticesWithImages = await Promise.all(
    relatedNotices.map(async (item) => {
      const img = await getNoticeImage(item);
      return { ...item, imageUrl: img };
    })
  );

  return {
    props: {
      notice,
      relatedNoticesWithImages,
      imageUrl: imageUrl || null,
    },
    revalidate: 10,
  };
};

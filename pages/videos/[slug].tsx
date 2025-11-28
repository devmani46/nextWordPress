import { GetStaticProps, GetStaticPaths } from "next";
import { getVideoBySlug, getAllVideos } from "@/lib/wordpress";
import { Video } from "@/lib/wordpress.d";
import Head from "next/head";

interface SingleVideoProps {
  video: Video;
}

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

export default function SingleVideo({ video }: SingleVideoProps) {
  if (!video) {
    return <div className="p-10 text-center">Video not found.</div>;
  }

  const videoId = getYouTubeVideoId(video.video_youtube_url);

  return (
    <>
      <Head>
        <title>Video: {video.title.rendered} - NRNA</title>
        <meta
          name="description"
          content={`Watch: ${video.title.rendered}`}
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1
          className="mb-6 text-3xl font-bold"
          dangerouslySetInnerHTML={{ __html: video.title.rendered }}
        />

        {/* Video Player */}
        {videoId ? (
          <div className="mb-8 overflow-hidden rounded-xl bg-muted">
            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title.rendered}
              />
            </div>
          </div>
        ) : (
          <div className="mb-8 flex aspect-video w-full items-center justify-center rounded-xl bg-gray-200 text-gray-400">
            Invalid video URL
          </div>
        )}

        {/* Video Description (if available) */}
        {video.content?.rendered && (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: video.content.rendered }}
          />
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all videos to pre-render paths
  const videos = await getAllVideos();

  const paths = videos.map((video) => ({
    params: { slug: video.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    const video = await getVideoBySlug(slug);

    if (!video) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        video,
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error(`Error fetching video with slug ${slug}:`, error);
    return {
      notFound: true,
    };
  }
};

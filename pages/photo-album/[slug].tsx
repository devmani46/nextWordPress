import { GetStaticProps, GetStaticPaths } from "next";
import { getGalleryBySlug, getAllGalleries } from "@/lib/wordpress";
import { Gallery } from "@/lib/wordpress.d";
import Head from "next/head";

interface SingleGalleryProps {
  gallery: Gallery;
}

export default function SingleGallery({ gallery }: SingleGalleryProps) {
  if (!gallery) {
    return <div className="p-10 text-center">Gallery not found.</div>;
  }

  // Use featured image as the first image if available, or fallback to first image in array
  const featuredImage =
    gallery._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    gallery.images?.[0]?.url;

  return (
    <>
      <Head>
        <title>{gallery.title.rendered} - NRNA</title>
        <meta
          name="description"
          content={`Gallery: ${gallery.title.rendered}`}
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1
          className="mb-6 text-3xl font-bold"
          dangerouslySetInnerHTML={{ __html: gallery.title.rendered }}
        />

        {/* Featured Image Section */}
        {featuredImage && (
          <div className="mb-8 overflow-hidden rounded-xl bg-muted">
            <img
              src={featuredImage}
              alt={gallery.title.rendered}
              className="h-auto w-full object-cover max-h-[600px]"
            />
          </div>
        )}

        {/* Gallery Grid */}
        {gallery.images && gallery.images.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {gallery.images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg bg-muted"
              >
                <img
                  src={image.url}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  width={image.width}
                  height={image.height}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No additional images found in this gallery.
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all galleries to pre-render paths
  // Note: For a large number of galleries, consider fetching only recent ones or using fallback: 'blocking' with empty paths.
  const galleries = await getAllGalleries();
  
  const paths = galleries.map((gallery) => ({
    params: { slug: gallery.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  try {
    const gallery = await getGalleryBySlug(slug);

    if (!gallery) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        gallery,
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error(`Error fetching gallery with slug ${slug}:`, error);
    return {
      notFound: true,
    };
  }
};

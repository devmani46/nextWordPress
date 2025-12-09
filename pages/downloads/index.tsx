import { GetServerSideProps } from "next";
import { Page, Resource, WordPressPaginationHeaders, WordPressResponse } from "@/lib/wordpress.d";
import { getPageBySlug } from "@/lib/wordpress";
import DownloadsPage from "@/components/templates/DownloadsPage";
import querystring from "query-string";

interface DownloadsProps {
  page: Page;
  resources: Resource[];
  pagination: WordPressPaginationHeaders;
}

const baseUrl = process.env.WORDPRESS_URL;
async function getResources(
  page: number = 1,
  perPage: number = 12,
  search?: string,
): Promise<WordPressResponse<Resource[]>> {
  const query: Record<string, any> = {
    _embed: true,
    per_page: perPage,
    page,
  };

  if (search) {
    query.search = search;
  }

  const url = `${baseUrl}/wp-json/wp/v2/resources?${querystring.stringify(query)}`;
  
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Next.js WordPress Client",
    },
    next: {
      tags: ["wordpress", "resources"],
      revalidate: 60, // 1 minute cache
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress API request failed: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    data,
    headers: {
      total: parseInt(response.headers.get("X-WP-Total") || "0", 10),
      totalPages: parseInt(response.headers.get("X-WP-TotalPages") || "0", 10),
    },
  };
}

export default function Downloads({ page, resources, pagination }: DownloadsProps) {
  return <DownloadsPage resources={resources} pagination={pagination} />;
}

export const getServerSideProps: GetServerSideProps<DownloadsProps> = async (context) => {
  const { query } = context;
  const pageParam = query.page ? Number(query.page) : 1;
  const searchParam = query.search ? String(query.search) : undefined;

  try {
    const page = await getPageBySlug("downloads");
    
    const { data: resources, headers: pagination } = await getResources(
      pageParam,
      12, 
      searchParam
    );

    return {
      props: {
        page: page || { 
          title: { rendered: "Downloads" }, 
          slug: "downloads" 
        } as Page,
        resources,
        pagination,
      },
    };
  } catch (error) {
    console.error("Error fetching downloads data:", error);
    return {
      props: {
        page: { 
          title: { rendered: "Downloads" }, 
          slug: "downloads" 
        } as Page,
        resources: [],
        pagination: { total: 0, totalPages: 0 },
      },
    };
  }
};

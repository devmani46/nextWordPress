// Description: WordPress API functions
// Used to fetch data from a WordPress site using the WordPress REST API
// Types are imported from `wp.d.ts`

import querystring from "query-string";
import type {
  Post,
  Category,
  Tag,
  Page,
  OrganizationalStructurePage,
  Author,
  FeaturedMedia,
  Notice,
  Event,
  RegionalMeeting,
  Project,
  Activity,
  News,
  Faq,
  WpMenuItem,
  OurNCC,
  Region,
  Gallery,
  Video,
  WordPressPaginationHeaders,
  WordPressResponse,
  ExecutiveCommittee,
  PrivacyPolicyPage,
  PolicyItem,
  TermsAndConditionsPage,
  TermsItem,
  Report,
  ReportsMenuItem,
} from "./wordpress.d";

export type * from "./wordpress.d";

const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
console.log("WORDPRESS_URL =", baseUrl);

if (!baseUrl && typeof window === "undefined") {
  throw new Error("WORDPRESS_URL environment variable is not defined");
}

class WordPressAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string,
  ) {
    super(message);
    this.name = "WordPressAPIError";
  }
}

// Keep original function for backward compatibility
async function wordpressFetch<T>(
  path: string,
  query?: Record<string, any>,
): Promise<T> {
  const url = `${baseUrl}${path}${
    query ? `?${querystring.stringify(query)}` : ""
  }`;
  const userAgent = "Next.js WordPress Client";

  const response = await fetch(url, {
    headers: {
      "User-Agent": userAgent,
    },
    next: {
      tags: ["wordpress"],
      revalidate: 10, // 1 hour cache
    },
  });

  if (!response.ok) {
    // --- START DEBUG LOGGING ---
    console.error(`--- WORDPRESS API FAILED ---`);
    console.error(`Status: ${response.status} (${response.statusText})`);
    console.error(`Failing URL: ${url}`);

    // Attempt to read the error body
    try {
      const errorBody = await response.json();
      console.error("API Error Body:", errorBody);
    } catch (e) {
      console.error(
        "Could not read JSON error body for status:",
        response.status,
      );
    }
    // --- END DEBUG LOGGING ---

    throw new WordPressAPIError(
      `WordPress API request failed: ${response.statusText}`,
      response.status,
      url,
    );
  }

  return response.json();
}

// New function for paginated requests
async function wordpressFetchWithPagination<T>(
  path: string,
  query?: Record<string, any>,
): Promise<WordPressResponse<T>> {
  const url = `${baseUrl}${path}${
    query ? `?${querystring.stringify(query)}` : ""
  }`;
  const userAgent = "Next.js WordPress Client";

  const response = await fetch(url, {
    headers: {
      "User-Agent": userAgent,
    },
    next: {
      tags: ["wordpress"],
      revalidate: 10, // 1 hour cache
    },
  });

  if (!response.ok) {
    throw new WordPressAPIError(
      `WordPress API request failed: ${response.statusText}`,
      response.status,
      url,
    );
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

// New function for paginated posts
export async function getPostsPaginated(
  page: number = 1,
  perPage: number = 9,
  filterParams?: {
    // post_type?: string;
    author?: string;
    tag?: string;
    category?: string;
    search?: string;
  },
): Promise<WordPressResponse<Post[]>> {
  const query: Record<string, any> = {
    _embed: true,
    per_page: perPage,
    page,
  };

  // Build cache tags based on filters
  const cacheTags = ["wordpress", "posts"];

  if (filterParams?.search) {
    query.search = filterParams.search;
    cacheTags.push("posts-search");
  }
  if (filterParams?.author) {
    query.author = filterParams.author;
    cacheTags.push(`posts-author-${filterParams.author}`);
  }
  if (filterParams?.tag) {
    query.tags = filterParams.tag;
    cacheTags.push(`posts-tag-${filterParams.tag}`);
  }
  if (filterParams?.category) {
    query.categories = filterParams.category;
    cacheTags.push(`posts-category-${filterParams.category}`);
  }

  // Add page-specific cache tag for granular invalidation
  cacheTags.push(`posts-page-${page}`);

  const url = `${baseUrl}/wp-json/wp/v2/posts${
    query ? `?${querystring.stringify(query)}` : ""
  }`;
  const userAgent = "Next.js WordPress Client";

  const response = await fetch(url, {
    headers: {
      "User-Agent": userAgent,
    },
    next: {
      tags: cacheTags,
      revalidate: 10, // 1 hour cache
    },
  });

  if (!response.ok) {
    throw new WordPressAPIError(
      `WordPress API request failed: ${response.statusText}`,
      response.status,
      url,
    );
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

export async function getAllPosts(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
  search?: string;
}): Promise<Post[]> {
  const query: Record<string, any> = {
    _embed: true,
    per_page: 100,
  };

  if (filterParams?.search) {
    query.search = filterParams.search;

    if (filterParams?.author) {
      query.author = filterParams.author;
    }
    if (filterParams?.tag) {
      query.tags = filterParams.tag;
    }
    if (filterParams?.category) {
      query.categories = filterParams.category;
    }
  } else {
    if (filterParams?.author) {
      query.author = filterParams.author;
    }
    if (filterParams?.tag) {
      query.tags = filterParams.tag;
    }
    if (filterParams?.category) {
      query.categories = filterParams.category;
    }
  }

  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", query);
}

export async function getPostById(id: number): Promise<Post> {
  return wordpressFetch<Post>(`/wp-json/wp/v2/posts/${id}`);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", { slug }).then(
    (posts) => posts[0],
  );
}

export async function getAllNotices(): Promise<Notice[]> {
  return wordpressFetch<Notice[]>("/wp-json/wp/v2/notices", {
    _embed: true,
    per_page: 100,
  });
}

export async function getNoticesPaginated(
  page: number = 1,
  perPage: number = 9,
  filterParams?: {
    category?: string;
    search?: string;
  },
): Promise<WordPressResponse<Notice[]>> {
  const query: Record<string, any> = {
    _embed: true,
    per_page: perPage,
    page,
  };

  if (filterParams?.search) {
    query.search = filterParams.search;
  }
  if (filterParams?.category) {
    query.notice_category = filterParams.category;
  }

  return wordpressFetchWithPagination<Notice[]>(
    "/wp-json/wp/v2/notices",
    query,
  );
}

export async function getNoticeBySlug(slug: string): Promise<Notice> {
  return wordpressFetch<Notice[]>("/wp-json/wp/v2/notices", {
    slug,
    _embed: true,
  }).then((notices) => notices[0]);
}

export async function getNoticesByIds(ids: number[]): Promise<Notice[]> {
  if (ids.length === 0) return [];
  return wordpressFetch<Notice[]>("/wp-json/wp/v2/notices", {
    include: ids.join(","),
    _embed: true,
  });
}

export async function getNoticeImage(
  notice: Notice,
): Promise<string | undefined> {
  // 1. Try _embedded
  let imageUrl = notice._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  // 2. Try fetching media by ID
  if (!imageUrl && notice.featured_media > 0) {
    try {
      const media = await getFeaturedMediaById(notice.featured_media);
      imageUrl = media.source_url;
    } catch (e) {
      // Ignore 401 or other errors, try next fallback
      console.warn(
        `Failed to fetch media ${notice.featured_media} for notice ${notice.id}`,
      );
    }
  }

  // 3. Try extracting from content
  if (!imageUrl && notice.notice_content) {
    const match = notice.notice_content.match(/<img[^>]+src="([^">]+)"/);
    if (match) {
      imageUrl = match[1];
    }
  }

  return imageUrl;
}

export async function getAllNoticeCategories(): Promise<Category[]> {
  return wordpressFetch<Category[]>("/wp-json/wp/v2/notice_category");
}

export async function getAllEvents(): Promise<Event[]> {
  return wordpressFetch<Event[]>("/wp-json/wp/v2/events?_embed");
}

export async function getAllRegionalMeetings(): Promise<RegionalMeeting[]> {
  return wordpressFetch<RegionalMeeting[]>(
    "/wp-json/wp/v2/regional_meetings?_embed",
  );
}

export async function getRegionalMeetingsPaginated(
  page: number = 1,
  perPage: number = 13,
): Promise<WordPressResponse<RegionalMeeting[]>> {
  const query = {
    _embed: true,
    per_page: perPage,
    page,
  };

  return wordpressFetchWithPagination<RegionalMeeting[]>(
    "/wp-json/wp/v2/regional_meetings",
    query,
  );
}

export async function getAllProjects(): Promise<Project[]> {
  return wordpressFetch<Project[]>("/wp-json/wp/v2/projects?_embed");
}

export async function getProjectsPaginated(
  page: number = 1,
  perPage: number = 9,
): Promise<WordPressResponse<Project[]>> {
  const query = {
    _embed: true,
    per_page: perPage,
    page,
  };

  return wordpressFetchWithPagination<Project[]>(
    "/wp-json/wp/v2/projects",
    query,
  );
}

export async function getAllActivities(): Promise<Activity[]> {
  return wordpressFetch<Activity[]>("/wp-json/wp/v2/activities", {
    _embed: true,
    per_page: 100,
  });
}

export async function getAllNews(): Promise<News[]> {
  return wordpressFetch<News[]>("/wp-json/wp/v2/news", {
    _embed: true,
    per_page: 100,
  });
}

export async function getNewsByIds(ids: number[]): Promise<News[]> {
  if (ids.length === 0) return [];
  return wordpressFetch<News[]>("/wp-json/wp/v2/news", {
    include: ids.join(","),
    _embed: true,
  });
}

export async function getNewsBySlug(slug: string): Promise<News> {
  return wordpressFetch<News[]>("/wp-json/wp/v2/news", {
    slug,
    _embed: true,
  }).then((news) => news[0]);
}

export async function getNewsPaginated(
  page: number = 1,
  perPage: number = 13,
): Promise<WordPressResponse<News[]>> {
  const query = {
    _embed: true,
    per_page: perPage,
    page,
  };

  return wordpressFetchWithPagination<News[]>("/wp-json/wp/v2/news", query);
}

export async function getActivityBySlug(slug: string): Promise<Activity> {
  return wordpressFetch<Activity[]>("/wp-json/wp/v2/activities", {
    slug,
    _embed: true,
  }).then((activities) => activities[0]);
}

export async function getActivitiesByIds(ids: number[]): Promise<Activity[]> {
  if (ids.length === 0) return [];
  return wordpressFetch<Activity[]>("/wp-json/wp/v2/activities", {
    include: ids.join(","),
    _embed: true,
  });
}

export async function getActivitiesPaginated(
  page: number = 1,
  perPage: number = 13,
): Promise<WordPressResponse<Activity[]>> {
  const query = {
    _embed: true,
    per_page: perPage,
    page,
  };

  return wordpressFetchWithPagination<Activity[]>(
    "/wp-json/wp/v2/activities",
    query,
  );
}

export async function getEventBySlug(slug: string): Promise<Event> {
  return wordpressFetch<Event[]>("/wp-json/wp/v2/events", {
    slug,
    _embed: true,
  }).then((events) => events[0]);
}

export async function getRegionalMeetingBySlug(
  slug: string,
): Promise<RegionalMeeting> {
  return wordpressFetch<RegionalMeeting[]>("/wp-json/wp/v2/regional_meetings", {
    slug,
    _embed: true,
  }).then((regional_meeting) => regional_meeting[0]);
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  return wordpressFetch<Project[]>("/wp-json/wp/v2/projects", {
    slug,
    _embed: true,
  }).then((projects) => projects[0]);
}

export async function getAllGalleries(): Promise<Gallery[]> {
  return wordpressFetch<Gallery[]>("/wp-json/wp/v2/galleries", {
    _embed: true,
    per_page: 100,
  });
}

export async function getGalleriesPaginated(
  page: number = 1,
  perPage: number = 9,
): Promise<WordPressResponse<Gallery[]>> {
  const query = {
    _embed: true,
    per_page: perPage,
    page,
  };

  return wordpressFetchWithPagination<Gallery[]>(
    "/wp-json/wp/v2/galleries",
    query,
  );
}

export async function getGalleryBySlug(slug: string): Promise<Gallery> {
  return wordpressFetch<Gallery[]>("/wp-json/wp/v2/galleries", {
    slug,
    _embed: true,
  }).then((galleries) => galleries[0]);
}

export async function getAllVideos(): Promise<Video[]> {
  return wordpressFetch<Video[]>("/wp-json/wp/v2/videos", {
    _embed: true,
    per_page: 100,
  });
}

export async function getVideosPaginated(
  page: number = 1,
  perPage: number = 12,
): Promise<WordPressResponse<Video[]>> {
  const query = {
    _embed: true,
    per_page: perPage,
    page,
  };

  return wordpressFetchWithPagination<Video[]>("/wp-json/wp/v2/videos", query);
}

export async function getVideoBySlug(slug: string): Promise<Video> {
  return wordpressFetch<Video[]>("/wp-json/wp/v2/videos", {
    slug,
    _embed: true,
  }).then((videos) => videos[0]);
}

export async function getAllCategories(): Promise<Category[]> {
  return wordpressFetch<Category[]>("/wp-json/wp/v2/categories");
}

export async function getCategoryById(id: number): Promise<Category> {
  return wordpressFetch<Category>(`/wp-json/wp/v2/categories/${id}`);
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  return wordpressFetch<Category[]>("/wp-json/wp/v2/categories", { slug }).then(
    (categories) => categories[0],
  );
}

export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", {
    categories: categoryId,
  });
}

export async function getPostsByTag(tagId: number): Promise<Post[]> {
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", { tags: tagId });
}

export async function getTagsByPost(postId: number): Promise<Tag[]> {
  return wordpressFetch<Tag[]>("/wp-json/wp/v2/tags", { post: postId });
}

export async function getAllTags(): Promise<Tag[]> {
  return wordpressFetch<Tag[]>("/wp-json/wp/v2/tags");
}

export async function getTagById(id: number): Promise<Tag> {
  return wordpressFetch<Tag>(`/wp-json/wp/v2/tags/${id}`);
}

export async function getTagBySlug(slug: string): Promise<Tag> {
  return wordpressFetch<Tag[]>("/wp-json/wp/v2/tags", { slug }).then(
    (tags) => tags[0],
  );
}

export async function getAllPages(): Promise<Page[]> {
  return wordpressFetch<Page[]>("/wp-json/wp/v2/pages");
}

export async function getPageById(id: number): Promise<Page> {
  return wordpressFetch<Page>(`/wp-json/wp/v2/pages/${id}`);
}

export async function getPageBySlug(slug: string): Promise<Page> {
  return wordpressFetch<Page[]>("/wp-json/wp/v2/pages", { slug }).then(
    (pages) => pages[0],
  );
}

// Fetch Reports & Publications categories dynamically from WordPress
export async function getReportsMenu(): Promise<ReportsMenuItem[]> {
  try {
    // Fetch categories from WordPress taxonomy
    const categories = await wordpressFetch<
      Array<{
        id: number;
        name: string;
        slug: string;
      }>
    >("/wp-json/wp/v2/reports_publications_category", {
      per_page: 100,
      orderby: "name",
      order: "asc",
    });

    // Transform categories into menu structure
    const menuChildren: ReportsMenuItem[] = categories.map((cat) => ({
      id: cat.id,
      title: cat.name,
      url: `http://localhost:3000/reports-publications-category/${cat.slug}/`,
    }));

    return [
      {
        id: 361,
        title: "Reports & Publications",
        children: menuChildren,
      },
    ];
  } catch (error) {
    console.error("Error fetching reports categories:", error);
    // Return empty structure if fetch fails
    return [
      {
        id: 361,
        title: "Reports & Publications",
        children: [],
      },
    ];
  }
}

export async function getAllReports(): Promise<Report[]> {
  // Fetch from WordPress API - note the hyphen in the endpoint
  return wordpressFetch<Report[]>("/wp-json/wp/v2/reports-publications", {
    _embed: true,
    per_page: 100,
  });
}

export async function getAllAuthors(): Promise<Author[]> {
  return wordpressFetch<Author[]>("/wp-json/wp/v2/users");
}

export async function getAuthorById(id: number): Promise<Author> {
  return wordpressFetch<Author>(`/wp-json/wp/v2/users/${id}`);
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  return wordpressFetch<Author[]>("/wp-json/wp/v2/users", { slug }).then(
    (users) => users[0],
  );
}

export async function getPostsByAuthor(authorId: number): Promise<Post[]> {
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", { author: authorId });
}

export async function getPostsByAuthorSlug(
  authorSlug: string,
): Promise<Post[]> {
  const author = await getAuthorBySlug(authorSlug);
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", { author: author.id });
}

export async function getPostsByCategorySlug(
  categorySlug: string,
): Promise<Post[]> {
  const category = await getCategoryBySlug(categorySlug);
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", {
    categories: category.id,
  });
}

export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
  const tag = await getTagBySlug(tagSlug);
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", { tags: tag.id });
}

export async function getFeaturedMediaById(id: number): Promise<FeaturedMedia> {
  return wordpressFetch<FeaturedMedia>(`/wp-json/wp/v2/media/${id}`);
}

export async function searchCategories(query: string): Promise<Category[]> {
  return wordpressFetch<Category[]>("/wp-json/wp/v2/categories", {
    search: query,
    per_page: 100,
  });
}

export async function searchTags(query: string): Promise<Tag[]> {
  return wordpressFetch<Tag[]>("/wp-json/wp/v2/tags", {
    search: query,
    per_page: 100,
  });
}

export async function searchAuthors(query: string): Promise<Author[]> {
  return wordpressFetch<Author[]>("/wp-json/wp/v2/users", {
    search: query,
    per_page: 100,
  });
}

// Function specifically for generateStaticParams - fetches ALL posts
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const allSlugs: { slug: string }[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await wordpressFetchWithPagination<Post[]>(
      "/wp-json/wp/v2/posts",
      {
        per_page: 100,
        page,
        _fields: "slug", // Only fetch slug field for performance
      },
    );

    const posts = response.data;
    allSlugs.push(...posts.map((post) => ({ slug: post.slug })));

    hasMore = page < response.headers.totalPages;
    page++;
  }

  return allSlugs;
}

// Enhanced pagination functions for specific queries
export async function getPostsByCategoryPaginated(
  categoryId: number,
  page: number = 1,
  perPage: number = 9,
): Promise<WordPressResponse<Post[]>> {
  const query = {
    _embed: true,
    per_page: perPage,
    page,
    categories: categoryId,
  };

  return wordpressFetchWithPagination<Post[]>("/wp-json/wp/v2/posts", query);
}

export async function getPostsByTagPaginated(
  tagId: number,
  page: number = 1,
  perPage: number = 9,
): Promise<WordPressResponse<Post[]>> {
  const query = {
    _embed: true,
    per_page: perPage,
    page,
    tags: tagId,
  };

  return wordpressFetchWithPagination<Post[]>("/wp-json/wp/v2/posts", query);
}

export async function getPostsByAuthorPaginated(
  authorId: number,
  page: number = 1,
  perPage: number = 9,
): Promise<WordPressResponse<Post[]>> {
  const query = {
    _embed: true,
    per_page: perPage,
    page,
    author: authorId,
  };

  return wordpressFetchWithPagination<Post[]>("/wp-json/wp/v2/posts", query);
}

// // --- Fetch menus from WP API ---

export async function getAllOurNCCs(): Promise<OurNCC[]> {
  return wordpressFetch<OurNCC[]>("/wp-json/wp/v2/our_ncc?_embed&per_page=100");
}

export async function getOurNCCsPaginated(
  page: number = 1,
  perPage: number = 20,
  filterParams?: {
    region?: string; // Changed to string as per JSON
    search?: string;
  },
): Promise<WordPressResponse<OurNCC[]>> {
  const query: Record<string, any> = {
    _embed: true,
    per_page: perPage,
    page,
  };

  if (filterParams?.search) {
    query.search = filterParams.search;
  }
  if (filterParams?.region) {
    query.ncc_region = filterParams.region;
  }

  return wordpressFetchWithPagination<OurNCC[]>(
    "/wp-json/wp/v2/our_ncc",
    query,
  );
}

// export async function getMenus(): Promise<WpMenuItem[]> {
//   const res = await fetch(
//     "http://wordpress_nextjs.test/wp-json/wp/v1/menu/primary",
//     {
//       next: { revalidate: 60 }, // optional caching
//     },
//   );

//   if (!res.ok) throw new Error("Failed to fetch menus");

//   const data: WpMenuItem[] = await res.json();

//   return normalizeMenuTree(data);
// }

// Executive Committee functions
export async function getAllExecutiveCommittees(): Promise<
  ExecutiveCommittee[]
> {
  return wordpressFetch<ExecutiveCommittee[]>(
    "/wp-json/wp/v2/executive_committee",
    {
      _embed: true,
      per_page: 100,
    },
  );
}

export async function getExecutiveCommitteesPaginated(
  page: number = 1,
  perPage: number = 100,
): Promise<WordPressResponse<ExecutiveCommittee[]>> {
  const query = {
    _embed: true,
    per_page: perPage,
    page,
  };

  return wordpressFetchWithPagination<ExecutiveCommittee[]>(
    "/wp-json/wp/v2/executive_committee",
    query,
  );
}

export async function getAllFaqs(): Promise<Faq[]> {
  return wordpressFetch<Faq[]>("/wp-json/wp/v2/faqs", {
    _embed: true,
    per_page: 100,
  });
}

export { WordPressAPIError };
export type {
  Post,
  Page,
  OrganizationalStructurePage,
  Author,
  Category,
  Tag,
  FeaturedMedia,
  Notice,
  Event,
  RegionalMeeting,
  Project,
  News,
  Activity,
  Faq,
  OurNCC,
  Region,
  ExecutiveCommittee,
};

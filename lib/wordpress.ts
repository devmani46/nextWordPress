// Description: WordPress API functions
// Used to fetch data from a WordPress site using the WordPress REST API
// Types are imported from `wp.d.ts`

import querystring from "query-string";
import type {
  Post,
  Category,
  Tag,
  Page,
  Author,
  FeaturedMedia,
  Team,
  Notice,
  Event,
  Project,
  Activity,
  News,
} from "./wordpress.d";

const baseUrl = process.env.WORDPRESS_URL;

if (!baseUrl) {
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

// New types for pagination support
export interface WordPressPaginationHeaders {
  total: number;
  totalPages: number;
}

export interface WordPressResponse<T> {
  data: T;
  headers: WordPressPaginationHeaders;
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
  return wordpressFetch<Notice[]>("/wp-json/wp/v2/notices");
}

export async function getAllEvents(): Promise<Event[]> {
  return wordpressFetch<Event[]>("/wp-json/wp/v2/events?_embed");
}

export async function getAllProjects(): Promise<Project[]> {
  return wordpressFetch<Project[]>("/wp-json/wp/v2/projects?_embed");
}

export async function getAllActivities(): Promise<Activity[]> {
  return wordpressFetch<Activity[]>("/wp-json/wp/v2/activities?_embed");
}

export async function getAllNews(): Promise<News[]> {
  return wordpressFetch<News[]>("/wp-json/wp/v2/news?_embed");
}

export async function getActivityBySlug(slug: string): Promise<Activity> {
  return wordpressFetch<Activity[]>("/wp-json/wp/v2/activities", {
    slug,
    _embed: true,
  }).then((activities) => activities[0]);
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

// Team functions
export async function getAllTeams(filterParams?: {
  author?: string;
  team_category?: string;
  team_type?: string;
  search?: string;
}): Promise<Team[]> {
  const query: Record<string, any> = {
    _embed: true,
    per_page: 100,
  };

  if (filterParams?.search) {
    query.search = filterParams.search;
  }
  if (filterParams?.author) {
    query.author = filterParams.author;
  }
  if (filterParams?.team_category) {
    query.team_category = filterParams.team_category;
  }
  if (filterParams?.team_type) {
    query.team_type = filterParams.team_type;
  }

  return wordpressFetch<Team[]>("/wp-json/wp/v2/team", query);
}

export async function getTeamById(id: number): Promise<Team> {
  return wordpressFetch<Team>(`/wp-json/wp/v2/team/${id}`, { _embed: true });
}

export async function getTeamBySlug(slug: string): Promise<Team> {
  return wordpressFetch<Team[]>("/wp-json/wp/v2/team", {
    slug,
    _embed: true,
  }).then((teams) => teams[0]);
}

export async function getTeamsPaginated(
  page: number = 1,
  perPage: number = 9,
  filterParams?: {
    author?: string;
    team_category?: string;
    team_type?: string;
    search?: string;
  },
): Promise<WordPressResponse<Team[]>> {
  const query: Record<string, any> = {
    _embed: true,
    per_page: perPage,
    page,
  };

  // Build cache tags based on filters
  const cacheTags = ["wordpress", "teams"];

  if (filterParams?.search) {
    query.search = filterParams.search;
    cacheTags.push("teams-search");
  }
  if (filterParams?.author) {
    query.author = filterParams.author;
    cacheTags.push(`teams-author-${filterParams.author}`);
  }
  if (filterParams?.team_category) {
    query.team_category = filterParams.team_category;
    cacheTags.push(`teams-category-${filterParams.team_category}`);
  }
  if (filterParams?.team_type) {
    query.team_type = filterParams.team_type;
    cacheTags.push(`teams-type-${filterParams.team_type}`);
  }

  // Add page-specific cache tag for granular invalidation
  cacheTags.push(`teams-page-${page}`);

  const url = `${baseUrl}/wp-json/wp/v2/team${
    querystring.stringify(query) ? `?${querystring.stringify(query)}` : ""
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

export async function getAllTeamSlugs(): Promise<{ slug: string }[]> {
  const allSlugs: { slug: string }[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await wordpressFetchWithPagination<Team[]>(
      "/wp-json/wp/v2/team",
      {
        per_page: 100,
        page,
        _fields: "slug",
      },
    );

    const teams = response.data;
    allSlugs.push(...teams.map((team) => ({ slug: team.slug })));

    hasMore = page < response.headers.totalPages;
    page++;
  }

  return allSlugs;
}

// Team taxonomy functions
export async function getAllTeamCategories(): Promise<Category[]> {
  return wordpressFetch<Category[]>("/wp-json/wp/v2/team_category");
}

export async function getTeamCategoryById(id: number): Promise<Category> {
  return wordpressFetch<Category>(`/wp-json/wp/v2/team_category/${id}`);
}

export async function getTeamCategoryBySlug(slug: string): Promise<Category> {
  return wordpressFetch<Category[]>("/wp-json/wp/v2/team_category", {
    slug,
  }).then((categories) => categories[0]);
}

export async function getTeamsByTeamCategory(
  categoryId: number,
): Promise<Team[]> {
  return wordpressFetch<Team[]>("/wp-json/wp/v2/team", {
    team_category: categoryId,
    _embed: true,
  });
}

export async function getAllTeamTypes(): Promise<Tag[]> {
  return wordpressFetch<Tag[]>("/wp-json/wp/v2/team_type");
}

export async function getTeamTypeById(id: number): Promise<Tag> {
  return wordpressFetch<Tag>(`/wp-json/wp/v2/team_type/${id}`);
}

export async function getTeamTypeBySlug(slug: string): Promise<Tag> {
  return wordpressFetch<Tag[]>("/wp-json/wp/v2/team_type", { slug }).then(
    (types) => types[0],
  );
}

export async function getTeamsByTeamType(typeId: number): Promise<Team[]> {
  return wordpressFetch<Team[]>("/wp-json/wp/v2/team", {
    team_type: typeId,
    _embed: true,
  });
}

export async function searchTeamCategories(query: string): Promise<Category[]> {
  return wordpressFetch<Category[]>("/wp-json/wp/v2/team_category", {
    search: query,
    per_page: 100,
  });
}

export async function searchTeamTypes(query: string): Promise<Tag[]> {
  return wordpressFetch<Tag[]>("/wp-json/wp/v2/team_type", {
    search: query,
    per_page: 100,
  });
}

// Enhanced pagination functions for team queries
export async function getTeamsByTeamCategoryPaginated(
  categoryId: number,
  page: number = 1,
  perPage: number = 9,
): Promise<WordPressResponse<Team[]>> {
  const query = {
    _embed: true,
    per_page: perPage,
    page,
    team_category: categoryId,
  };

  return wordpressFetchWithPagination<Team[]>("/wp-json/wp/v2/team", query);
}

export async function getTeamsByTeamTypePaginated(
  typeId: number,
  page: number = 1,
  perPage: number = 9,
): Promise<WordPressResponse<Team[]>> {
  const query = {
    _embed: true,
    per_page: perPage,
    page,
    team_type: typeId,
  };

  return wordpressFetchWithPagination<Team[]>("/wp-json/wp/v2/team", query);
}

export { WordPressAPIError };
export type {
  Post,
  Page,
  Author,
  Category,
  Tag,
  Team,
  FeaturedMedia,
  Notice,
  Event,
  Project,
  News,
  Activity,
};

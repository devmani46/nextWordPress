// Common types that are reused across multiple entities
interface WPEntity {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: "publish" | "future" | "draft" | "pending" | "private";
  link: string;
  guid: {
    rendered: string;
  };
}

interface RenderedContent {
  rendered: string;
  protected: boolean;
}

interface RenderedTitle {
  rendered: string;
}

// Media types
interface MediaSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

interface MediaDetails {
  width: number;
  height: number;
  file: string;
  sizes: Record<string, MediaSize>;
}

export interface FeaturedMedia extends WPEntity {
  title: RenderedTitle;
  author: number;
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: MediaDetails;
  source_url: string;
}

// Content types
export interface Post extends WPEntity {
  title: RenderedTitle;
  content: RenderedContent;
  excerpt: RenderedContent;
  author: number;
  featured_media: number;
  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  sticky: boolean;
  template: string;
  format:
    | "standard"
    | "aside"
    | "chat"
    | "gallery"
    | "link"
    | "image"
    | "quote"
    | "status"
    | "video"
    | "audio";
  categories: number[];
  tags: number[];
  meta: Record<string, unknown>;
}

export interface Team extends WPEntity {
  title: RenderedTitle;
  content: RenderedContent;
  excerpt: RenderedContent;
  author: number;
  featured_media: number;
  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  template: string;
  team_category: number[];
  team_type: number[];
  meta: Record<string, unknown>;
  _embedded?: {
    author?: Author[];
    "wp:featuredmedia"?: FeaturedMedia[];
    "wp:term"?: Array<Array<Category | Tag>>;
  };
}

export interface Page extends WPEntity {
  title: RenderedTitle;
  content: RenderedContent;
  excerpt: RenderedContent;
  meta: {
    [key: string]: unknown;
  };
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  template: string;
  // meta: Record<string, unknown>;
}

export interface OrganizationalStructurePage extends Page {
  organizational_structure_image_url?: string; // WordPress provides this pre-resolved URL
  meta: {
    organizational_structure_title: string;
    organizational_structure_image: number; // WordPress media ID
    organizational_structure_stat_title: string;
    organizational_structure_stat_description: string;
    [key: string]: unknown;
  };
}

// Taxonomy types
interface Taxonomy {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  meta: Record<string, unknown>;
}

export interface Notice extends WPEntity {
  title: RenderedTitle;
  notice_content: string;
  notice_related: string[]; // IDs as strings
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: FeaturedMedia[];
    "wp:term"?: Array<Array<Category | Tag>>;
  };
}

export interface Event extends WPEntity {
  title: RenderedTitle;
  featured_media: number;
  event_start_date: string;

  _embedded?: {
    "wp:featuredmedia"?: FeaturedMedia[];
  };
}

export interface News extends WPEntity {
  title: RenderedTitle;
  featured_media: number;

  _embedded?: {
    "wp:featuredmedia"?: FeaturedMedia[];
  };
}

export interface Project extends WPEntity {
  title: RenderedTitle;
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: FeaturedMedia[];
  };
}

export interface Activity extends WPEntity {
  title: RenderedTitle;
  content: RenderedContent;
  activity_content?: string;
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: FeaturedMedia[];
  };
}

export interface GalleryImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface Gallery extends WPEntity {
  title: RenderedTitle;
  content: RenderedContent;
  featured_media: number;
  images: GalleryImage[];
  _embedded?: {
    "wp:featuredmedia"?: FeaturedMedia[];
  };
}

export interface Video extends WPEntity {
  title: RenderedTitle;
  video_youtube_url: string;
  content?: RenderedContent;
  excerpt?: RenderedContent;
  featured_media?: number;
  _embedded?: {
    "wp:featuredmedia"?: FeaturedMedia[];
  };
}

export interface ResourceFile {
  id: number;
  url: string;
  filename: string;
}

export interface Resource extends WPEntity {
  title: RenderedTitle;
  content: RenderedContent;
  resource_category: number[];
  featured_media: number;
  resource_files: ResourceFile[];
  _embedded?: {
    "wp:featuredmedia"?: FeaturedMedia[];
    "wp:term"?: Array<Array<Category | Tag>>;
  };
}

export interface Faq extends WPEntity {
  title: RenderedTitle;
  answer: string;
}

export interface Category extends Taxonomy {
  taxonomy: "category";
  parent: number;
}

export interface Tag extends Taxonomy {
  taxonomy: "post_tag";
}

export interface Author {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: Record<string, string>;
  meta: Record<string, unknown>;
}

// Block types
interface BlockSupports {
  align?: boolean | string[];
  anchor?: boolean;
  className?: boolean;
  color?: {
    background?: boolean;
    gradients?: boolean;
    text?: boolean;
  };
  spacing?: {
    margin?: boolean;
    padding?: boolean;
  };
  typography?: {
    fontSize?: boolean;
    lineHeight?: boolean;
  };
  [key: string]: unknown;
}

interface BlockStyle {
  name: string;
  label: string;
  isDefault: boolean;
}

export interface BlockType {
  api_version: number;
  title: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  keywords: string[];
  parent: string[];
  supports: BlockSupports;
  styles: BlockStyle[];
  textdomain: string;
  example: Record<string, unknown>;
  attributes: Record<string, unknown>;
  provides_context: Record<string, string>;
  uses_context: string[];
  editor_script: string;
  script: string;
  editor_style: string;
  style: string;
}

export interface EditorBlock {
  id: string;
  name: string;
  attributes: Record<string, unknown>;
  innerBlocks: EditorBlock[];
  innerHTML: string;
  innerContent: string[];
}

export interface TemplatePart {
  id: string;
  slug: string;
  theme: string;
  type: string;
  source: string;
  origin: string;
  content: string | EditorBlock[];
  title: {
    raw: string;
    rendered: string;
  };
  description: string;
  status: "publish" | "future" | "draft" | "pending" | "private";
  wp_id: number;
  has_theme_file: boolean;
  author: number;
  area: string;
}

export interface SearchResult {
  id: number;
  title: string;
  url: string;
  type: string;
  subtype: string;
  _links: {
    self: Array<{
      embeddable: boolean;
      href: string;
    }>;
    about: Array<{
      href: string;
    }>;
  };
}

// Component Props Types
export interface FilterBarProps {
  authors: Author[];
  tags: Tag[];
  categories: Category[];
  selectedAuthor?: Author["id"];
  selectedTag?: Tag["id"];
  selectedCategory?: Category["id"];
  onAuthorChange?: (authorId: Author["id"] | undefined) => void;
  onTagChange?: (tagId: Tag["id"] | undefined) => void;
  onCategoryChange?: (categoryId: Category["id"] | undefined) => void;
}

export interface WpMenuItem {
  id: number;
  title: string;
  url: string;
  children?: WpMenuItem[];
}

export interface Region extends Taxonomy {
  taxonomy: "region";
}

export interface OurNCC extends WPEntity {
  title: RenderedTitle;
  ncc_year_of_tenure: string;
  ncc_region: string;
  ncc_country_name: string;
  ncc_name: string;
  ncc_role: string;
  ncc_est_date: string;
  ncc_official_email: string;
  ncc_website: string;
}

export interface ExecutiveCommittee extends WPEntity {
  title: RenderedTitle;
  featured_media: number;
  committee_role: string;
  committee_institution: string;
  committee_country: string;
  hierarchy_order: number;
  image_url?: string; // Direct image URL for easy access
  _embedded?: {
    "wp:featuredmedia"?: FeaturedMedia[];
  };
}

export interface WordPressPaginationHeaders {
  total: number;
  totalPages: number;
}

export interface WordPressResponse<T> {
  data: T;
  headers: WordPressPaginationHeaders;
}

export type LinkGridProps = {
  /**
   * Array of links to display in a grid.
   * Example: ['https://example.com', 'https://google.com', ...]
   */
  links: Links[];
};

type Links = {
  label: string;
  url: string;
};

export type BlogPostProps = {
  /**
   * Unique identifier for the blog post.
   */
  id: string;
  /**
   * Title of the blog post.
   */
  title: string;
  /**
   * URL-friendly slug for the blog post.
   */
  slug: string;
  /**
   * Date of the blog post.
   */
  date: string;
  /**
   * Image URL for the blog post.
   */
  image: string;
  /**
   * Content of the blog post (HTML).
   */
  content: string;
  /**
   * Category of the blog post (e.g., "Meditation", "Wellness", "Tips").
   */
  category?: string;
  /**
   * Whether the post is published.
   */
  published?: boolean;
};

export interface BlogPostInterface {
  post: BlogPostProps;
}

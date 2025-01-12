export type LinkGridProps = {
    /**
     * Array of links to display in a grid.
     * Example: ['https://example.com', 'https://google.com', ...]
     */
    links: Links[];
  };

type Links = {
    label: string;
    url: string
}


export type BlogPostProps = {
    /**
     * Title of the blog post.
     */
    title: string;
    /**
     * Date of the blog post.
     */
    date: string;
    /**
     * Image URL for the blog post.
     */
    image: string;
    /**
     * Content of the blog post.
     */
    content: string;
  };

export interface BlogPostInterface {
  post: BlogPostProps;
}
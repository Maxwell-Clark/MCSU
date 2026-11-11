export const CONTENT_KINDS = [
  'practice_video',
  'music',
  'resource_video',
  'book',
  'paper',
  'link',
  'poem',
] as const;

export type ContentKind = (typeof CONTENT_KINDS)[number];

export type ContentField =
  | 'creator'
  | 'category'
  | 'duration'
  | 'youtube'
  | 'url'
  | 'image'
  | 'body';

interface FieldSpec {
  label: string;
  required?: boolean;
  placeholder?: string;
}

export interface ContentKindConfig {
  /** Plural label for tabs and headings */
  label: string;
  /** Singular label for buttons ("New Book") */
  singular: string;
  /** Public page the content appears on */
  publicPath: '/practice' | '/resources';
  /** Label for the title field */
  titleLabel: string;
  fields: Partial<Record<ContentField, FieldSpec>>;
}

export const CONTENT_KIND_CONFIG: Record<ContentKind, ContentKindConfig> = {
  practice_video: {
    label: 'Practice Videos',
    singular: 'Practice Video',
    publicPath: '/practice',
    titleLabel: 'Title',
    fields: {
      youtube: { label: 'YouTube link', required: true },
      category: { label: 'Category', required: true, placeholder: 'e.g. Body Scan' },
      creator: { label: 'Instructor', placeholder: 'e.g. Jon Kabat-Zinn' },
      duration: { label: 'Duration', placeholder: 'e.g. 29 minutes' },
    },
  },
  music: {
    label: 'Music',
    singular: 'Track',
    publicPath: '/practice',
    titleLabel: 'Track title',
    fields: {
      youtube: { label: 'YouTube link', required: true },
      category: { label: 'Category', required: true, placeholder: 'e.g. Nature' },
      creator: { label: 'Artist' },
      duration: { label: 'Duration', placeholder: 'e.g. 3:34' },
    },
  },
  resource_video: {
    label: 'Resource Videos',
    singular: 'Resource Video',
    publicPath: '/resources',
    titleLabel: 'Title',
    fields: {
      youtube: { label: 'YouTube link', required: true },
      creator: { label: 'Speaker', placeholder: 'e.g. Kristin Neff' },
    },
  },
  book: {
    label: 'Books',
    singular: 'Book',
    publicPath: '/resources',
    titleLabel: 'Book title',
    fields: {
      image: { label: 'Cover image', required: true },
      url: { label: 'Where to get it (link)', required: true, placeholder: 'https://' },
    },
  },
  paper: {
    label: 'Papers',
    singular: 'Paper',
    publicPath: '/resources',
    titleLabel: 'Article title',
    fields: {
      url: { label: 'Article link', required: true, placeholder: 'https://' },
      image: { label: 'Card image', required: true },
      category: { label: 'Category', placeholder: 'e.g. Health' },
    },
  },
  link: {
    label: 'Links',
    singular: 'Link',
    publicPath: '/resources',
    titleLabel: 'Link text',
    fields: {
      url: { label: 'URL', required: true, placeholder: 'https://' },
    },
  },
  poem: {
    label: 'Poems',
    singular: 'Poem',
    publicPath: '/resources',
    titleLabel: 'Poem title',
    fields: {
      creator: { label: 'Author', required: true },
      category: { label: 'Category', placeholder: 'e.g. Mindfulness' },
      body: { label: 'Poem text', required: true, placeholder: 'One line of the poem per line' },
    },
  },
};

export function isContentKind(value: unknown): value is ContentKind {
  return typeof value === 'string' && (CONTENT_KINDS as readonly string[]).includes(value);
}

/** Shape the public pages render. */
export interface ContentItemView {
  id: string;
  kind: string;
  title: string;
  creator: string | null;
  category: string | null;
  duration: string | null;
  youtubeId: string | null;
  url: string | null;
  image: string | null;
  body: string | null;
}

/** Distinct categories in first-appearance order (items arrive sorted by sortOrder). */
export function categoriesInOrder(items: { category: string | null }[]): string[] {
  const seen: string[] = [];
  for (const { category } of items) {
    if (category && !seen.some((c) => c.toLowerCase() === category.toLowerCase())) {
      seen.push(category);
    }
  }
  return seen;
}

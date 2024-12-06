export interface Frontmatter {
  title: string;
  date: string;
  tags?: string[];
  slug: string;
  draft?: boolean;
  [key: string]: unknown;
}

export interface ContentItem {
  frontmatter: Frontmatter;
  content: string;
  path: string;
}

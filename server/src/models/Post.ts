export interface PostFrontmatter {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover: {
    img: string;
    credit?: string;
    url: string;
  };
  category: string[];
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
}

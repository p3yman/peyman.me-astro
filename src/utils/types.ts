export interface Post {
  id: string;
  slug: string;
  body: string;
  url: string;
  data: {
    id: string;
    description: string;
    title: string;
    date: Date;
    category: string[];
  };
}

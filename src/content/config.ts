import { defineCollection, z } from "astro:content";
import { categories } from "../configs/categories";

const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      date: z.date(),
      cover: image().refine((img) => img.width >= 720, {
        message: "Cover image must be at least 720 pixels wide!",
      }),
      category: z.array(z.enum(categories as [string, ...string[]])),
    }),
});

export const collections = {
  blog: blogCollection,
};

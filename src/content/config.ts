import { defineCollection, z } from "astro:content";

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
    }),
});

export const collections = {
  blog: blogCollection,
};

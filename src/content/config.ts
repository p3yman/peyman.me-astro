import { defineCollection, z } from "astro:content";
import { Categories } from "../configs";

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
      category: z.array(z.enum(Categories)),
    }),
});

export const collections = {
  blog: blogCollection,
};

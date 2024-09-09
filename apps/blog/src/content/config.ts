import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    draft: z.boolean().optional(),
    mark: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { posts: postCollection };

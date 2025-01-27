import { defineCollection, defineConfig } from "@content-collections/core";

const posts = defineCollection({
  name: "posts",
  directory: "./posts",
  include: ["**/*.md", "**/*.mdx"],
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    draft: z.boolean().optional(),
    mark: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export default defineConfig({
  collections: [posts],
});

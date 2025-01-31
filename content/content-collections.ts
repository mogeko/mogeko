import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
  transform: async (document, context) => {
    const content = document.content;

    Object.assign(document, {
      content: content.replace(/from\s+["']@\/([^"']+)["']/g, (_m, p1) => {
        return `from "${resolve(__dirname, "../..", p1.replace("@/", ""))}"`;
      }),
    });

    const mdx = await compileMDX(context, document);
    return Object.assign({}, document, { mdx });
  },
});

export default defineConfig({
  collections: [posts],
});

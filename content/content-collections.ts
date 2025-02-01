import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeShiki, { type RehypeShikiOptions } from "@shikijs/rehype";
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";

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

    const shikiConfig: RehypeShikiOptions = {
      theme: "andromeeda",
      transformers: [
        transformerNotationDiff({ matchAlgorithm: "v3" }),
        transformerNotationErrorLevel({ matchAlgorithm: "v3" }),
        transformerNotationWordHighlight({ matchAlgorithm: "v3" }),
        transformerNotationFocus({ matchAlgorithm: "v3" }),
        transformerNotationHighlight({ matchAlgorithm: "v3" }),
      ],
    };

    const mdx = await compileMDX(context, document, {
      rehypePlugins: [[rehypeShiki, shikiConfig]],
    });
    return Object.assign({}, document, { mdx });
  },
});

export default defineConfig({
  collections: [posts],
});

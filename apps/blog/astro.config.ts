import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import emoji from "remark-emoji";
import mermaid from "rehype-mermaid";

import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
} from "shikiji-transformers";

// https://astro.build/config
export default defineConfig({
  site: "https://mogeko-blog.vercel.app",
  markdown: {
    shikiConfig: {
      theme: "andromeeda",
      transformers: [
        transformerNotationDiff(),
        transformerNotationErrorLevel(),
      ],
      wrap: true,
    },
    remarkPlugins: [[emoji, { accessible: true }]],
    rehypePlugins: [mermaid],
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
  ],
  prefetch: true,
});

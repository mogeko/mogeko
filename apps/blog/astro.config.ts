import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import readingTime from "astro-reading-time";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

import emoji from "remark-emoji";
import mermaid from "rehype-mermaid";

import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationWordHighlight,
  transformerNotationFocus,
  transformerNotationHighlight,
} from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
  site: "https://v2.mogeko.me",
  markdown: {
    shikiConfig: {
      theme: "andromeeda",
      transformers: [
        transformerNotationDiff(),
        transformerNotationErrorLevel(),
        transformerNotationWordHighlight(),
        transformerNotationFocus(),
        transformerNotationHighlight(),
      ],
      wrap: true,
    },
    remarkPlugins: [[emoji as any, { accessible: true }]],
    rehypePlugins: [mermaid as any],
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    readingTime(),
    mdx(),
    partytown({
      config: {
        forward: ["si", "siq.push", "va", "vaq.push"],
      },
    }),
    sitemap(),
  ],
  prefetch: true,
});

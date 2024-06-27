import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mermaid from "astro-mermaid";
import readingTime from "astro-reading-time";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

import emoji from "remark-emoji";
import { remarkAnchorLink } from "remark-anchor-link";

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
    remarkPlugins: [
      [remarkAnchorLink, { location: "suffix", marker: "🔗" }],
      [emoji, { accessible: true }],
    ],
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    readingTime(),
    mdx(),
    mermaid(),
    partytown({
      config: {
        forward: ["si", "siq.push", "va", "vaq.push"],
      },
    }),
    sitemap(),
  ],
  prefetch: true,
});

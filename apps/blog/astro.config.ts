import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import readingTime from "astro-reading-time";
import mermaid from "astro-mermaid";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

import emoji from "remark-emoji";
import anchorLink from "remark-anchor-link";

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
      [anchorLink, { location: "suffix", marker: "🔗" }],
      [emoji, { accessible: true }],
    ],
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
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
  experimental: {
    env: {
      schema: {
        SITE_TITLE: envField.string({
          context: "server",
          default: "Mogeko's Blog",
          access: "public",
        }),
        SITE_DESCRIPTION: envField.string({
          context: "server",
          default:
            "A place to share what I've learned, what I'm working on, and what I'm thinking about.",
          access: "public",
        }),
        SITE_AUTHOR: envField.string({
          context: "server",
          default: "Mogeko",
          access: "public",
        }),
        SITE_KEYWORDS: envField.string({
          context: "server",
          default: "blog, programming, open source, software",
          access: "public",
        }),
      },
    },
  },
});

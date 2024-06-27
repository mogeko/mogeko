import { addMermaidClass } from "@/src/shiki-transformer";
import { wrapper } from "@/src/rehype-wrapper";
import rehypeMermaid from "rehype-mermaid";
import type { AstroIntegration } from "astro";

export default function mermaid(): AstroIntegration {
  return {
    name: "astro-mermaid",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({
          markdown: {
            shikiConfig: {
              transformers: [addMermaidClass()],
            },
            rehypePlugins: [wrapper, [rehypeMermaid, { strategy: "img-svg" }]],
          },
        });
      },
    },
  };
}

export { addMermaidClass };

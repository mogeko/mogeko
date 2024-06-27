import { addMermaidClass } from "@/src/shiki-transformer";
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
            rehypePlugins: [rehypeMermaid],
          },
        });
      },
    },
  };
}

export { addMermaidClass };

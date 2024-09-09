import { rehypeWrapper } from "@/rehype-wrapper";
import { addMermaidClass } from "@/shiki-transformer";
import type { AstroIntegration } from "astro";
import rehypeMermaid, { type RehypeMermaidOptions } from "rehype-mermaid";

export default function mermaid(
  options: RehypeMermaidOptions = { strategy: "img-svg" },
): AstroIntegration {
  return {
    name: "astro-mermaid",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({
          markdown: {
            shikiConfig: {
              transformers: [addMermaidClass()],
            },
            rehypePlugins: [rehypeWrapper, [rehypeMermaid, options]],
          },
        });
      },
    },
  };
}

export { addMermaidClass };

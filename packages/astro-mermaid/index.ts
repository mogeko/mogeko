import { addMermaidClass } from "@/src/shiki-transformer";
import type { AstroIntegration } from "astro";

export default function mermaid(): AstroIntegration {
  return {
    name: "astro-mermaid",
    hooks: {},
  };
}

export { addMermaidClass };

import type { ShikiTransformer } from "shiki";

export function addMermaidClass(): ShikiTransformer {
  return {
    name: "add-mermaid-class",
    pre(this, hast) {
      if (this.options.lang === "mermaid") {
        this.addClassToHast(hast, "mermaid");
      }

      return hast;
    },
  };
}

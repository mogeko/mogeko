import { addClassToHast, type ShikiTransformer } from "shiki";

export function addMermaidClass(): ShikiTransformer {
  return {
    name: "add-mermaid-class",
    pre(this, hast) {
      if (this.options.lang === "mermaid") {
        addClassToHast(hast, "mermaid");
      }

      return hast;
    },
  };
}

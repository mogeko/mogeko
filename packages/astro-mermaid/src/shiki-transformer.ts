import { addClassToHast, type ShikijiTransformer } from "shikiji";

export function addMermaidClass(): ShikijiTransformer {
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

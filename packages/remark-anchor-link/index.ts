import { visit } from "unist-util-visit";
import { u } from "unist-builder";
import Slugger from "github-slugger";
import type { Plugin } from "unified";
import type { Root } from "mdast";

export const remarkAnchorLink: Plugin<[], Root> = () => {
  const slugger = new Slugger();

  return (tree) => {
    visit(tree, "heading", (node) => {
      const text = node.children[0];

      if (!text || text.type !== "text") return;

      node.children.push(
        u("link", { url: `#${slugger.slug(text.value)}` }, [u("text", "#")]),
      );
    });
  };
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  const { unified } = await import("unified");

  const processor = unified().use(remarkAnchorLink);

  it("should add anchor link to headings", async () => {
    const input = u("root", [
      u("heading", { depth: 1 }, [u("text", "Hello, World!")]),
    ]) as Root;
    const output = u("root", [
      u("heading", { depth: 1 }, [
        u("text", "Hello, World!"),
        u("link", { url: "#hello-world" }, [u("text", "#")]),
      ]),
    ]);

    const result = await processor.run(input);

    expect(result).toEqual(output);
  });
}

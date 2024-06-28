import { visit } from "unist-util-visit";
import { u } from "unist-builder";
import GitHubSlugger from "github-slugger";
import type { Plugin } from "unified";
import type { Root } from "mdast";

export const remarkAnchorLink: Plugin<[Options?], Root> = ({
  levels = [1, 2, 3, 4],
  location,
  className = "anchor",
  marker = "#",
} = {}) => {
  const slugger = new GitHubSlugger();

  return (tree) => {
    visit(tree, "heading", (node) => {
      const text = node.children[0];

      if (text?.type === "text" && levels.includes(node.depth)) {
        const slug = slugger.slug(text.value);

        node.children[location === "suffix" ? "push" : "unshift"](
          u(
            "link",
            {
              data: { hProperties: { class: className } },
              url: `#${slug}`,
            },
            [u("text", marker)],
          ),
        );
        node.data = { hProperties: { id: slug } };
      }
    });
  };
};

export default remarkAnchorLink;

type Options = {
  location?: "prefix" | "suffix";
  className?: string;
  levels?: (1 | 2 | 3 | 4 | 5 | 6)[];
  marker?: string;
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  const { unified } = await import("unified");

  it("should add anchor link to headings", async () => {
    const input = u("root", [
      u("heading", { depth: 1 }, [u("text", "Hello, World!")]),
    ]) as Root;
    const output = u("root", [
      u("heading", { data: { hProperties: { id: "hello-world" } }, depth: 1 }, [
        u(
          "link",
          { data: { hProperties: { class: "anchor" } }, url: "#hello-world" },
          [u("text", "#")],
        ),
        u("text", "Hello, World!"),
      ]),
    ]);

    const processor = unified().use(remarkAnchorLink);

    expect(await processor.run(input)).toEqual(output);
  });

  it("should add anchor link to headings with custom options", async () => {
    const input = u("root", [
      u("heading", { depth: 1 }, [u("text", "Hello, World!")]),
    ]) as Root;
    const output = u("root", [
      u("heading", { data: { hProperties: { id: "hello-world" } }, depth: 1 }, [
        u("text", "Hello, World!"),
        u(
          "link",
          { data: { hProperties: { class: "custom" } }, url: "#hello-world" },
          [u("text", "#")],
        ),
      ]),
    ]);

    const processor = unified().use(remarkAnchorLink, {
      location: "suffix",
      className: "custom",
    });

    expect(await processor.run(input)).toEqual(output);
  });
}

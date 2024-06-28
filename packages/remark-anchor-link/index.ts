import { visit } from "unist-util-visit";
import { u } from "unist-builder";
import GitHubSlugger from "github-slugger";
import type { Plugin } from "unified";
import type { Root } from "mdast";

export const remarkAnchorLink: Plugin<[Options?], Root> = (options) => {
  const slugger = new GitHubSlugger();

  return (tree) => {
    visit(tree, "heading", (node) => {
      if (
        node.children[0]?.type === "text" &&
        (options?.levels ?? [1, 2, 3, 4]).includes(node.depth)
      ) {
        const hProperties = { class: options?.className ?? "anchor" };
        const slug = slugger.slug(node.children[0].value);

        node.children[options?.location === "suffix" ? "push" : "unshift"](
          u("link", { data: { hProperties }, url: `#${slug}` }, [
            u("text", options?.marker ?? "#"),
          ]),
        );
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
      u("heading", { depth: 1 }, [
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
      u("heading", { depth: 1 }, [
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

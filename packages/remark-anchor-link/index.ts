import { visit } from "unist-util-visit";
import { u } from "unist-builder";
import GitHubSlugger from "github-slugger";
import type { Plugin } from "unified";
import type { Root } from "mdast";

export const remarkAnchorLink: Plugin<[RemarkAnchorLinkOptions?], Root> = (
  // prettier-ignore
  {location, marker = "#", className = "anchor"} = {},
) => {
  const slugger = new GitHubSlugger();

  return (tree) => {
    visit(tree, "heading", (node) => {
      const text = node.children[0];

      if (!text || text.type !== "text") return;

      node.children[location === "suffix" ? "push" : "unshift"](
        u("link", { className, url: `#${slugger.slug(text.value)}` }, [
          u("text", marker),
        ]),
      );
    });
  };
};

type RemarkAnchorLinkOptions = {
  location?: "prefix" | "suffix";
  marker?: string;
  className?: string;
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
        u("link", { className: "anchor", url: "#hello-world" }, [
          u("text", "#"),
        ]),
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
        u("link", { className: "custom", url: "#hello-world" }, [
          u("text", "#"),
        ]),
      ]),
    ]);

    const processor = unified().use(remarkAnchorLink, {
      location: "suffix",
      className: "custom",
    });

    expect(await processor.run(input)).toEqual(output);
  });
}

import { assocPath } from "@mogeko/utils";
import GitHubSlugger from "github-slugger";
import type { Node, Root } from "mdast";
import type { Plugin } from "unified";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

export const remarkAnchorLink: Plugin<[Options?], Root> = ({
  levels = [1, 2, 3, 4],
  location,
  className = "anchor",
  marker = "#",
} = {}) => {
  const updateProperties = <T>(data: Record<string, T>) => {
    return <N extends Node>(node: N): N => {
      for (const [key, value] of Object.entries(data)) {
        assocPath(["data", "hProperties", key], value, node);
      }

      return node;
    };
  };

  const slugger = new GitHubSlugger();

  return (tree) => {
    visit(tree, "heading", (node) => {
      const text = node.children[0];

      if (text?.type === "text" && levels.includes(node.depth)) {
        const slug = slugger.slug(text.value);

        node.children[location === "suffix" ? "push" : "unshift"](
          updateProperties({
            class: className,
            ariaHidden: "true",
            tabindex: "-1",
          })(u("link", { url: `#${slug}` }, [u("text", marker)])),
        );
        updateProperties({ id: slug })(node);
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

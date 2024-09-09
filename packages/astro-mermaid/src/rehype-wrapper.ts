import type { Element } from "hast";
import ClassList from "hast-util-class-list";
import { h } from "hastscript";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export const rehypeWrapper: Plugin<
  [Partial<Pick<Element, "tagName" | "properties">>?],
  Element
> = ({ tagName = "p", properties = {} } = {}) => {
  return (tree) => {
    visit(tree, { tagName: "pre" }, (node, index, parents) => {
      if (ClassList(node).contains("mermaid")) {
        if (parents) {
          tree.children[index ?? 0] = h(tagName, properties, [node]);
        }
      }
    });
  };
};

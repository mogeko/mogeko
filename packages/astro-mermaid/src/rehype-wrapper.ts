import { visit } from "unist-util-visit";
import { h } from "hastscript";
import ClassList from "hast-util-class-list";
import type { Plugin } from "unified";
import type { Element } from "hast";

export const rehypeWrapper: Plugin<
  [Partial<Pick<Element, "tagName" | "properties">>?],
  Element
> = ({ tagName = "p", properties = {} } = {}) => {
  return function (tree) {
    visit(tree, { tagName: "pre" }, (node, index = 0, parents) => {
      if (ClassList(node).contains("mermaid")) {
        if (parents) {
          tree.children[index] = h(tagName, properties, [node]);
        }
      }
    });
  };
};

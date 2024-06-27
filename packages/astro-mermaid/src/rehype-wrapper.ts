import { visit } from "unist-util-visit";
import { h } from "hastscript";
import ClassList from "hast-util-class-list";
import type { Element } from "hast";

export function wrapper({ properties = {}, tagName = "p" }: Options = {}) {
  return function (tree: Element) {
    visit(tree, { tagName: "pre" }, (node, index = 0, parents) => {
      if (ClassList(node).contains("mermaid")) {
        if (parents) {
          tree.children[index] = h(tagName, properties, [node]);
        }
      }
    });
  };
}

type Options = Partial<Pick<Element, "tagName" | "properties">>;

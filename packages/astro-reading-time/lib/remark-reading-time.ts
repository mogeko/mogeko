import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { assocPath } from "@mogeko/utils";
import { toString as _toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export const remarkReadingTime: RemarkPlugin<[]> = () => {
  return (tree, { data }) => {
    const { text, words } = getReadingTime(_toString(tree));

    assocPath(["astro", "frontmatter", "minutesRead"], text, data);
    assocPath(["astro", "frontmatter", "wordCount"], words, data);
  };
};

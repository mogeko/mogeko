import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import { assocPath } from "@/lib/utils";
import type { RemarkPlugin } from "@astrojs/markdown-remark";

export const remarkReadingTime: RemarkPlugin<[]> = () => {
  return (tree, { data }) => {
    const { text, words } = getReadingTime(toString(tree));

    assocPath(["astro", "frontmatter", "minutesRead"], text, data);
    assocPath(["astro", "frontmatter", "wordCount"], words, data);
  };
};

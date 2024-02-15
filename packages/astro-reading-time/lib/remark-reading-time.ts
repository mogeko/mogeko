import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import type { RemarkPlugin } from "@astrojs/markdown-remark";

export const remarkReadingTime: RemarkPlugin<[]> = () => {
  return (tree, { data }) => {
    const readingTime = getReadingTime(toString(tree));

    Object.assign((data.astro as any).frontmatter, {
      minutesRead: readingTime.text,
      wordCount: readingTime.words,
    });
  };
};

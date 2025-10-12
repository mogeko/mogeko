import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import { describe, expect, it } from "vitest";
import { remarkReadingTime } from "@/lib/remark-reading-time";

const md = "# Hello, world!\n\nThis is a test markdown content.";

describe("remarkReadingTime", () => {
  it("adds reading time to the frontmatter", async () => {
    const processor = await createMarkdownProcessor({
      remarkPlugins: [remarkReadingTime],
    });

    const result = await processor.render(md);

    expect(result.metadata.frontmatter).toEqual({
      minutesRead: "1 min read",
      wordCount: 7,
    });
    expect(result).toMatchSnapshot();
  });
});

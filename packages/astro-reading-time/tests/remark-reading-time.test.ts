import { remarkReadingTime } from "@/lib/remark-reading-time";
import { describe, it, expect } from "vitest";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

const md = `# Hello, world!\n\nThis is a test markdown content.`;

describe("remarkReadingTime", () => {
  it("adds reading time to the frontmatter", async () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkReadingTime)
      .use(remarkStringify);

    const result = await processor.process(md);

    expect(result.data.astro).toEqual({
      frontmatter: { minutesRead: "1 min read", wordCount: 7 },
    });
    expect(result.data).toMatchSnapshot();
  });
});

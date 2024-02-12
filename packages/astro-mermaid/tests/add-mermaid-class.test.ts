import { addMermaidClass } from "@/src/shiki-transformer";
import { codeToHtml } from "shikiji";
import { expect, describe, it } from "vitest";

const mermaidCode = `
flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
`;

describe("addMermaidClass", () => {
  it("Add mermaid class to code block", async () => {
    const html = await codeToHtml(mermaidCode, {
      lang: "mermaid",
      theme: "nord",
      transformers: [addMermaidClass()],
    });

    expect(html).toContain('class="shiki nord mermaid"');
    expect(html).toMatchSnapshot();
  });
});

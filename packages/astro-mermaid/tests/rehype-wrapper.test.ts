import { rehypeWrapper } from "@/rehype-wrapper";
import { h } from "hastscript";
import { unified } from "unified";
import { describe, expect, it } from "vitest";

describe("wrapper", () => {
  it("Wrap mermaid code block with p tag", async () => {
    const tree = h("body", [h("pre", { className: ["mermaid"] })]);

    await unified().use(rehypeWrapper).run(tree);

    expect(tree).toMatchObject(
      h("body", [h("p", [h("pre", { className: ["mermaid"] })])]),
    );
    expect(tree).toMatchSnapshot();
  });

  it("Wrap mermaid code block with custom tag", async () => {
    const tree = h("body", [h("pre", { className: ["mermaid"] })]);

    await unified().use(rehypeWrapper, { tagName: "div" }).run(tree);

    expect(tree).toMatchObject(
      h("body", [h("div", [h("pre", { className: ["mermaid"] })])]),
    );
    expect(tree).toMatchSnapshot();
  });

  it("Wrap pre with p tag", async () => {
    const tree = h("pre", { className: ["mermaid"] });

    await unified().use(rehypeWrapper).run(tree);

    expect(tree).toMatchObject(h("pre", { className: ["mermaid"] }));
    expect(tree).toMatchSnapshot();
  });

  it("Wrap multiple mermaid code block with p tag", async () => {
    const tree = h("body", [
      h("pre", { className: ["mermaid"] }),
      h("pre", { className: ["mermaid"] }),
    ]);

    await unified().use(rehypeWrapper).run(tree);

    expect(tree).toMatchObject(
      h("body", [
        h("p", [h("pre", { className: ["mermaid"] })]),
        h("p", [h("pre", { className: ["mermaid"] })]),
      ]),
    );
    expect(tree).toMatchSnapshot();
  });
});

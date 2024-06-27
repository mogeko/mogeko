import { expect, describe, it } from "vitest";
import { wrapper } from "@/src/rehype-wrapper";
import { h } from "hastscript";

describe("wrapper", () => {
  it("Wrap mermaid code block with p tag", () => {
    const tree = h("body", [h("pre", { className: ["mermaid"] })]);

    wrapper()(tree);

    expect(tree).toMatchObject(
      h("body", [h("p", [h("pre", { className: ["mermaid"] })])]),
    );
    expect(tree).toMatchSnapshot();
  });

  it("Wrap mermaid code block with custom tag", () => {
    const tree = h("body", [h("pre", { className: ["mermaid"] })]);

    wrapper({ tagName: "div" })(tree);

    expect(tree).toMatchObject(
      h("body", [h("div", [h("pre", { className: ["mermaid"] })])]),
    );
    expect(tree).toMatchSnapshot();
  });

  it("Wrap pre with p tag", () => {
    const tree = h("pre", { className: ["mermaid"] });

    wrapper()(tree);

    expect(tree).toMatchObject(h("pre", { className: ["mermaid"] }));
    expect(tree).toMatchSnapshot();
  });

  it("Wrap multiple mermaid code block with p tag", () => {
    const tree = h("body", [
      h("pre", { className: ["mermaid"] }),
      h("pre", { className: ["mermaid"] }),
    ]);

    wrapper()(tree);

    expect(tree).toMatchObject(
      h("body", [
        h("p", [h("pre", { className: ["mermaid"] })]),
        h("p", [h("pre", { className: ["mermaid"] })]),
      ]),
    );
    expect(tree).toMatchSnapshot();
  });
});

import { expect, it } from "bun:test";
import type { Root } from "mdast";
import { unified } from "unified";
import { u } from "unist-builder";
import remarkAnchorLink from "@/index";

it("should add anchor link to headings", async () => {
  const input = u("root", [
    u("heading", { depth: 1 }, [u("text", "Hello, World!")]),
  ]) as Root;
  const output = u("root", [
    u("heading", { data: { hProperties: { id: "hello-world" } }, depth: 1 }, [
      u(
        "link",
        {
          data: {
            hProperties: {
              class: "anchor",
              ariaHidden: "true",
              tabindex: "-1",
            },
          },
          url: "#hello-world",
        },
        [u("text", "#")],
      ),
      u("text", "Hello, World!"),
    ]),
  ]) as Root;

  const processor = unified().use(remarkAnchorLink);

  expect(await processor.run(input)).toEqual(output);
});

it("should add anchor link to headings with custom options", async () => {
  const input = u("root", [
    u("heading", { depth: 1 }, [u("text", "Hello, World!")]),
  ]) as Root;
  const output = u("root", [
    u("heading", { data: { hProperties: { id: "hello-world" } }, depth: 1 }, [
      u("text", "Hello, World!"),
      u(
        "link",
        {
          data: {
            hProperties: {
              class: "custom",
              ariaHidden: "true",
              tabindex: "-1",
            },
          },
          url: "#hello-world",
        },
        [u("text", "#")],
      ),
    ]),
  ]) as Root;

  const processor = unified().use(remarkAnchorLink, {
    location: "suffix",
    className: "custom",
  });

  expect(await processor.run(input)).toEqual(output);
});

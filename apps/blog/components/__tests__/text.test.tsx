import type { RichTextItemResponse } from "@notionhq/client";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { plainText } from "@/components/text";

describe("plainText", () => {
  it("should convert rich text array to plain text string", () => {
    const richText: Array<RichTextItemResponse> = [
      {
        type: "text",
        text: { content: "Hello", link: null },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: "Hello",
        href: null,
      },
      {
        type: "text",
        text: { content: " World", link: null },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: " World",
        href: null,
      },
    ];

    const result = plainText(richText);

    expect(result).toBe("Hello, World");
  });

  it("should handle empty rich text array", () => {
    const richText: Array<RichTextItemResponse> = [];
    const result = plainText(richText);

    expect(result).toBe("");
  });

  it("should handle rich text with special characters", () => {
    const richText: Array<RichTextItemResponse> = [
      {
        type: "text",
        text: { content: "Test & Test", link: null },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: "Test & Test",
        href: null,
      },
    ];

    const result = plainText(richText);

    expect(result).toBe("Test & Test");
  });
});

describe("RichText", async () => {
  vi.mock("katex", () => ({ renderToString: vi.fn() }));

  const { RichText } = await import("@/components/text");

  afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
  });

  it("should render plain text without annotations", () => {
    const richText: Array<RichTextItemResponse> = [
      {
        type: "text",
        text: { content: "Simple text", link: null },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: "Simple text",
        href: null,
      },
    ];

    const { container } = render(<RichText richText={richText} />);

    const spanElement = container.querySelector("span");

    expect(spanElement).toBeDefined();
    expect(spanElement?.textContent).toBe("Simple text");
    expect(spanElement?.className).toBe("");
  });

  it("should render text with bold annotation", () => {
    const richText: Array<RichTextItemResponse> = [
      {
        type: "text",
        text: { content: "Bold text", link: null },
        annotations: {
          bold: true,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: "Bold text",
        href: null,
      },
    ];

    const { container } = render(<RichText richText={richText} />);

    const spanElement = container.querySelector("span");

    expect(spanElement).toBeDefined();
    expect(spanElement?.className).toContain("font-bold");
  });

  it("should render text with italic annotation", () => {
    const richText: Array<RichTextItemResponse> = [
      {
        type: "text",
        text: { content: "Italic text", link: null },
        annotations: {
          bold: false,
          italic: true,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: "Italic text",
        href: null,
      },
    ];

    const { container } = render(<RichText richText={richText} />);

    const spanElement = container.querySelector("span");

    expect(spanElement).toBeDefined();
    expect(spanElement?.className).toContain("italic");
  });

  it("should render text with code annotation", () => {
    const richText: Array<RichTextItemResponse> = [
      {
        type: "text",
        text: { content: "code text", link: null },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: true,
          color: "default",
        },
        plain_text: "code text",
        href: null,
      },
    ];

    const { container } = render(<RichText richText={richText} />);

    const spanElement = container.querySelector("span");

    expect(spanElement).toBeDefined();
    expect(spanElement?.className).toContain("bg-muted");
    expect(spanElement?.className).toContain("text-destructive");
  });

  it("should render text with external link", () => {
    const richText: Array<RichTextItemResponse> = [
      {
        type: "text",
        text: {
          content: "External link",
          link: { url: "https://example.com" },
        },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: "External link",
        href: "https://example.com",
      },
    ];

    const { container } = render(<RichText richText={richText} />);

    const linkElement = container.querySelector("a");

    expect(linkElement).toBeDefined();
    expect(linkElement?.getAttribute("href")).toBe("https://example.com");
    expect(linkElement?.textContent).toBe("External link");
  });

  it("should render text with internal link", () => {
    const richText: Array<RichTextItemResponse> = [
      {
        type: "text",
        text: {
          content: "Internal link",
          link: { url: "/some-post" },
        },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: "Internal link",
        href: "/some-post",
      },
    ];

    const { container } = render(<RichText richText={richText} />);

    const linkElement = container.querySelector("a");

    expect(linkElement).toBeDefined();
    expect(linkElement?.getAttribute("href")).toBe("/posts/some-post");
    expect(linkElement?.textContent).toBe("Internal link");
  });

  it("should apply custom className", () => {
    const richText: Array<RichTextItemResponse> = [
      {
        type: "text",
        text: { content: "Custom class text", link: null },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: "Custom class text",
        href: null,
      },
    ];

    const { container } = render(
      <RichText richText={richText} className="custom-class" />,
    );

    const spanElement = container.querySelector("span");

    expect(spanElement).toBeDefined();
    expect(spanElement?.className).toContain("custom-class");
  });

  it("should handle multiple rich text items", () => {
    const richText: Array<RichTextItemResponse> = [
      {
        type: "text",
        text: { content: "First ", link: null },
        annotations: {
          bold: true,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: "First ",
        href: null,
      },
      {
        type: "text",
        text: { content: "Second", link: null },
        annotations: {
          bold: false,
          italic: true,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: "Second",
        href: null,
      },
    ];

    const { container } = render(<RichText richText={richText} />);

    const spanElements = container.querySelectorAll("span");

    expect(spanElements).toHaveLength(2);
    expect(spanElements[0]?.className).toContain("font-bold");
    expect(spanElements[1]?.className).toContain("italic");
  });

  it("should handle empty rich text array", () => {
    const richText: Array<RichTextItemResponse> = [];

    const { container } = render(<RichText richText={richText} />);

    expect(container.children).toHaveLength(0);
  });
});

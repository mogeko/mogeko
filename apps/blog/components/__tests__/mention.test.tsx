import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Mention } from "@/components/mention";
import type { MentionRichTextItemResponse } from "@/lib/notion";

describe("Mention", () => {
  it("should render page mention as link", () => {
    const mention: MentionRichTextItemResponse["mention"] = {
      type: "page",
      page: {
        id: "page-123",
      },
    };

    const { container } = render(
      <Mention mention={mention}>Test Page</Mention>,
    );
    const linkElement = container.querySelector("a");
    expect(linkElement).toBeTruthy();
    expect(linkElement?.getAttribute("href")).toContain("/posts/");
    expect(linkElement?.textContent).toBe("Test Page");
  });

  it("should render database mention as link", () => {
    const mention: MentionRichTextItemResponse["mention"] = {
      type: "database",
      database: {
        id: "database-123",
      },
    };

    const { container } = render(
      <Mention mention={mention}>Test Database</Mention>,
    );
    const linkElement = container.querySelector("a");
    expect(linkElement).toBeTruthy();
    expect(linkElement?.getAttribute("href")).toContain("/posts/");
    expect(linkElement?.textContent).toBe("Test Database");
  });

  it("should apply custom className", () => {
    const mention: MentionRichTextItemResponse["mention"] = {
      type: "page",
      page: {
        id: "page-123",
      },
    };

    const { container } = render(
      <Mention mention={mention} className="custom-class">
        Test Page
      </Mention>,
    );
    const linkElement = container.querySelector("a");
    expect(linkElement).toBeTruthy();
    expect(linkElement?.className).toContain("custom-class");
  });
});

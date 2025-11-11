import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { Icon } from "@/components/icon";

describe("Icon", () => {
  it("should render emoji icon when icon type is emoji", async () => {
    const emojiIcon = {
      type: "emoji" as const,
      emoji: "🌟",
    };

    const { container } = await page.render(<Icon icon={emojiIcon} />);

    const spanElement = container.querySelector("span");
    expect(spanElement).toBeTruthy();
    expect(spanElement?.textContent).toBe("🌟");
  });

  it("should pass additional HTML attributes to the span element", async () => {
    const emojiIcon = {
      type: "emoji" as const,
      emoji: "🔥",
    };

    const { container } = await page.render(
      <Icon icon={emojiIcon} className="custom-class" title="fire icon" />,
    );

    const spanElement = container.querySelector("span");
    expect(spanElement).toBeTruthy();
    expect(spanElement?.className).toContain("custom-class");
    expect(spanElement?.getAttribute("title")).toBe("fire icon");
  });

  it("should handle null or undefined icon gracefully", async () => {
    const { container } = await page.render(<Icon icon={null as any} />);

    const spanElement = container.querySelector("span");
    expect(spanElement).toBeFalsy();
  });

  it("should handle icon with undefined emoji property", async () => {
    const invalidIcon = {
      type: "emoji" as const,
      emoji: undefined,
    };

    const { container } = await page.render(<Icon icon={invalidIcon as any} />);

    const spanElement = container.querySelector("span");
    expect(spanElement).toBeTruthy();
    expect(spanElement?.textContent).toBe("");
  });
});

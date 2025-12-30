import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Icon } from "@/components/icon";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("Icon", () => {
  it("should render emoji icon when icon type is emoji", () => {
    const emojiIcon = {
      type: "emoji" as const,
      emoji: "🌟",
    };

    const { container } = render(<Icon icon={emojiIcon} />);

    const spanElement = container.querySelector("span");

    expect(spanElement).toBeDefined();
    expect(spanElement?.textContent).toBe("🌟");
  });

  it("should pass additional HTML attributes to the span element", () => {
    const emojiIcon = {
      type: "emoji" as const,
      emoji: "🔥",
    };

    const { container } = render(
      <Icon icon={emojiIcon} className="custom-class" title="fire icon" />,
    );

    const spanElement = container.querySelector("span");

    expect(spanElement).toBeDefined();
    expect(spanElement?.className).toContain("custom-class");
    expect(spanElement?.getAttribute("title")).toBe("fire icon");
  });

  it("should handle null or undefined icon gracefully", () => {
    const { container } = render(<Icon icon={null} />);

    const spanElement = container.querySelector("span");

    expect(spanElement).toBeNull();
  });

  it("should handle icon with undefined emoji property", () => {
    const invalidIcon = {
      type: "emoji" as const,
      emoji: undefined as unknown as string,
    };

    const { container } = render(<Icon icon={invalidIcon} />);

    const spanElement = container.querySelector("span");

    expect(spanElement).toBeDefined();
    expect(spanElement?.textContent).toBe("");
  });
});

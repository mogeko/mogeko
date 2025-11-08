import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Badge } from "@/components/ui/badges";

describe("Badges", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render children correctly", () => {
    render(<Badge>Test Badge</Badge>);

    const badge = screen.getByText("Test Badge");
    expect(badge).toBeDefined();
    expect(badge.textContent).toBe("Test Badge");
  });

  it("should apply default classes", () => {
    render(<Badge>Test Badge</Badge>);

    const badge = screen.getByText("Test Badge");
    expect(badge.className).toContain("inline-flex");
    expect(badge.className).toContain("items-center");
    expect(badge.className).toContain("justify-center");
    expect(badge.className).toContain("outline-none");
    expect(badge.className).toContain("px-[1ch]");
    expect(badge.className).toContain("min-h-1");
    expect(badge.className).toContain("uppercas");
    expect(badge.className).toContain("bg-secondary");
    expect(badge.className).toContain("text-secondary-foreground");
  });

  it("should merge custom className with default classes", () => {
    render(<Badge className="custom-class">Test Badge</Badge>);

    const badge = screen.getByText("Test Badge");
    expect(badge.className).toContain("custom-class");
    expect(badge.className).toContain("bg-secondary"); // Ensure that the default class still exists.
  });

  it("should pass through additional HTML attributes", () => {
    render(
      <Badge id="test-badge" role="status" title="Badge Title">
        Test Badge
      </Badge>,
    );

    const badge = screen.getByRole("status");
    expect(badge.getAttribute("id")).toBe("test-badge");
    expect(badge.getAttribute("title")).toBe("Badge Title");
  });

  it("should render as a span element", () => {
    render(<Badge>Test Badge</Badge>);

    const badge = screen.getByText("Test Badge");
    expect(badge.tagName).toBe("SPAN");
  });
});

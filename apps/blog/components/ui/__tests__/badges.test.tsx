import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import { Badge } from "@/components/ui/badges";

describe("Badges", () => {
  it("should render children correctly", async () => {
    await render(<Badge>Test Badge</Badge>);

    const badge = page.getByText("Test Badge").query();
    expect(badge).toBeDefined();
    expect(badge?.textContent).toBe("Test Badge");
  });

  it("should apply default classes", async () => {
    await render(<Badge>Test Badge</Badge>);

    const badge = page.getByText("Test Badge").query();
    expect(badge?.className).toContain("inline-flex");
    expect(badge?.className).toContain("items-center");
    expect(badge?.className).toContain("justify-center");
    expect(badge?.className).toContain("outline-none");
    expect(badge?.className).toContain("px-[1ch]");
    expect(badge?.className).toContain("min-h-1");
    expect(badge?.className).toContain("uppercas");
    expect(badge?.className).toContain("bg-secondary");
    expect(badge?.className).toContain("text-secondary-foreground");
  });

  it("should merge custom className with default classes", async () => {
    await render(<Badge className="custom-class">Test Badge</Badge>);

    const badge = page.getByText("Test Badge").query();
    expect(badge?.className).toContain("custom-class");
    expect(badge?.className).toContain("bg-secondary"); // Ensure that the default class still exists.
  });

  it("should pass through additional HTML attributes", async () => {
    await render(
      <Badge id="test-badge" role="status" title="Badge Title">
        Test Badge
      </Badge>,
    );

    const badge = page.getByRole("status").query();
    expect(badge?.getAttribute("id")).toBe("test-badge");
    expect(badge?.getAttribute("title")).toBe("Badge Title");
  });

  it("should render as a span element", async () => {
    await render(<Badge>Test Badge</Badge>);

    const badge = page.getByText("Test Badge").query();
    expect(badge?.tagName).toBe("SPAN");
  });

  it("should have correct data-slot attribute", async () => {
    await render(<Badge>Test Badge</Badge>);

    const badge = page.getByText("Test Badge").query();
    expect(badge?.getAttribute("data-slot")).toBe("badge");
  });
});

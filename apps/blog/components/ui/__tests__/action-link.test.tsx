import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";
import { ActionLink } from "@/components/ui/action-link";

describe("ActionLink", () => {
  it("should render link with children", async () => {
    await render(<ActionLink href="/test">Test Link</ActionLink>);

    const link = page.getByRole("link").query();
    expect(link).toBeDefined();
    expect(link?.textContent).toContain("Test Link");
    expect(link?.getAttribute("href")).toBe("/test");
  });

  it("should render default icon when no icon provided", async () => {
    await render(<ActionLink href="/test">Link with Default Icon</ActionLink>);

    const link = page.getByRole("link").query();
    const figure = link?.querySelector("figure");

    expect(figure).toBeDefined();
    expect(figure?.textContent).toBe("⊹");
  });

  it("should render custom icon when provided", async () => {
    await render(
      <ActionLink href="/test" icon="★">
        Link with Custom Icon
      </ActionLink>,
    );

    const link = page.getByRole("link").query();
    const figure = link?.querySelector("figure");

    expect(figure).toBeDefined();
    expect(figure?.textContent).toBe("★");
  });

  it("should apply custom className", async () => {
    await render(
      <ActionLink href="/test" className="custom-class">
        Custom Link
      </ActionLink>,
    );

    const link = page.getByRole("link").query();
    expect(link?.className).toContain("custom-class");
  });

  it("should have correct tabIndex", async () => {
    await render(<ActionLink href="/test">Default TabIndex</ActionLink>);

    const link = page.getByRole("link").query();
    expect(link?.getAttribute("tabIndex")).toBe("0");
  });

  it("should allow custom tabIndex", async () => {
    await render(
      <ActionLink href="/test" tabIndex={-1}>
        Custom TabIndex
      </ActionLink>,
    );

    const link = page.getByRole("link").query();
    expect(link?.getAttribute("tabIndex")).toBe("-1");
  });

  it("should forward all link attributes", async () => {
    await render(
      <ActionLink
        href="/test"
        target="_blank"
        rel="noopener"
        aria-label="Test link"
      >
        Link with Attributes
      </ActionLink>,
    );

    const link = page.getByRole("link", { name: "Test link" }).query();
    expect(link?.getAttribute("href")).toBe("/test");
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toBe("noopener");
    expect(link?.getAttribute("aria-label")).toBe("Test link");
  });

  it("should have correct hover and focus styles for icon", async () => {
    await render(<ActionLink href="/test">Styled Link</ActionLink>);

    const link = page.getByRole("link").query();

    expect(link?.className).toContain("hover:[&>figure]:bg-accent");
    expect(link?.className).toContain("focus:[&>figure]:bg-accent");
  });

  it("should have correct structure with figure and span", async () => {
    await render(<ActionLink href="/test">Structured Link</ActionLink>);

    const link = page.getByRole("link").query();
    const figure = link?.querySelector("figure");
    const span = link?.querySelector("span");

    expect(figure).toBeDefined();
    expect(span).toBeDefined();
    expect(figure?.className).toContain("inline-flex");
    expect(figure?.className).toContain("shrink");
    expect(span?.className).toContain("inline-flex");
    expect(span?.className).toContain("self-stretch");
  });

  it("should handle click events", async () => {
    const handleClick = vi.fn((e) => e.preventDefault());
    const user = userEvent.setup();

    await render(
      <ActionLink href="/test" onClick={handleClick}>
        Clickable Link
      </ActionLink>,
    );

    const link = page.getByRole("link");
    await user.click(link);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should have correct data-slot attribute", async () => {
    await render(<ActionLink href="/test">Test Link</ActionLink>);

    const link = page.getByRole("link").query();
    expect(link?.getAttribute("data-slot")).toBe("link");
  });
});

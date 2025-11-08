import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ActionLink } from "@/components/ui/action-link";

describe("ActionLink", () => {
  it("should render link with children", () => {
    render(<ActionLink href="/test">Test Link</ActionLink>);

    const link = screen.getByRole("link");
    expect(link).toBeDefined();
    expect(link.textContent).toContain("Test Link");
    expect(link.getAttribute("href")).toBe("/test");
  });

  it("should render default icon when no icon provided", () => {
    render(<ActionLink href="/test">Link with Default Icon</ActionLink>);

    const link = screen.getByRole("link");
    const figure = link.querySelector("figure");

    expect(figure).toBeDefined();
    expect(figure?.textContent).toBe("⊹");
  });

  it("should render custom icon when provided", () => {
    render(
      <ActionLink href="/test" icon="★">
        Link with Custom Icon
      </ActionLink>,
    );

    const link = screen.getByRole("link");
    const figure = link.querySelector("figure");

    expect(figure).toBeDefined();
    expect(figure?.textContent).toBe("★");
  });

  it("should apply custom className", () => {
    render(
      <ActionLink href="/test" className="custom-class">
        Custom Link
      </ActionLink>,
    );

    const link = screen.getByRole("link");
    expect(link.className).toContain("custom-class");
  });

  it("should have correct tabIndex", () => {
    render(<ActionLink href="/test">Default TabIndex</ActionLink>);

    const link = screen.getByRole("link");
    expect(link.getAttribute("tabIndex")).toBe("0");
  });

  it("should allow custom tabIndex", () => {
    render(
      <ActionLink href="/test" tabIndex={-1}>
        Custom TabIndex
      </ActionLink>,
    );

    const link = screen.getByRole("link");
    expect(link.getAttribute("tabIndex")).toBe("-1");
  });

  it("should forward all link attributes", () => {
    render(
      <ActionLink
        href="/test"
        target="_blank"
        rel="noopener"
        aria-label="Test link"
      >
        Link with Attributes
      </ActionLink>,
    );

    const link = screen.getByRole("link", { name: "Test link" });
    expect(link.getAttribute("href")).toBe("/test");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener");
    expect(link.getAttribute("aria-label")).toBe("Test link");
  });

  it("should have correct hover and focus styles for icon", () => {
    render(<ActionLink href="/test">Styled Link</ActionLink>);

    const link = screen.getByRole("link");

    expect(link.className).toContain("hover:[&>figure]:bg-accent");
    expect(link.className).toContain("focus:[&>figure]:bg-accent");
  });

  it("should have correct structure with figure and span", () => {
    render(<ActionLink href="/test">Structured Link</ActionLink>);

    const link = screen.getByRole("link");
    const figure = link.querySelector("figure");
    const span = link.querySelector("span");

    expect(figure).toBeDefined();
    expect(span).toBeDefined();
    expect(figure?.className).toContain("inline-flex");
    expect(figure?.className).toContain("shrink");
    expect(span?.className).toContain("inline-flex");
    expect(span?.className).toContain("self-stretch");
  });

  it("should handle click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <ActionLink href="/test" onClick={handleClick}>
        Clickable Link
      </ActionLink>,
    );

    const link = screen.getByRole("link");
    await user.click(link);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should have correct data-slot attribute", () => {
    render(<ActionLink href="/test">Test Link</ActionLink>);

    const link = screen.getByRole("link");
    expect(link.getAttribute("data-slot")).toBe("link");
  });
});

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Link, linkVariants } from "@/components/ui/link";

describe("linkVariants", () => {
  it("should return default styles for primary variant", () => {
    const result = linkVariants();

    expect(result).toContain("underline");
    expect(result).toContain("underline-offset-2");
    expect(result).toContain("decoration-2");
    expect(result).toContain("bg-muted");
    expect(result).toContain("text-muted-foreground");
  });

  it("should return ghost variant styles", () => {
    const result = linkVariants({ variant: "ghost" });

    expect(result).not.toContain("underline");
    expect(result).not.toContain("bg-muted");
    expect(result).not.toContain("text-muted-foreground");
  });

  it("should include base styles for all variants", () => {
    const primaryResult = linkVariants();

    expect(primaryResult).toContain("outline-none");
    expect(primaryResult).toContain("hover:bg-accent");
    expect(primaryResult).toContain("hover:text-accent-foreground");
    expect(primaryResult).toContain("focus:bg-accent");
    expect(primaryResult).toContain("focus:text-accent-foreground");

    const ghostResult = linkVariants({ variant: "ghost" });

    expect(ghostResult).toContain("outline-none");
    expect(ghostResult).toContain("hover:bg-accent");
    expect(ghostResult).toContain("hover:text-accent-foreground");
    expect(ghostResult).toContain("focus:bg-accent");
    expect(ghostResult).toContain("focus:text-accent-foreground");
  });

  it("should merge custom className", () => {
    const result = linkVariants({ className: "custom-class" });

    expect(result).toContain("custom-class");
    expect(result).toContain("underline"); // Ensure default styles are still included
  });
});

describe("Link", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
    document.body.innerHTML = "";
  });

  it("should render link with default props", () => {
    render(<Link href="/test">Test Link</Link>);

    const link = screen.getByRole("link", { name: "Test Link" });

    expect(link.textContent).toBe("Test Link");
    expect(link.getAttribute("href")).toBe("/test");
    expect(link.className).toContain("underline");
    expect(link.className).toContain("bg-muted");
  });

  it("should render link with ghost variant", () => {
    render(
      <Link href="/test" variant="ghost">
        Ghost Link
      </Link>,
    );

    const link = screen.getByRole("link", { name: "Ghost Link" });

    expect(link.className).not.toContain("underline");
    expect(link.className).not.toContain("bg-muted");
    expect(link.className).not.toContain("text-muted-foreground");
  });

  it("should apply custom className", () => {
    render(
      <Link href="/test" className="custom-link">
        Custom Link
      </Link>,
    );

    const link = screen.getByRole("link", { name: "Custom Link" });

    expect(link.className).toContain("custom-link");
    expect(link.className).toContain("underline"); // Ensure default styles are still included
  });

  it("should have default tabIndex of 0", () => {
    render(<Link href="/test">Default tabIndex</Link>);

    const link = screen.getByRole("link", { name: "Default tabIndex" });

    expect(link.getAttribute("tabIndex")).toBe("0");
  });

  it("should allow custom tabIndex", () => {
    render(
      <Link href="/test" tabIndex={-1}>
        Custom tabIndex
      </Link>,
    );

    const link = screen.getByRole("link", { name: "Custom tabIndex" });

    expect(link.getAttribute("tabIndex")).toBe("-1");
  });

  it("should pass through additional HTML attributes", () => {
    render(
      <Link
        href="/test"
        target="_blank"
        rel="noopener"
        data-testid="test-link"
        aria-label="External link"
      >
        Link with attributes
      </Link>,
    );

    const link = screen.getByTestId("test-link");

    expect(link.getAttribute("href")).toBe("/test");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener");
    expect(link.getAttribute("aria-label")).toBe("External link");
  });

  it("should have correct hover and focus styles", () => {
    render(<Link href="/test">Hover styles</Link>);

    const link = screen.getByRole("link", { name: "Hover styles" });

    expect(link.className).toContain("hover:bg-accent");
    expect(link.className).toContain("hover:text-accent-foreground");
    expect(link.className).toContain("focus:bg-accent");
    expect(link.className).toContain("focus:text-accent-foreground");
  });

  it("should have correct underline styles for primary variant", () => {
    render(<Link href="/test">Underline styles</Link>);

    const link = screen.getByRole("link", { name: "Underline styles" });

    expect(link.className).toContain("underline");
    expect(link.className).toContain("underline-offset-2");
    expect(link.className).toContain("decoration-2");
  });

  it("should handle click events", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn((e) => e.preventDefault());

    render(
      <Link href="/test" onClick={handleClick}>
        Clickable Link
      </Link>,
    );

    const link = screen.getByRole("link", { name: "Clickable Link" });

    await user.click(link);

    expect(handleClick).toBeCalledTimes(1);
  });

  it("should be focusable", async () => {
    const user = userEvent.setup();

    render(<Link href="/test">Focusable Link</Link>);

    const link = screen.getByRole("link", { name: "Focusable Link" });

    await user.tab();

    expect(document.activeElement).toBe(link);
  });

  it("should render complex children correctly", () => {
    render(
      <Link href="/test">
        <span>Complex</span>
        <span>link</span>
      </Link>,
    );

    expect(screen.queryByText("Complex")).toBeDefined();
    expect(screen.queryByText("link")).toBeDefined();
  });

  it("should have outline-none for accessibility", () => {
    render(<Link href="/test">Accessible link</Link>);

    const link = screen.getByRole("link", { name: "Accessible link" });

    expect(link.className).toContain("outline-none");
  });

  it("should have correct data-slot attribute", () => {
    render(<Link href="/test">Test Link</Link>);

    const link = screen.getByRole("link");

    expect(link.getAttribute("data-slot")).toBe("link");
  });
});

import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
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
    const ghostResult = linkVariants({ variant: "ghost" });

    expect(primaryResult).toContain("outline-none");
    expect(primaryResult).toContain("hover:bg-accent");
    expect(primaryResult).toContain("hover:text-accent-foreground");
    expect(primaryResult).toContain("focus:bg-accent");
    expect(primaryResult).toContain("focus:text-accent-foreground");

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
  it("should render link with default props", async () => {
    await page.render(<Link href="/test">Test Link</Link>);

    const link = page.getByRole("link", { name: "Test Link" }).query();
    expect(link).toBeDefined();
    expect(link?.textContent).toBe("Test Link");
    expect(link?.getAttribute("href")).toBe("/test");
    expect(link?.className).toContain("underline");
    expect(link?.className).toContain("bg-muted");
  });

  it("should render link with ghost variant", async () => {
    await page.render(
      <Link href="/test" variant="ghost">
        Ghost Link
      </Link>,
    );

    const link = page.getByRole("link", { name: "Ghost Link" }).query();
    expect(link).toBeDefined();
    expect(link?.className).not.toContain("underline");
    expect(link?.className).not.toContain("bg-muted");
    expect(link?.className).not.toContain("text-muted-foreground");
  });

  it("should apply custom className", async () => {
    await page.render(
      <Link href="/test" className="custom-link">
        Custom Link
      </Link>,
    );

    const link = page.getByRole("link", { name: "Custom Link" }).query();
    expect(link?.className).toContain("custom-link");
    expect(link?.className).toContain("underline"); // Ensure default styles are still included
  });

  it("should have default tabIndex of 0", async () => {
    await page.render(<Link href="/test">Default tabIndex</Link>);

    const link = page.getByRole("link", { name: "Default tabIndex" }).query();
    expect(link?.getAttribute("tabIndex")).toBe("0");
  });

  it("should allow custom tabIndex", async () => {
    await page.render(
      <Link href="/test" tabIndex={-1}>
        Custom tabIndex
      </Link>,
    );

    const link = page.getByRole("link", { name: "Custom tabIndex" }).query();
    expect(link?.getAttribute("tabIndex")).toBe("-1");
  });

  it("should pass through additional HTML attributes", async () => {
    await page.render(
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

    const link = page.getByTestId("test-link").query();
    expect(link).toBeDefined();
    expect(link?.getAttribute("href")).toBe("/test");
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toBe("noopener");
    expect(link?.getAttribute("aria-label")).toBe("External link");
  });

  it("should have correct hover and focus styles", async () => {
    await page.render(<Link href="/test">Hover styles</Link>);

    const link = page.getByRole("link", { name: "Hover styles" }).query();
    expect(link?.className).toContain("hover:bg-accent");
    expect(link?.className).toContain("hover:text-accent-foreground");
    expect(link?.className).toContain("focus:bg-accent");
    expect(link?.className).toContain("focus:text-accent-foreground");
  });

  it("should have correct underline styles for primary variant", async () => {
    await page.render(<Link href="/test">Underline styles</Link>);

    const link = page.getByRole("link", { name: "Underline styles" }).query();
    expect(link?.className).toContain("underline");
    expect(link?.className).toContain("underline-offset-2");
    expect(link?.className).toContain("decoration-2");
  });

  it("should handle click events", async () => {
    const handleClick = vi.fn((e) => e.preventDefault());
    const user = userEvent.setup();

    await page.render(
      <Link href="/test" onClick={handleClick}>
        Clickable Link
      </Link>,
    );

    const link = page.getByRole("link", { name: "Clickable Link" });
    await user.click(link);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should be focusable", async () => {
    const user = userEvent.setup();
    await page.render(<Link href="/test">Focusable Link</Link>);

    const link = page.getByRole("link", { name: "Focusable Link" });
    await user.tab();

    expect(document.activeElement).toBe(link.query());
  });

  it("should render complex children correctly", async () => {
    await page.render(
      <Link href="/test">
        <span>Complex</span>
        <span>link</span>
      </Link>,
    );

    await expect.element(page.getByText("Complex")).toBeDefined();
    await expect.element(page.getByText("link")).toBeDefined();
  });

  it("should have outline-none for accessibility", async () => {
    await page.render(<Link href="/test">Accessible link</Link>);

    const link = page.getByRole("link", { name: "Accessible link" }).query();
    expect(link?.className).toContain("outline-none");
  });

  it("should have correct data-slot attribute", async () => {
    await page.render(<Link href="/test">Test Link</Link>);

    const link = page.getByRole("link").query();
    expect(link?.getAttribute("data-slot")).toBe("link");
  });
});

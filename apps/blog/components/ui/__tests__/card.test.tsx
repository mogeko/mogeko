import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Card } from "@/components/ui/card";

describe("Card", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render card with children", () => {
    render(<Card>Test content</Card>);

    const article = screen.getByRole("article");
    expect(article).toBeDefined();
    expect(article.textContent).toContain("Test content");
  });

  it("should render card with title", () => {
    render(<Card title="Card Title">Test content</Card>);

    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toBeDefined();
    expect(title.textContent).toBe("Card Title");
  });

  it("should not render title when not provided", () => {
    render(<Card>Test content</Card>);

    const headings = screen.queryAllByRole("heading", { level: 2 });
    expect(headings).toHaveLength(0);
  });

  it("should apply default center variant styles", () => {
    render(<Card>Center variant</Card>);

    const article = screen.getByRole("article");
    expect(article.className).toContain("relative");
    expect(article.className).toContain("block");
    expect(article.className).toContain("whitespace-pre-wrap");

    const header = article.querySelector("header");
    expect(header).toBeDefined();

    const leftDiv = header?.firstChild as HTMLElement;
    const rightDiv = header?.lastChild as HTMLElement;

    expect(leftDiv?.className).toContain("w-full");
    expect(leftDiv?.className).toContain("min-w-1/10");
    expect(rightDiv?.className).toContain("w-full");
    expect(rightDiv?.className).toContain("min-w-1/10");
  });

  it("should apply left variant styles", () => {
    render(<Card variant="left">Left variant</Card>);

    const article = screen.getByRole("article");
    const header = article.querySelector("header");
    const leftDiv = header?.firstChild as HTMLElement;

    expect(leftDiv?.className).toContain("shrink-0");
    expect(leftDiv?.className).not.toContain("w-full");
    expect(leftDiv?.className).not.toContain("min-w-1/10");
  });

  it("should apply right variant styles", () => {
    render(<Card variant="right">Right variant</Card>);

    const article = screen.getByRole("article");
    const header = article.querySelector("header");
    const rightDiv = header?.lastChild as HTMLElement;

    expect(rightDiv?.className).toContain("shrink-0");
    expect(rightDiv?.className).not.toContain("w-full");
    expect(rightDiv?.className).not.toContain("min-w-1/10");
  });

  it("should apply custom className", () => {
    render(<Card className="custom-card">Custom card</Card>);

    const article = screen.getByRole("article");
    expect(article.className).toContain("custom-card");
    expect(article.className).toContain("relative"); // Ensure default styles are still included
  });

  it("should pass through additional HTML attributes", () => {
    render(
      <Card data-testid="test-card" aria-label="Card component" id="card-1">
        Card with attributes
      </Card>,
    );

    const article = screen.getByTestId("test-card");
    expect(article).toBeDefined();
    expect(article.getAttribute("aria-label")).toBe("Card component");
    expect(article.getAttribute("id")).toBe("card-1");
  });

  it("should have correct shadow styles", () => {
    render(<Card>Shadow test</Card>);

    const article = screen.getByRole("article");
    const header = article.querySelector("header");
    const section = article.querySelector("section");

    expect(header).toBeDefined();
    expect(section).toBeDefined();

    const leftDiv = header?.firstChild as HTMLElement;
    const rightDiv = header?.lastChild as HTMLElement;

    expect(leftDiv?.className).toContain("shadow-foreground");
    expect(leftDiv?.className).toContain(
      "shadow-[inset_2px_0_0_0,inset_0_2px_0_0]",
    );
    expect(rightDiv?.className).toContain("shadow-foreground");
    expect(rightDiv?.className).toContain(
      "shadow-[inset_-2px_0_0_0,inset_0_2px_0_0]",
    );
    expect(section?.className).toContain("shadow-foreground");
    expect(section?.className).toContain(
      "shadow-[inset_2px_0_0_0,inset_-2px_0_0_0,inset_0_-2px_0_0]",
    );
  });

  it("should have correct padding and spacing", () => {
    render(<Card>Spacing test</Card>);

    const article = screen.getByRole("article");
    const header = article.querySelector("header");
    const section = article.querySelector("section");

    expect(header?.className).toContain("flex");
    expect(header?.className).toContain("justify-between");
    expect(header?.className).toContain("items-end");

    expect(section?.className).toContain("pt-0.5");
    expect(section?.className).toContain("pb-1");
    expect(section?.className).toContain("px-[1ch]");
  });

  it("should have overflow handling in section", () => {
    render(<Card>Overflow test</Card>);

    const article = screen.getByRole("article");
    const section = article.querySelector("section");

    expect(section?.className).toContain("overflow-x-auto");
    expect(section?.className).toContain("overflow-y-hidden");
  });

  it("should render complex children correctly", () => {
    render(
      <Card>
        <div>Complex</div>
        <span>children</span>
        <p>content</p>
      </Card>,
    );

    expect(screen.getByText("Complex")).toBeDefined();
    expect(screen.getByText("children")).toBeDefined();
    expect(screen.getByText("content")).toBeDefined();
  });

  it("should have correct data-slot attribute", () => {
    render(<Card>Test card</Card>);

    const article = screen.getByRole("article");
    expect(article.getAttribute("data-slot")).toBe("card");
  });
});

import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";
import { Button, buttonVariants } from "@/components/ui/button";

describe("buttonVariants", () => {
  it("should return default styles for primary variant", () => {
    const result = buttonVariants();
    expect(result).toContain("bg-primary");
    expect(result).toContain("text-primary-foreground");
    expect(result).toContain("flex");
    expect(result).toContain("outline-none");
    expect(result).toContain("items-center");
    expect(result).toContain("justify-center");
  });

  it("should return secondary variant styles", () => {
    const result = buttonVariants({ variant: "secndary" });
    expect(result).toContain("bg-background");
    expect(result).toContain("text-foreground");
    expect(result).toContain("shadow-[inset_0_0_0_1px]");
    expect(result).toContain("shadow-secondary");
  });

  it("should include base styles for all variants", () => {
    const primaryResult = buttonVariants();
    const secondaryResult = buttonVariants({ variant: "secndary" });

    expect(primaryResult).toContain("font-bold");
    expect(primaryResult).toContain("min-h-2");
    expect(primaryResult).toContain("w-full");
    expect(primaryResult).toContain("px-[2ch]");
    expect(primaryResult).toContain("uppercase");
    expect(primaryResult).toContain("tracking-[1px]");
    expect(primaryResult).toContain("transition-colors");
    expect(primaryResult).toContain("duration-200");
    expect(primaryResult).toContain("cursor-pointer");

    expect(secondaryResult).toContain("font-bold");
    expect(secondaryResult).toContain("min-h-2");
    expect(secondaryResult).toContain("w-full");
    expect(secondaryResult).toContain("px-[2ch]");
    expect(secondaryResult).toContain("uppercase");
    expect(secondaryResult).toContain("tracking-[1px]");
    expect(secondaryResult).toContain("transition-colors");
    expect(secondaryResult).toContain("duration-200");
    expect(secondaryResult).toContain("cursor-pointer");
  });

  it("should include hover and focus styles", () => {
    const result = buttonVariants();
    expect(result).toContain("hover:bg-accent");
    expect(result).toContain("focus:bg-accent");
  });

  it("should include disabled styles", () => {
    const result = buttonVariants();
    expect(result).toContain("disabled:bg-secondary");
    expect(result).toContain("disabled:text-border");
    expect(result).toContain("disabled:cursor-not-allowed");
  });

  it("should merge custom className", () => {
    const result = buttonVariants({ className: "custom-class" });
    expect(result).toContain("custom-class");
    expect(result).toContain("bg-primary"); // Ensure default styles are still included
  });
});

describe("Button", () => {
  it("should render button with default props", async () => {
    await render(<Button>Click me</Button>);

    const button = page.getByRole("button", { name: "Click me" }).query();
    expect(button).toBeDefined();
    expect(button?.textContent).toBe("Click me");
    expect(button?.className).toContain("bg-primary");
    expect(button?.className).toContain("text-primary-foreground");
  });

  it("should render button with secondary variant", async () => {
    await render(<Button variant="secndary">Secondary Button</Button>);

    const button = page
      .getByRole("button", { name: "Secondary Button" })
      .query();
    expect(button).toBeDefined();
    expect(button?.className).toContain("bg-background");
    expect(button?.className).toContain("text-foreground");
    expect(button?.className).toContain("shadow-[inset_0_0_0_1px]");
    expect(button?.className).toContain("shadow-secondary");
  });

  it("should apply custom className", async () => {
    await render(<Button className="custom-button">Custom Button</Button>);

    const button = page.getByRole("button", { name: "Custom Button" }).query();
    expect(button?.className).toContain("custom-button");
    expect(button?.className).toContain("bg-primary"); // Ensure default styles are still included
  });

  it("should handle click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    await render(<Button onClick={handleClick}>Clickable Button</Button>);

    const button = page.getByRole("button", { name: "Clickable Button" });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should be disabled when disabled prop is true", async () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = page
      .getByRole("button", { name: "Disabled Button" })
      .query() as HTMLButtonElement | null;
    expect(button?.disabled).toBe(true);
    expect(button?.className).toContain("disabled:bg-secondary");
    expect(button?.className).toContain("disabled:text-border");
    expect(button?.className).toContain("disabled:cursor-not-allowed");
  });

  it("should forward all button attributes", async () => {
    await render(
      <Button type="submit" aria-label="Submit form" tabIndex={0}>
        Submit
      </Button>,
    );

    const button = page.getByRole("button", { name: "Submit form" }).query();
    expect(button?.getAttribute("type")).toBe("submit");
    expect(button?.getAttribute("aria-label")).toBe("Submit form");
    expect(button?.getAttribute("tabIndex")).toBe("0");
  });

  it("should render as child component when asChild is true", async () => {
    await render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );

    const link = page.getByRole("link", { name: "Link Button" }).query();
    expect(link).toBeDefined();
    expect(link?.getAttribute("href")).toBe("/test");
    expect(link?.className).toContain("bg-primary");
    expect(link?.className).toContain("text-primary-foreground");
  });

  it("should have correct hover and focus behavior", async () => {
    await render(<Button>Hover Button</Button>);

    const button = page.getByRole("button", { name: "Hover Button" }).query();
    expect(button?.className).toContain("hover:bg-accent");
    expect(button?.className).toContain("focus:bg-accent");
  });

  it("should have correct dimensions and typography", async () => {
    await render(<Button>Styled Button</Button>);

    const button = page.getByRole("button", { name: "Styled Button" }).query();
    expect(button?.className).toContain("min-h-2");
    expect(button?.className).toContain("w-full");
    expect(button?.className).toContain("px-[2ch]");
    expect(button?.className).toContain("font-bold");
    expect(button?.className).toContain("uppercase");
    expect(button?.className).toContain("tracking-[1px]");
  });

  it("should have correct data-slot attribute", async () => {
    await render(<Button>Test Button</Button>);

    const button = page.getByRole("button").query();
    expect(button?.getAttribute("data-slot")).toBe("button");
  });
});

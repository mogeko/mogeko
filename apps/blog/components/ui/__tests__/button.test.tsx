import { afterEach, describe, expect, it, mock } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    expect(primaryResult).toContain("font-bold");
    expect(primaryResult).toContain("min-h-2");
    expect(primaryResult).toContain("w-full");
    expect(primaryResult).toContain("px-[2ch]");
    expect(primaryResult).toContain("uppercase");
    expect(primaryResult).toContain("tracking-[1px]");
    expect(primaryResult).toContain("transition-colors");
    expect(primaryResult).toContain("duration-200");
    expect(primaryResult).toContain("cursor-pointer");

    const secondaryResult = buttonVariants({ variant: "secndary" });

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
  afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
  });

  it("should render button with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });

    expect(button.textContent).toBe("Click me");
    expect(button.className).toContain("bg-primary");
    expect(button.className).toContain("text-primary-foreground");
  });

  it("should render button with secondary variant", () => {
    render(<Button variant="secndary">Secondary Button</Button>);

    const button = screen.getByRole("button", { name: "Secondary Button" });

    expect(button.className).toContain("bg-background");
    expect(button.className).toContain("text-foreground");
    expect(button.className).toContain("shadow-[inset_0_0_0_1px]");
    expect(button.className).toContain("shadow-secondary");
  });

  it("should apply custom className", () => {
    render(<Button className="custom-button">Custom Button</Button>);

    const button = screen.getByRole("button", { name: "Custom Button" });

    expect(button.className).toContain("custom-button");
    expect(button.className).toContain("bg-primary"); // Ensure default styles are still included
  });

  it("should handle click events", async () => {
    const user = userEvent.setup();
    const handleClick = mock();

    render(<Button onClick={handleClick}>Clickable Button</Button>);

    const button = screen.getByRole("button", { name: "Clickable Button" });

    await user.click(button);

    expect(handleClick).toBeCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole<HTMLButtonElement>("button", {
      name: "Disabled Button",
    });

    expect(button.disabled).toBe(true);
    expect(button.className).toContain("disabled:bg-secondary");
    expect(button.className).toContain("disabled:text-border");
    expect(button.className).toContain("disabled:cursor-not-allowed");
  });

  it("should forward all button attributes", () => {
    render(
      <Button type="submit" aria-label="Submit form" tabIndex={0}>
        Submit
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Submit form" });

    expect(button.getAttribute("type")).toBe("submit");
    expect(button.getAttribute("aria-label")).toBe("Submit form");
    expect(button.getAttribute("tabIndex")).toBe("0");
  });

  it("should render as child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Link Button" });

    expect(link.getAttribute("href")).toBe("/test");
    expect(link.className).toContain("bg-primary");
    expect(link.className).toContain("text-primary-foreground");
  });

  it("should have correct hover and focus behavior", () => {
    render(<Button>Hover Button</Button>);

    const button = screen.getByRole("button", { name: "Hover Button" });

    expect(button.className).toContain("hover:bg-accent");
    expect(button.className).toContain("focus:bg-accent");
  });

  it("should have correct dimensions and typography", () => {
    render(<Button>Styled Button</Button>);

    const button = screen.getByRole("button", { name: "Styled Button" });

    expect(button.className).toContain("min-h-2");
    expect(button.className).toContain("w-full");
    expect(button.className).toContain("px-[2ch]");
    expect(button.className).toContain("font-bold");
    expect(button.className).toContain("uppercase");
    expect(button.className).toContain("tracking-[1px]");
  });

  it("should have correct data-slot attribute", () => {
    render(<Button>Test Button</Button>);

    const button = screen.getByRole("button");

    expect(button.getAttribute("data-slot")).toBe("button");
  });
});

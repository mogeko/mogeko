import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { Separator } from "@/components/ui/separator";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("Separator", () => {
  it("should render separator with default styles", () => {
    render(<Separator />);

    const separator = screen.getByRole("separator");

    expect(separator.className).toContain("block");
    expect(separator.className).toContain("bg-foreground");
    expect(separator.className).toContain("shrink-0");
    expect(separator.className).toContain("h-[2px]");
    expect(separator.className).toContain("w-full");
    expect(separator.className).toContain("border-none");
  });

  it("should apply custom className", () => {
    render(<Separator className="custom-separator" />);

    const separator = screen.getByRole("separator");

    expect(separator.className).toContain("custom-separator");
    expect(separator.className).toContain("block"); // Ensure default styles are still included
  });

  it("should have correct dimensions", () => {
    render(<Separator />);

    const separator = screen.getByRole("separator");

    expect(separator.className).toContain("h-[2px]");
    expect(separator.className).toContain("w-full");
  });

  it("should have correct background color", () => {
    render(<Separator />);

    const separator = screen.getByRole("separator");

    expect(separator.className).toContain("bg-foreground");
  });

  it("should be shrinkable", () => {
    render(<Separator />);

    const separator = screen.getByRole("separator");

    expect(separator.className).toContain("shrink-0");
  });

  it("should have correct role as separator", () => {
    render(<Separator />);

    const separator = screen.getByRole("separator");

    expect(separator.tagName).toBe("HR");
  });

  it("should only accept className prop", () => {
    render(<Separator className="test-class" />);

    const separator = screen.getByRole("separator");

    expect(separator.className).toContain("test-class");
  });

  it("should merge custom className with default styles", () => {
    render(<Separator className="my-custom-class" />);

    const separator = screen.getByRole("separator");

    expect(separator.className).toContain("block");
    expect(separator.className).toContain("my-custom-class");
  });

  it("should have correct data-slot attribute", () => {
    render(<Separator />);

    const separator = screen.getByRole("separator");

    expect(separator.getAttribute("data-slot")).toBe("separator");
  });
});

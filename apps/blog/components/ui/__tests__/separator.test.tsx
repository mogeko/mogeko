import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { Separator } from "@/components/ui/separator";

describe("Separator", () => {
  it("should render separator with default styles", async () => {
    await page.render(<Separator />);

    const separator = page.getByRole("separator").query();
    expect(separator).toBeDefined();
    expect(separator?.className).toContain("block");
    expect(separator?.className).toContain("bg-foreground");
    expect(separator?.className).toContain("shrink-0");
    expect(separator?.className).toContain("h-[2px]");
    expect(separator?.className).toContain("w-full");
    expect(separator?.className).toContain("border-none");
  });

  it("should apply custom className", async () => {
    await page.render(<Separator className="custom-separator" />);

    const separator = page.getByRole("separator").query();
    expect(separator?.className).toContain("custom-separator");
    expect(separator?.className).toContain("block"); // Ensure default styles are still included
  });

  it("should have correct dimensions", async () => {
    await page.render(<Separator />);

    const separator = page.getByRole("separator").query();

    expect(separator?.className).toContain("h-[2px]");
    expect(separator?.className).toContain("w-full");
  });

  it("should have correct background color", async () => {
    await page.render(<Separator />);

    const separator = page.getByRole("separator").query();

    expect(separator?.className).toContain("bg-foreground");
  });

  it("should be shrinkable", async () => {
    await page.render(<Separator />);

    const separator = page.getByRole("separator").query();

    expect(separator?.className).toContain("shrink-0");
  });

  it("should have correct role as separator", async () => {
    await page.render(<Separator />);

    const separator = page.getByRole("separator").query();
    expect(separator).toBeDefined();
    expect(separator?.tagName).toBe("HR");
  });

  it("should only accept className prop", async () => {
    await page.render(<Separator className="test-class" />);

    const separator = page.getByRole("separator").query();
    expect(separator).toBeDefined();
    expect(separator?.className).toContain("test-class");
  });

  it("should merge custom className with default styles", async () => {
    await page.render(<Separator className="my-custom-class" />);

    const separator = page.getByRole("separator").query();
    expect(separator?.className).toContain("block");
    expect(separator?.className).toContain("my-custom-class");
  });

  it("should have correct data-slot attribute", async () => {
    await page.render(<Separator />);

    const separator = page.getByRole("separator").query();
    expect(separator?.getAttribute("data-slot")).toBe("separator");
  });
});

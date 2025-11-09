import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";
import { AlertBanner, alertBannerVariants } from "@/components/ui/alert-banner";

describe("alertBannerVariants", () => {
  it("should return default styles for gray_background color", () => {
    const result = alertBannerVariants();
    expect(result).toContain("bg-secondary");
    expect(result).toContain("text-secondary-foreground");
    expect(result).toContain("shadow-muted");
  });

  it("should include base styles", () => {
    const result = alertBannerVariants();
    expect(result).toContain(
      "flex gap-[1ch] py-1 px-[2ch] shadow-[1ch_1ch_0_0]",
    );
  });

  it("should handle custom color variants", () => {
    const result = alertBannerVariants({ color: "gray_background" });
    expect(result).toContain("bg-secondary");
    expect(result).toContain("text-secondary-foreground");
  });
});

describe("AlertBanner", () => {
  it("should render with default icon when no icon provided", async () => {
    await render(<AlertBanner icon={null}>Test message</AlertBanner>);

    const banner = page.getByText("Test message").query();
    expect(banner).toBeDefined();

    const defaultIcon = page.getByText("💡").query();
    expect(defaultIcon).toBeDefined();
  });

  it("should render with custom icon", async () => {
    await render(
      <AlertBanner icon={<span>🚨</span>}>Warning message</AlertBanner>,
    );

    const banner = page.getByText("Warning message");
    expect(banner).toBeDefined();

    const customIcon = page.getByText("🚨");
    expect(customIcon).toBeDefined();
  });

  it("should apply correct CSS classes", async () => {
    const { container } = await render(
      <AlertBanner icon={null} className="custom-class">
        Test message
      </AlertBanner>,
    );

    const banner = container.firstChild as HTMLElement | null;
    expect(banner?.className).toContain("flex");
    expect(banner?.className).toContain("gap-[1ch]");
    expect(banner?.className).toContain("custom-class");
  });

  it("should handle color variants", async () => {
    const { container } = await render(
      <AlertBanner icon={null} color="gray_background">
        Test message
      </AlertBanner>,
    );

    const banner = container.firstChild as HTMLElement | null;
    expect(banner?.className).toContain("bg-secondary");
    expect(banner?.className).toContain("text-secondary-foreground");
  });

  it("should pass through additional HTML attributes", async () => {
    await render(
      <AlertBanner icon={null} aria-label="Important notice">
        Test message
      </AlertBanner>,
    );

    const banner = page.getByRole("alert").query();
    expect(banner).toBeDefined();
    expect(banner?.getAttribute("aria-label")).toBe("Important notice");
  });

  it("should handle click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <AlertBanner icon={null} onClick={handleClick}>
        Clickable banner
      </AlertBanner>,
    );

    const banner = page.getByText("Clickable banner");
    await user.click(banner);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should render children correctly", async () => {
    await render(
      <AlertBanner icon={null}>
        <span>Complex</span>
        <span>children</span>
      </AlertBanner>,
    );

    await expect.element(page.getByText("Complex")).toBeDefined();
    await expect.element(page.getByText("children")).toBeDefined();
  });

  it("should merge custom className with default styles", async () => {
    const { container } = await render(
      <AlertBanner icon={null} className="my-custom-class">
        Test message
      </AlertBanner>,
    );

    const banner = container.firstChild as HTMLElement | null;
    expect(banner?.className).toContain("flex");
    expect(banner?.className).toContain("my-custom-class");
  });

  it("should have correct data-slot attribute", async () => {
    await render(<AlertBanner icon={null}>Test message</AlertBanner>);

    const banner = page.getByRole("alert").query();
    expect(banner?.getAttribute("data-slot")).toBe("alert");
  });
});

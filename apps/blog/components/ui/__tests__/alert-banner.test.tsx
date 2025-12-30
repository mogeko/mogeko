import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
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
  beforeEach(() => {
    cleanup();
    document.body.innerHTML = "";
  });

  it("should render with default icon when no icon provided", () => {
    render(<AlertBanner icon={null}>Test message</AlertBanner>);

    const banner = screen.queryByText("Test message");

    expect(banner).toBeDefined();

    const defaultIcon = screen.queryByText("💡");

    expect(defaultIcon).toBeDefined();
  });

  it("should render with custom icon", () => {
    render(<AlertBanner icon={<span>🚨</span>}>Warning message</AlertBanner>);

    const banner = screen.queryByText("Warning message");

    expect(banner).toBeDefined();

    const customIcon = screen.queryByText("🚨");

    expect(customIcon).toBeDefined();
  });

  it("should apply correct CSS classes", () => {
    const { container } = render(
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
    const { container } = render(
      <AlertBanner icon={null} color="gray_background">
        Test message
      </AlertBanner>,
    );

    const banner = container.firstChild as HTMLElement | null;

    expect(banner?.className).toContain("bg-secondary");
    expect(banner?.className).toContain("text-secondary-foreground");
  });

  it("should pass through additional HTML attributes", () => {
    render(
      <AlertBanner icon={null} aria-label="Important notice">
        Test message
      </AlertBanner>,
    );

    const banner = screen.getByRole("alert");

    expect(banner.getAttribute("aria-label")).toBe("Important notice");
  });

  it("should handle click events", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <AlertBanner icon={null} onClick={handleClick}>
        Clickable banner
      </AlertBanner>,
    );

    const banner = screen.getByText("Clickable banner");

    await user.click(banner);

    expect(handleClick).toBeCalledTimes(1);
  });

  it("should render children correctly", () => {
    render(
      <AlertBanner icon={null}>
        <span>Complex</span>
        <span>children</span>
      </AlertBanner>,
    );

    expect(screen.queryByText("Complex")).toBeDefined();
    expect(screen.queryByText("children")).toBeDefined();
  });

  it("should merge custom className with default styles", async () => {
    const { container } = render(
      <AlertBanner icon={null} className="my-custom-class">
        Test message
      </AlertBanner>,
    );

    const banner = container.firstChild as HTMLElement | null;

    expect(banner?.className).toContain("flex");
    expect(banner?.className).toContain("my-custom-class");
  });

  it("should have correct data-slot attribute", () => {
    render(<AlertBanner icon={null}>Test message</AlertBanner>);

    const banner = screen.getByRole("alert");

    expect(banner.getAttribute("data-slot")).toBe("alert");
  });
});

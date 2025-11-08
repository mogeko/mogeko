import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Details, Summary } from "@/components/ui/accordion";

describe("Summary", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render summary with default props", () => {
    render(<Summary>Test Summary</Summary>);

    const summary = screen.getByText("Test Summary").closest("summary");
    expect(summary).toBeDefined();
    expect(summary?.className).toContain("flex");
    expect(summary?.className).toContain("w-full");
    expect(summary?.className).toContain("outline-none");
    expect(summary?.getAttribute("tabIndex")).toBe("0");
  });

  it("should render summary with custom className", () => {
    render(<Summary className="custom-class">Custom Summary</Summary>);

    const summary = screen.getByText("Custom Summary").closest("summary");
    expect(summary?.className).toContain("custom-class");
  });

  it("should render as child component when asChild is true", () => {
    render(
      <Summary asChild>
        <button type="button">Button Summary</button>
      </Summary>,
    );

    const button = screen.getByRole("button", { name: "Button Summary" });
    expect(button).toBeDefined();
    expect(button.className).toContain("min-w-1/10");
    expect(button.className).toContain("flex-1");
    expect(button.className).toContain("select-none");
  });

  it("should have correct marker styles", () => {
    render(<Summary>Marker Summary</Summary>);

    const summary = screen.getByText("Marker Summary").closest("summary");
    expect(summary?.className).toContain("marker:hidden");
    expect(summary?.className).toContain("before:content-['▸']");
    expect(summary?.className).toContain("group-open:before:content-['▾']");
  });

  it("should have hover and focus styles", () => {
    render(<Summary>Hover Summary</Summary>);

    const summary = screen.getByText("Hover Summary").closest("summary");
    expect(summary?.className).toContain("hover:bg-accent");
    expect(summary?.className).toContain("hover:text-accent-foreground");
    expect(summary?.className).toContain("focus:bg-accent");
    expect(summary?.className).toContain("focus:text-accent-foreground");
  });

  it("should have correct data-slot attribute", () => {
    render(<Summary>Data Slot Summary</Summary>);

    const summary = screen.getByText("Data Slot Summary").closest("summary");
    expect(summary?.getAttribute("data-slot")).toBe("accordion-summary");
  });
});

describe("Details", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render details with default props", () => {
    render(
      <Details>
        <Summary>Details Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = screen.getByText("Details Summary").closest("details");
    expect(details).toBeDefined();
    expect(details?.className).toContain("group");
  });

  it("should render details with custom className", () => {
    render(
      <Details className="custom-details">
        <Summary>Custom Details Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = screen
      .getByText("Custom Details Summary")
      .closest("details");
    expect(details?.className).toContain("custom-details");
  });

  it("should apply color variants correctly", () => {
    render(
      <Details color="blue">
        <Summary>Blue Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = screen.getByText("Blue Summary").closest("details");
    expect(details?.className).toContain("text-blue-700");
  });

  it("should apply background color variants correctly", () => {
    render(
      <Details color="blue_background">
        <Summary>Blue Background Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = screen
      .getByText("Blue Background Summary")
      .closest("details");
    expect(details?.className).toContain("bg-blue-300");
  });

  it("should handle default color variant", () => {
    render(
      <Details color="default">
        <Summary>Default Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = screen.getByText("Default Summary").closest("details");
    expect(details?.className).toContain("group");
    // Should not have specific color classes for default
    expect(details?.className).not.toContain("text-blue-700");
    expect(details?.className).not.toContain("bg-blue-300");
  });

  it("should pass through HTML details attributes", () => {
    render(
      <Details open role="region" aria-label="Accordion section">
        <Summary>Attributes Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = screen.getByRole("region", { name: "Accordion section" });
    expect(details.hasAttribute("open")).toBe(true);
  });

  it("should have correct data-slot attribute", () => {
    render(
      <Details>
        <Summary>Data Slot Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = screen.getByText("Data Slot Summary").closest("details");
    expect(details?.getAttribute("data-slot")).toBe("accordion-details");
  });
});

describe("Accordion Interaction", () => {
  afterEach(() => {
    cleanup();
  });

  it("should toggle open/close state when summary is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Details>
        <Summary>Interaction Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const summary = screen.getByText("Interaction Summary");
    const details = summary.closest("details");

    // Initially closed
    expect(details?.hasAttribute("open")).toBe(false);

    // Click to open
    await user.click(summary);
    expect(details?.hasAttribute("open")).toBe(true);

    // Click to close
    await user.click(summary);
    expect(details?.hasAttribute("open")).toBe(false);
  });

  it("should handle keyboard interaction", async () => {
    const user = userEvent.setup();
    render(
      <Details>
        <Summary>Keyboard Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const summary = screen.getByText("Keyboard Summary").closest("summary");

    // Focus summary
    await user.tab();
    expect(document.activeElement).toBe(summary);

    // Test that summary is focusable and has correct tabIndex
    expect(summary?.getAttribute("tabIndex")).toBe("0");
  });
});

describe("Color Variants Integration", () => {
  afterEach(() => {
    cleanup();
  });

  it("should integrate with color variants system", () => {
    render(
      <Details color="blue">
        <Summary>Color Variant Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = screen
      .getByText("Color Variant Summary")
      .closest("details");
    expect(details?.className).toContain("text-blue-700");
  });

  it("should integrate with background color variants system", () => {
    render(
      <Details color="blue_background">
        <Summary>Background Color Variant Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = screen
      .getByText("Background Color Variant Summary")
      .closest("details");
    expect(details?.className).toContain("bg-blue-300");
  });

  it("should handle default color variant correctly", () => {
    render(
      <Details color="default">
        <Summary>Default Color Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = screen
      .getByText("Default Color Summary")
      .closest("details");
    expect(details?.className).toContain("group");
    // Should not have specific color classes for default
    expect(details?.className).not.toContain("text-blue-700");
    expect(details?.className).not.toContain("bg-blue-300");
  });
});

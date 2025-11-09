import { describe, expect, it } from "vitest";
import { page, userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";
import { Details, Summary } from "@/components/ui/accordion";

describe("Summary", () => {
  it("should render summary with default props", async () => {
    await render(<Summary>Test Summary</Summary>);

    const summary = page.getByText("Test Summary").query()?.closest("summary");
    expect(summary).toBeDefined();
    expect(summary?.className).toContain("flex");
    expect(summary?.className).toContain("w-full");
    expect(summary?.className).toContain("outline-none");
    expect(summary?.getAttribute("tabIndex")).toBe("0");
  });

  it("should render summary with custom className", async () => {
    await render(<Summary className="custom-class">Custom Summary</Summary>);

    const summary = page
      .getByText("Custom Summary")
      .query()
      ?.closest("summary");
    expect(summary?.className).toContain("custom-class");
  });

  it("should render as child component when asChild is true", async () => {
    await render(
      <Summary asChild>
        <button type="button">Button Summary</button>
      </Summary>,
    );

    const button = page.getByRole("button", { name: "Button Summary" }).query();
    expect(button).toBeDefined();
    expect(button?.className).toContain("min-w-1/10");
    expect(button?.className).toContain("flex-1");
    expect(button?.className).toContain("select-none");
  });

  it("should have correct marker styles", async () => {
    await render(<Summary>Marker Summary</Summary>);

    const summary = page
      .getByText("Marker Summary")
      .query()
      ?.closest("summary");
    expect(summary?.className).toContain("marker:hidden");
    expect(summary?.className).toContain("before:content-['▸']");
    expect(summary?.className).toContain("group-open:before:content-['▾']");
  });

  it("should have hover and focus styles", async () => {
    await render(<Summary>Hover Summary</Summary>);

    const summary = page.getByText("Hover Summary").query()?.closest("summary");
    expect(summary?.className).toContain("hover:bg-accent");
    expect(summary?.className).toContain("hover:text-accent-foreground");
    expect(summary?.className).toContain("focus:bg-accent");
    expect(summary?.className).toContain("focus:text-accent-foreground");
  });

  it("should have correct data-slot attribute", async () => {
    await render(<Summary>Data Slot Summary</Summary>);

    const summary = page
      .getByText("Data Slot Summary")
      .query()
      ?.closest("summary");
    expect(summary?.getAttribute("data-slot")).toBe("accordion-summary");
  });
});

describe("Details", () => {
  it("should render details with default props", async () => {
    await render(
      <Details>
        <Summary>Details Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = page
      .getByText("Details Summary")
      .query()
      ?.closest("details");
    expect(details).toBeDefined();
    expect(details?.className).toContain("group");
  });

  it("should render details with custom className", async () => {
    await render(
      <Details className="custom-details">
        <Summary>Custom Details Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = page
      .getByText("Custom Details Summary")
      .query()
      ?.closest("details");
    expect(details?.className).toContain("custom-details");
  });

  it("should apply color variants correctly", async () => {
    await render(
      <Details color="blue">
        <Summary>Blue Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = page.getByText("Blue Summary").query()?.closest("details");
    expect(details?.className).toContain("text-blue-700");
  });

  it("should apply background color variants correctly", async () => {
    await render(
      <Details color="blue_background">
        <Summary>Blue Background Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = page
      .getByText("Blue Background Summary")
      .query()
      ?.closest("details");
    expect(details?.className).toContain("bg-blue-300");
  });

  it("should handle default color variant", async () => {
    await render(
      <Details color="default">
        <Summary>Default Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = page
      .getByText("Default Summary")
      .query()
      ?.closest("details");
    expect(details?.className).toContain("group");
    // Should not have specific color classes for default
    expect(details?.className).not.toContain("text-blue-700");
    expect(details?.className).not.toContain("bg-blue-300");
  });

  it("should pass through HTML details attributes", async () => {
    await render(
      <Details open role="region" aria-label="Accordion section">
        <Summary>Attributes Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = page
      .getByRole("region", { name: "Accordion section" })
      .query();
    expect(details?.hasAttribute("open")).toBe(true);
  });

  it("should have correct data-slot attribute", async () => {
    await render(
      <Details>
        <Summary>Data Slot Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = page
      .getByText("Data Slot Summary")
      .query()
      ?.closest("details");
    expect(details?.getAttribute("data-slot")).toBe("accordion-details");
  });
});

describe("Accordion Interaction", () => {
  it("should toggle open/close state when summary is clicked", async () => {
    const user = userEvent.setup();
    await render(
      <Details>
        <Summary>Interaction Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const summary = page.getByText("Interaction Summary").query();
    const details = summary?.closest("details");

    // Initially closed
    expect(details?.hasAttribute("open")).toBe(false);

    // Click to open
    if (summary) {
      await user.click(summary);
    }
    expect(details?.hasAttribute("open")).toBe(true);

    // Click to close
    if (summary) {
      await user.click(summary);
    }
    expect(details?.hasAttribute("open")).toBe(false);
  });

  it("should handle keyboard interaction", async () => {
    const user = userEvent.setup();
    await render(
      <Details>
        <Summary>Keyboard Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const summary = page
      .getByText("Keyboard Summary")
      .query()
      ?.closest("summary");

    // Focus summary
    await user.tab();
    expect(document.activeElement).toBe(summary);

    // Test that summary is focusable and has correct tabIndex
    expect(summary?.getAttribute("tabIndex")).toBe("0");
  });
});

describe("Color Variants Integration", () => {
  it("should integrate with color variants system", async () => {
    await render(
      <Details color="blue">
        <Summary>Color Variant Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = page
      .getByText("Color Variant Summary")
      .query()
      ?.closest("details");
    expect(details?.className).toContain("text-blue-700");
  });

  it("should integrate with background color variants system", async () => {
    await render(
      <Details color="blue_background">
        <Summary>Background Color Variant Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = page
      .getByText("Background Color Variant Summary")
      .query()
      ?.closest("details");
    expect(details?.className).toContain("bg-blue-300");
  });

  it("should handle default color variant correctly", async () => {
    await render(
      <Details color="default">
        <Summary>Default Color Summary</Summary>
        <div>Test Content</div>
      </Details>,
    );

    const details = page
      .getByText("Default Color Summary")
      .query()
      ?.closest("details");
    expect(details?.className).toContain("group");
    // Should not have specific color classes for default
    expect(details?.className).not.toContain("text-blue-700");
    expect(details?.className).not.toContain("bg-blue-300");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "@/components/ui/checkbox";

describe("Checkbox", () => {
  it("should render checkbox with children", () => {
    render(<Checkbox>Checkbox label</Checkbox>);

    const checkbox = screen.getByText("Checkbox label");
    expect(checkbox).toBeDefined();
    expect(checkbox.textContent).toContain("Checkbox label");
  });

  it("should render unchecked checkbox by default", () => {
    render(<Checkbox>Unchecked</Checkbox>);

    const checkbox = screen.getByText("Unchecked");
    const parentDiv = checkbox.closest("div");
    const checkSpan = parentDiv?.firstChild as HTMLElement;

    expect(checkSpan).toBeDefined();
    expect(checkSpan.textContent).toBe("\u00A0"); // Non-breaking space for unchecked
  });

  it("should render checked checkbox when checked prop is true", () => {
    render(<Checkbox checked>Checked</Checkbox>);

    const checkbox = screen.getByText("Checked");
    const parentDiv = checkbox.closest("div");
    const checkSpan = parentDiv?.firstChild as HTMLElement;

    expect(checkSpan).toBeDefined();
    expect(checkSpan.textContent).toBe("\u2573"); // X mark for checked
  });

  it("should apply default classes", () => {
    render(<Checkbox>Default styles</Checkbox>);

    const checkbox = screen.getByText("Default styles");
    const parentDiv = checkbox.closest("div");

    expect(parentDiv?.className).toContain("inline-flex");
    expect(parentDiv?.className).toContain("items-center");
    expect(parentDiv?.className).toContain("justify-center");
    expect(parentDiv?.className).toContain("cursor-pointer");
    expect(parentDiv?.className).toContain("outline-none");
    expect(parentDiv?.className).toContain("shrink-0");
  });

  it("should apply custom className", () => {
    render(<Checkbox className="custom-checkbox">Custom checkbox</Checkbox>);

    const checkbox = screen.getByText("Custom checkbox");
    const parentDiv = checkbox.closest("div");

    expect(parentDiv?.className).toContain("custom-checkbox");
    expect(parentDiv?.className).toContain("inline-flex"); // Ensure default styles are still included
  });

  it("should pass through additional HTML attributes", () => {
    render(
      <Checkbox role="checkbox" aria-label="Checkbox option" id="checkbox-1">
        Checkbox with attributes
      </Checkbox>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Checkbox option" });
    expect(checkbox).toBeDefined();
    expect(checkbox.getAttribute("aria-label")).toBe("Checkbox option");
    expect(checkbox.getAttribute("id")).toBe("checkbox-1");
  });

  it("should have correct structure with two spans", () => {
    render(<Checkbox>Structure test</Checkbox>);

    const checkbox = screen.getByText("Structure test");
    const parentDiv = checkbox.closest("div");
    const spans = parentDiv?.querySelectorAll("span");

    expect(spans).toHaveLength(2);

    const checkSpan = spans?.[0];
    const labelSpan = spans?.[1];

    expect(checkSpan).toBeDefined();
    expect(labelSpan).toBeDefined();
    expect(labelSpan?.textContent).toBe("Structure test");
  });

  it("should have correct styles for check span", () => {
    render(<Checkbox>Check span styles</Checkbox>);

    const checkbox = screen.getByText("Check span styles");
    const parentDiv = checkbox.closest("div");
    const checkSpan = parentDiv?.firstChild as HTMLElement;

    expect(checkSpan?.className).toContain("inline-flex");
    expect(checkSpan?.className).toContain("w-full");
    expect(checkSpan?.className).toContain("h-full");
    expect(checkSpan?.className).toContain("px-[1ch]");
    expect(checkSpan?.className).toContain("text-foreground");
    expect(checkSpan?.className).toContain("bg-border");
    expect(checkSpan?.className).toContain("items-stretch");
  });

  it("should have correct styles for label span", () => {
    render(<Checkbox>Label span styles</Checkbox>);

    const checkbox = screen.getByText("Label span styles");
    const parentDiv = checkbox.closest("div");
    const labelSpan = parentDiv?.lastChild as HTMLElement;

    expect(labelSpan?.className).toContain("inline-flex");
    expect(labelSpan?.className).toContain("bg-secondary");
    expect(labelSpan?.className).toContain("min-w-1/10");
    expect(labelSpan?.className).toContain("w-full");
    expect(labelSpan?.className).toContain("items-stretch");
  });

  it("should handle click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox onClick={handleClick}>Clickable checkbox</Checkbox>);

    const checkbox = screen.getByText("Clickable checkbox");
    const parentDiv = checkbox.closest("div");

    if (parentDiv) {
      await user.click(parentDiv);
    }

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should be focusable and have cursor pointer", () => {
    render(<Checkbox>Focusable checkbox</Checkbox>);

    const checkbox = screen.getByText("Focusable checkbox");
    const parentDiv = checkbox.closest("div");

    expect(parentDiv?.className).toContain("cursor-pointer");
    expect(parentDiv?.className).toContain("outline-none");
  });

  it("should render complex children correctly", () => {
    render(
      <Checkbox>
        <span>Complex</span>
        <span>label</span>
      </Checkbox>,
    );

    expect(screen.getByText("Complex")).toBeDefined();
    expect(screen.getByText("label")).toBeDefined();
  });

  it("should toggle between checked and unchecked states", () => {
    const { rerender } = render(
      <Checkbox checked={false}>Toggle test</Checkbox>,
    );

    let checkbox = screen.getByText("Toggle test");
    let parentDiv = checkbox.closest("div");
    let checkSpan = parentDiv?.firstChild as HTMLElement;

    expect(checkSpan.textContent).toBe("\u00A0"); // Unchecked

    rerender(<Checkbox checked>Toggle test</Checkbox>);

    checkbox = screen.getByText("Toggle test");
    parentDiv = checkbox.closest("div");
    checkSpan = parentDiv?.firstChild as HTMLElement;

    expect(checkSpan.textContent).toBe("\u2573"); // Checked
  });

  it("should have correct data-slot attribute", () => {
    render(<Checkbox>Test Checkbox</Checkbox>);

    const checkbox = screen.getByText("Test Checkbox");
    const parentDiv = checkbox.closest("div");
    expect(parentDiv?.getAttribute("data-slot")).toBe("checkbox");
  });
});

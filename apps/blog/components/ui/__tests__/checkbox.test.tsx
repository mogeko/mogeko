import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { Checkbox } from "@/components/ui/checkbox";

describe("Checkbox", () => {
  it("should render checkbox with children", async () => {
    await page.render(<Checkbox>Checkbox label</Checkbox>);

    const checkbox = page.getByText("Checkbox label").query();
    expect(checkbox).toBeDefined();
    expect(checkbox?.textContent).toContain("Checkbox label");
  });

  it("should render unchecked checkbox by default", async () => {
    await page.render(<Checkbox>Unchecked</Checkbox>);

    const checkbox = page.getByText("Unchecked").query();
    const parentDiv = checkbox?.closest("div");
    const checkSpan = parentDiv?.firstChild as HTMLElement;

    expect(checkSpan).toBeDefined();
    expect(checkSpan?.textContent).toBe("\u00A0"); // Non-breaking space for unchecked
  });

  it("should render checked checkbox when checked prop is true", async () => {
    await page.render(<Checkbox checked>Checked</Checkbox>);

    const checkbox = page.getByText("Checked").query();
    const parentDiv = checkbox?.closest("div");
    const checkSpan = parentDiv?.firstChild as HTMLElement;

    expect(checkSpan).toBeDefined();
    expect(checkSpan?.textContent).toBe("\u2573"); // X mark for checked
  });

  it("should apply default classes", async () => {
    await page.render(<Checkbox>Default styles</Checkbox>);

    const checkbox = page.getByText("Default styles").query();
    const parentDiv = checkbox?.closest("div");

    expect(parentDiv?.className).toContain("inline-flex");
    expect(parentDiv?.className).toContain("items-center");
    expect(parentDiv?.className).toContain("justify-center");
    expect(parentDiv?.className).toContain("cursor-pointer");
    expect(parentDiv?.className).toContain("outline-none");
    expect(parentDiv?.className).toContain("shrink-0");
  });

  it("should apply custom className", async () => {
    await page.render(
      <Checkbox className="custom-checkbox">Custom checkbox</Checkbox>,
    );

    const checkbox = page.getByText("Custom checkbox").query();
    const parentDiv = checkbox?.closest("div");

    expect(parentDiv?.className).toContain("custom-checkbox");
    expect(parentDiv?.className).toContain("inline-flex"); // Ensure default styles are still included
  });

  it("should pass through additional HTML attributes", async () => {
    await page.render(
      <Checkbox role="checkbox" aria-label="Checkbox option" id="checkbox-1">
        Checkbox with attributes
      </Checkbox>,
    );

    const checkbox = page
      .getByRole("checkbox", { name: "Checkbox option" })
      .query();
    expect(checkbox).toBeDefined();
    expect(checkbox?.getAttribute("aria-label")).toBe("Checkbox option");
    expect(checkbox?.getAttribute("id")).toBe("checkbox-1");
  });

  it("should have correct structure with two spans", async () => {
    await page.render(<Checkbox>Structure test</Checkbox>);

    const checkbox = page.getByText("Structure test").query();
    const parentDiv = checkbox?.closest("div");
    const spans = parentDiv?.querySelectorAll("span");

    expect(spans).toHaveLength(2);

    const checkSpan = spans?.[0];
    const labelSpan = spans?.[1];

    expect(checkSpan).toBeDefined();
    expect(labelSpan).toBeDefined();
    expect(labelSpan?.textContent).toBe("Structure test");
  });

  it("should have correct styles for check span", async () => {
    await page.render(<Checkbox>Check span styles</Checkbox>);

    const checkbox = page.getByText("Check span styles").query();
    const parentDiv = checkbox?.closest("div");
    const checkSpan = parentDiv?.firstChild as HTMLElement;

    expect(checkSpan?.className).toContain("inline-flex");
    expect(checkSpan?.className).toContain("w-full");
    expect(checkSpan?.className).toContain("h-full");
    expect(checkSpan?.className).toContain("px-[1ch]");
    expect(checkSpan?.className).toContain("text-foreground");
    expect(checkSpan?.className).toContain("bg-border");
    expect(checkSpan?.className).toContain("items-stretch");
  });

  it("should have correct styles for label span", async () => {
    await page.render(<Checkbox>Label span styles</Checkbox>);

    const checkbox = page.getByText("Label span styles").query();
    const parentDiv = checkbox?.closest("div");
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

    await page.render(
      <Checkbox onClick={handleClick}>Clickable checkbox</Checkbox>,
    );

    const checkbox = page.getByText("Clickable checkbox").query();
    const parentDiv = checkbox?.closest("div");

    if (parentDiv) {
      await user.click(parentDiv);
    }

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should be focusable and have cursor pointer", async () => {
    await page.render(<Checkbox>Focusable checkbox</Checkbox>);

    const checkbox = page.getByText("Focusable checkbox").query();
    const parentDiv = checkbox?.closest("div");

    expect(parentDiv?.className).toContain("cursor-pointer");
    expect(parentDiv?.className).toContain("outline-none");
  });

  it("should render complex children correctly", async () => {
    await page.render(
      <Checkbox>
        <span>Complex</span>
        <span>label</span>
      </Checkbox>,
    );

    await expect.element(page.getByText("Complex")).toBeDefined();
    await expect.element(page.getByText("label")).toBeDefined();
  });

  it("should toggle between checked and unchecked states", async () => {
    const { rerender } = await page.render(
      <Checkbox checked={false}>Toggle test</Checkbox>,
    );

    let checkbox = page.getByText("Toggle test").query();
    let parentDiv = checkbox?.closest("div");
    let checkSpan = parentDiv?.firstChild as HTMLElement;

    expect(checkSpan?.textContent).toBe("\u00A0"); // Unchecked

    await rerender(<Checkbox checked>Toggle test</Checkbox>);

    checkbox = page.getByText("Toggle test").query();
    parentDiv = checkbox?.closest("div");
    checkSpan = parentDiv?.firstChild as HTMLElement;

    expect(checkSpan?.textContent).toBe("\u2573"); // Checked
  });

  it("should have correct data-slot attribute", async () => {
    await page.render(<Checkbox>Test Checkbox</Checkbox>);

    const checkbox = page.getByText("Test Checkbox").query();
    const parentDiv = checkbox?.closest("div");
    expect(parentDiv?.getAttribute("data-slot")).toBe("checkbox");
  });
});

import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { ActionButton } from "@/components/ui/action-button";

describe("ActionButton", () => {
  it("should render button with children", async () => {
    await page.render(<ActionButton>Click me</ActionButton>);

    const button = page.getByRole("button", { name: "Click me" }).query();
    expect(button).toBeDefined();
    expect(button?.textContent).toContain("Click me");
  });

  it("should render hotkey when provided", async () => {
    await page.render(<ActionButton hotkey="⌘K">Open</ActionButton>);

    const button = page.getByRole("button").query();
    const kbd = page.getByText("⌘K").query();

    expect(kbd).toBeDefined();
    expect(kbd?.tagName).toBe("KBD");
    expect(button?.contains(kbd)).toBe(true);
  });

  it("should not render hotkey when not provided", async () => {
    await page.render(<ActionButton>Open</ActionButton>);

    const button = page.getByRole("button").query();
    const kbdElements = page.getByText("⌘K").all();

    expect(kbdElements).toHaveLength(0);
    expect(button?.textContent).not.toContain("⌘K");
  });

  it("should apply open styles when open prop is true", async () => {
    await page.render(<ActionButton open>Menu</ActionButton>);

    const button = page.getByRole("button").query();
    const span = button?.querySelector("span");

    expect(span?.className).toContain("bg-accent");
  });

  it("should not apply open styles when open prop is false", async () => {
    await page.render(<ActionButton open={false}>Menu</ActionButton>);

    const button = page.getByRole("button").query();
    const span = button?.querySelector("span");

    expect(span?.className).not.toContain("bg-accent");
  });

  it("should handle click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    await page.render(
      <ActionButton onClick={handleClick}>Click me</ActionButton>,
    );

    const button = page.getByRole("button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should be disabled when disabled prop is true", async () => {
    await page.render(<ActionButton disabled>Disabled Button</ActionButton>);

    const button = page.getByRole("button").query() as HTMLButtonElement | null;
    expect(button?.disabled).toBe(true);
  });

  it("should apply custom className", async () => {
    await page.render(
      <ActionButton className="custom-class">Button</ActionButton>,
    );

    const button = page.getByRole("button").query();
    expect(button?.className).toContain("custom-class");
  });

  it("should forward all button attributes", async () => {
    await page.render(
      <ActionButton type="submit" aria-label="Submit form">
        Submit
      </ActionButton>,
    );

    const button = page.getByRole("button", { name: "Submit form" }).query();
    expect(button?.getAttribute("type")).toBe("submit");
    expect(button?.getAttribute("aria-label")).toBe("Submit form");
  });

  it("should render both hotkey and children correctly", async () => {
    await page.render(<ActionButton hotkey="⌘S">Save</ActionButton>);

    const button = page.getByRole("button").query();
    expect(button?.textContent).toContain("⌘S");
    expect(button?.textContent).toContain("Save");

    const kbd = page.getByText("⌘S").query();
    const span = button?.querySelector("span");

    expect(kbd).toBeDefined();
    expect(span?.textContent).toBe("Save");
  });

  it("should have correct hover and focus styles for hotkey", async () => {
    await page.render(<ActionButton hotkey="⌘K">Open</ActionButton>);

    const button = page.getByRole("button").query();

    expect(button?.className).toContain("hover:[&>kbd]:bg-accent");
    expect(button?.className).toContain("hover:[&>kbd]:text-accent-foreground");
    expect(button?.className).toContain("focus:[&>kbd]:bg-accent");
    expect(button?.className).toContain("focus:[&>kbd]:text-accent-foreground");
  });

  it("should have correct data-slot attribute", async () => {
    await page.render(<ActionButton>Test Button</ActionButton>);

    const button = page.getByRole("button").query();
    expect(button?.getAttribute("data-slot")).toBe("button");
  });
});

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ActionButton } from "@/components/ui/action-button";

describe("ActionButton", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render button with children", () => {
    render(<ActionButton>Click me</ActionButton>);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeDefined();
    expect(button.textContent).toContain("Click me");
  });

  it("should render hotkey when provided", () => {
    render(<ActionButton hotkey="⌘K">Open</ActionButton>);

    const button = screen.getByRole("button");
    const kbd = screen.getByText("⌘K");

    expect(kbd).toBeDefined();
    expect(kbd.tagName).toBe("KBD");
    expect(button.contains(kbd)).toBe(true);
  });

  it("should not render hotkey when not provided", () => {
    render(<ActionButton>Open</ActionButton>);

    const button = screen.getByRole("button");
    const kbdElements = screen.queryAllByText("⌘K");

    expect(kbdElements).toHaveLength(0);
    expect(button.textContent).not.toContain("⌘K");
  });

  it("should apply open styles when open prop is true", () => {
    render(<ActionButton open>Menu</ActionButton>);

    const button = screen.getByRole("button");
    const span = button.querySelector("span");

    expect(span?.className).toContain("bg-accent");
  });

  it("should not apply open styles when open prop is false", () => {
    render(<ActionButton open={false}>Menu</ActionButton>);

    const button = screen.getByRole("button");
    const span = button.querySelector("span");

    expect(span?.className).not.toContain("bg-accent");
  });

  it("should handle click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<ActionButton onClick={handleClick}>Click me</ActionButton>);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should be disabled when disabled prop is true", () => {
    render(<ActionButton disabled>Disabled Button</ActionButton>);

    const button = screen.getByRole("button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it("should apply custom className", () => {
    render(<ActionButton className="custom-class">Button</ActionButton>);

    const button = screen.getByRole("button");
    expect(button.className).toContain("custom-class");
  });

  it("should forward all button attributes", () => {
    render(
      <ActionButton type="submit" aria-label="Submit form">
        Submit
      </ActionButton>,
    );

    const button = screen.getByRole("button", { name: "Submit form" });
    expect(button.getAttribute("type")).toBe("submit");
    expect(button.getAttribute("aria-label")).toBe("Submit form");
  });

  it("should render both hotkey and children correctly", () => {
    render(<ActionButton hotkey="⌘S">Save</ActionButton>);

    const button = screen.getByRole("button");
    expect(button.textContent).toContain("⌘S");
    expect(button.textContent).toContain("Save");

    const kbd = screen.getByText("⌘S");
    const span = button.querySelector("span");

    expect(kbd).toBeDefined();
    expect(span?.textContent).toBe("Save");
  });

  it("should have correct hover and focus styles for hotkey", () => {
    render(<ActionButton hotkey="⌘K">Open</ActionButton>);

    const button = screen.getByRole("button");

    expect(button.className).toContain("hover:[&>kbd]:bg-accent");
    expect(button.className).toContain("hover:[&>kbd]:text-accent-foreground");
    expect(button.className).toContain("focus:[&>kbd]:bg-accent");
    expect(button.className).toContain("focus:[&>kbd]:text-accent-foreground");
  });
});

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ListItem } from "@/components/ui/list";

describe("ListItem", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render list item with children", () => {
    render(<ListItem>List item content</ListItem>);

    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeDefined();
    expect(listItem.textContent).toBe("List item content");
  });

  it("should apply default classes", () => {
    render(<ListItem>Default styles</ListItem>);

    const listItem = screen.getByRole("listitem");
    expect(listItem.className).toContain("outline-none");
    expect(listItem.className).toContain("focus:bg-accent");
    expect(listItem.className).toContain("focus:text-accent-foreground");
  });

  it("should apply custom className", () => {
    render(<ListItem className="custom-list-item">Custom list item</ListItem>);

    const listItem = screen.getByRole("listitem");
    expect(listItem.className).toContain("custom-list-item");
    expect(listItem.className).toContain("outline-none"); // Ensure default styles are still included
  });

  it("should pass through additional HTML attributes", () => {
    render(
      <ListItem
        data-testid="test-list-item"
        aria-label="List item"
        id="list-item-1"
      >
        List item with attributes
      </ListItem>,
    );

    const listItem = screen.getByTestId("test-list-item");
    expect(listItem).toBeDefined();
    expect(listItem.getAttribute("aria-label")).toBe("List item");
    expect(listItem.getAttribute("id")).toBe("list-item-1");
  });

  it("should handle color variants", () => {
    render(<ListItem color="blue">Blue list item</ListItem>);

    const listItem = screen.getByRole("listitem");
    // The color variants are applied through the colorVariants function
    // We can check that the className contains the expected base classes
    expect(listItem.className).toContain("outline-none");
    expect(listItem.className).toContain("focus:bg-accent");
    expect(listItem.className).toContain("focus:text-accent-foreground");
  });

  it("should have correct role as listitem", () => {
    render(<ListItem>Role test</ListItem>);

    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeDefined();
    expect(listItem.getAttribute("role")).toBe("listitem");
  });

  it("should be focusable and have focus styles", () => {
    render(<ListItem>Focusable list item</ListItem>);

    const listItem = screen.getByRole("listitem");

    // Check that the list item has focus styles
    expect(listItem.className).toContain("focus:bg-accent");
    expect(listItem.className).toContain("focus:text-accent-foreground");
  });

  it("should have outline-none for accessibility", () => {
    render(<ListItem>Accessible list item</ListItem>);

    const listItem = screen.getByRole("listitem");
    expect(listItem.className).toContain("outline-none");
  });

  it("should render complex children correctly", () => {
    render(
      <ListItem>
        <span>Complex</span>
        <span>list</span>
        <span>item</span>
      </ListItem>,
    );

    expect(screen.getByText("Complex")).toBeDefined();
    expect(screen.getByText("list")).toBeDefined();
    expect(screen.getByText("item")).toBeDefined();
  });

  it("should handle click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<ListItem onClick={handleClick}>Clickable list item</ListItem>);

    const listItem = screen.getByRole("listitem");
    await user.click(listItem);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should be a div element with listitem role", () => {
    render(<ListItem>Element test</ListItem>);

    const listItem = screen.getByRole("listitem");
    expect(listItem.tagName).toBe("DIV");
    expect(listItem.getAttribute("role")).toBe("listitem");
  });

  it("should merge color variants with custom className", () => {
    render(
      <ListItem className="custom-class" color="blue">
        Combined styles
      </ListItem>,
    );

    const listItem = screen.getByRole("listitem");
    expect(listItem.className).toContain("custom-class");
    expect(listItem.className).toContain("outline-none");
  });
});

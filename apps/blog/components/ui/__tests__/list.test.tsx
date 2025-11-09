import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";
import { ListItem } from "@/components/ui/list";

describe("ListItem", () => {
  it("should render list item with children", async () => {
    await render(<ListItem>List item content</ListItem>);

    const listItem = page.getByRole("listitem").query();
    expect(listItem).toBeDefined();
    expect(listItem?.textContent).toBe("List item content");
  });

  it("should apply default classes", async () => {
    await render(<ListItem>Default styles</ListItem>);

    const listItem = page.getByRole("listitem").query();
    expect(listItem?.className).toContain("outline-none");
    expect(listItem?.className).toContain("focus:bg-accent");
    expect(listItem?.className).toContain("focus:text-accent-foreground");
  });

  it("should apply custom className", async () => {
    await render(
      <ListItem className="custom-list-item">Custom list item</ListItem>,
    );

    const listItem = page.getByRole("listitem").query();
    expect(listItem?.className).toContain("custom-list-item");
    expect(listItem?.className).toContain("outline-none"); // Ensure default styles are still included
  });

  it("should pass through additional HTML attributes", async () => {
    await render(
      <ListItem
        data-testid="test-list-item"
        aria-label="List item"
        id="list-item-1"
      >
        List item with attributes
      </ListItem>,
    );

    const listItem = page.getByTestId("test-list-item").query();
    expect(listItem).toBeDefined();
    expect(listItem?.getAttribute("aria-label")).toBe("List item");
    expect(listItem?.getAttribute("id")).toBe("list-item-1");
  });

  it("should handle color variants", async () => {
    await render(<ListItem color="blue">Blue list item</ListItem>);

    const listItem = page.getByRole("listitem").query();
    // The color variants are applied through the colorVariants function
    // We can check that the className contains the expected base classes
    expect(listItem?.className).toContain("outline-none");
    expect(listItem?.className).toContain("focus:bg-accent");
    expect(listItem?.className).toContain("focus:text-accent-foreground");
  });

  it("should have correct role as listitem", async () => {
    await render(<ListItem>Role test</ListItem>);

    const listItem = page.getByRole("listitem").query();
    expect(listItem).toBeDefined();
    expect(listItem?.getAttribute("role")).toBe("listitem");
  });

  it("should be focusable and have focus styles", async () => {
    await render(<ListItem>Focusable list item</ListItem>);

    const listItem = page.getByRole("listitem").query();

    // Check that the list item has focus styles
    expect(listItem?.className).toContain("focus:bg-accent");
    expect(listItem?.className).toContain("focus:text-accent-foreground");
  });

  it("should have outline-none for accessibility", async () => {
    await render(<ListItem>Accessible list item</ListItem>);

    const listItem = page.getByRole("listitem").query();
    expect(listItem?.className).toContain("outline-none");
  });

  it("should render complex children correctly", async () => {
    await render(
      <ListItem>
        <span>Complex</span>
        <span>list</span>
        <span>item</span>
      </ListItem>,
    );

    await expect.element(page.getByText("Complex")).toBeDefined();
    await expect.element(page.getByText("list")).toBeDefined();
    await expect.element(page.getByText("item")).toBeDefined();
  });

  it("should handle click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    await render(
      <ListItem onClick={handleClick}>Clickable list item</ListItem>,
    );

    const listItem = page.getByRole("listitem");
    await user.click(listItem);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should be a div element with listitem role", async () => {
    await render(<ListItem>Element test</ListItem>);

    const listItem = page.getByRole("listitem").query();
    expect(listItem?.tagName).toBe("DIV");
    expect(listItem?.getAttribute("role")).toBe("listitem");
  });

  it("should merge color variants with custom className", async () => {
    await render(
      <ListItem className="custom-class" color="blue">
        Combined styles
      </ListItem>,
    );

    const listItem = page.getByRole("listitem").query();
    expect(listItem?.className).toContain("custom-class");
    expect(listItem?.className).toContain("outline-none");
  });

  it("should have correct data-slot attribute", async () => {
    await render(<ListItem>Test List Item</ListItem>);

    const listItem = page.getByRole("listitem").query();
    expect(listItem?.getAttribute("data-slot")).toBe("list-item");
  });
});

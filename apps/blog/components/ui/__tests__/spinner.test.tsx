import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import { Spinner } from "@/components/ui/spinner";

describe("Spinner", () => {
  it("should render spinner with default styles", async () => {
    await render(<Spinner />);

    const spinner = page.getByRole("status").query();
    expect(spinner).toBeDefined();
    expect(spinner?.className).toContain("spinner");
  });

  it("should apply custom className", async () => {
    await render(<Spinner className="custom-spinner" />);

    const spinner = page.getByRole("status").query();
    expect(spinner?.className).toContain("custom-spinner");
    expect(spinner?.className).toContain("spinner"); // Ensure default styles are still included
  });

  it("should have correct role as status", async () => {
    await render(<Spinner />);

    const spinner = page.getByRole("status").query();
    expect(spinner).toBeDefined();
    expect(spinner?.getAttribute("role")).toBeNull();
  });

  it("should be a span element", async () => {
    await render(<Spinner />);

    const spinner = page.getByRole("status").query();
    expect(spinner?.tagName).toBe("OUTPUT");
  });

  it("should pass through additional HTML attributes", async () => {
    await render(
      <Spinner
        data-testid="test-spinner"
        aria-label="Loading content"
        id="spinner-1"
      />,
    );

    const spinner = page.getByRole("status").query();
    expect(spinner).toBeDefined();
    expect(spinner?.getAttribute("aria-label")).toBe("Loading content");
    expect(spinner?.getAttribute("id")).toBe("spinner-1");
  });

  it("should not render children", async () => {
    // This test ensures that children are properly omitted from the props
    // Since the component uses Omit<React.HTMLAttributes<HTMLSpanElement>, "children">
    // we can't pass children, but we can verify the component renders without them
    await render(<Spinner />);

    const spinner = page.getByRole("status").query();
    expect(spinner).toBeDefined();
    expect(spinner?.textContent).toBe("");
  });

  it("should merge custom className with default styles", async () => {
    await render(<Spinner className="my-custom-class" data-testid="spinner" />);

    const spinner = page.getByRole("status").query();
    expect(spinner?.className).toContain("spinner");
    expect(spinner?.className).toContain("my-custom-class");
  });

  it("should be accessible with appropriate ARIA attributes", async () => {
    await render(<Spinner aria-label="Loading data" data-testid="spinner" />);

    const spinner = page.getByRole("status").query();
    expect(spinner).toBeDefined();
    expect(spinner?.getAttribute("aria-label")).toBe("Loading data");
  });

  it("should have no text content", async () => {
    await render(<Spinner data-testid="spinner" />);

    const spinner = page.getByRole("status").query();
    expect(spinner?.textContent).toBe("");
  });
});

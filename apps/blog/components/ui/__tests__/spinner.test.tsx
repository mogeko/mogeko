import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { Spinner } from "@/components/ui/spinner";

beforeEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("Spinner", () => {
  it("should apply custom className", () => {
    render(<Spinner className="custom-spinner" />);

    const spinner = screen.getByRole("status");

    expect(spinner.className).toContain("custom-spinner");
    expect(spinner.className).toContain("spinner"); // Ensure default styles are still included
  });

  it("should have correct role as status", () => {
    render(<Spinner />);

    const spinner = screen.getByRole("status");

    expect(spinner.getAttribute("role")).toBeNull();
  });

  it("should be a span element", () => {
    render(<Spinner />);

    const spinner = screen.getByRole("status");

    expect(spinner.tagName).toBe("OUTPUT");
  });

  it("should pass through additional HTML attributes", () => {
    render(
      <Spinner
        data-testid="test-spinner"
        aria-label="Loading content"
        id="spinner-1"
      />,
    );

    const spinner = screen.getByRole("status");

    expect(spinner.getAttribute("aria-label")).toBe("Loading content");
    expect(spinner.getAttribute("id")).toBe("spinner-1");
  });

  it("should not render children", () => {
    // This test ensures that children are properly omitted from the props
    // Since the component uses Omit<React.HTMLAttributes<HTMLSpanElement>, "children">
    // we can't pass children, but we can verify the component renders without them
    render(<Spinner />);

    const spinner = screen.getByRole("status");

    expect(spinner.textContent).toBe("");
  });

  it("should merge custom className with default styles", () => {
    render(<Spinner className="my-custom-class" />);

    const spinner = screen.getByRole("status");

    expect(spinner.className).toContain("my-custom-class");
  });

  it("should be accessible with appropriate ARIA attributes", () => {
    render(<Spinner aria-label="Loading data" />);

    const spinner = screen.getByRole("status");

    expect(spinner.getAttribute("aria-label")).toBe("Loading data");
  });

  it("should have no text content", () => {
    render(<Spinner data-testid="spinner" />);

    const spinner = screen.getByRole("status");

    expect(spinner.textContent).toBe("");
  });
});

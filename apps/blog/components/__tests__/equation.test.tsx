import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const renderToString = vi.fn();

vi.mock("katex", () => ({ renderToString }));

const { Equation } = await import("@/components/equation");

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("Equation", () => {
  it("should page.render inline equation as span", () => {
    renderToString.mockReturnValue("x^2 + y^2 = z^2");

    const { container } = render(
      <Equation expression="x^2 + y^2 = z^2" inline />,
    );

    const spanElement = container.querySelector("span");

    expect(spanElement).toBeDefined();
    expect(spanElement?.innerHTML).toContain("x^2 + y^2 = z^2");
    expect(renderToString).toBeCalledTimes(1);
  });

  it("should page.render block equation as paragraph", () => {
    renderToString.mockReturnValue("\\sum_{i=1}^n i");

    const { container } = render(
      <Equation expression="\\sum_{i=1}^n i = \\frac{n(n+1)}{2}" />,
    );

    const paragraphElement = container.querySelector("p");

    expect(paragraphElement).toBeDefined();
    expect(paragraphElement?.innerHTML).toContain("\\sum_{i=1}^n i");
    expect(renderToString).toBeCalledTimes(1);
  });

  it("should apply custom className", () => {
    const { container } = render(
      <Equation expression="E = mc^2" className="custom-class" />,
    );

    const paragraphElement = container.querySelector("p");

    expect(paragraphElement).toBeDefined();
    expect(paragraphElement?.className).toContain("custom-class");
  });

  it("should pass additional HTML attributes", () => {
    const { container } = render(
      <Equation expression="a^2 + b^2 = c^2" title="Pythagorean theorem" />,
    );

    const paragraphElement = container.querySelector("p");

    expect(paragraphElement).toBeDefined();
    expect(paragraphElement?.getAttribute("title")).toBe("Pythagorean theorem");
  });
});

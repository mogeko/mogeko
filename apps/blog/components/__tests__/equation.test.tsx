import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Equation } from "@/components/equation";

afterEach(() => {
  vi.resetAllMocks();
  cleanup();
  document.body.innerHTML = "";
});

vi.mock("katex", () => {
  return {
    renderToString: vi.fn(),
  };
});

const { renderToString } = await import("katex");

describe("Equation", () => {
  it("should page.render inline equation as span", () => {
    vi.mocked(renderToString).mockReturnValue("x^2 + y^2 = z^2");

    const { container } = render(
      <Equation expression="x^2 + y^2 = z^2" inline />,
    );

    const spanElement = container.querySelector("span");

    expect(spanElement).toBeDefined();
    expect(spanElement?.innerHTML).toContain("x^2 + y^2 = z^2");
    expect(renderToString).toBeCalledTimes(1);
  });

  it("should page.render block equation as paragraph", () => {
    vi.mocked(renderToString).mockReturnValue("\\sum_{i=1}^n i");

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

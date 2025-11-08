import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Equation } from "@/components/equation";

describe("Equation", () => {
  it("should render inline equation as span", () => {
    const { container } = render(
      <Equation expression="x^2 + y^2 = z^2" inline />,
    );
    const spanElement = container.querySelector("span");
    expect(spanElement).toBeTruthy();
    expect(spanElement?.innerHTML).toContain("x^2 + y^2 = z^2");
  });

  it("should render block equation as paragraph", () => {
    const { container } = render(
      <Equation expression="\\sum_{i=1}^n i = \\frac{n(n+1)}{2}" />,
    );
    const paragraphElement = container.querySelector("p");
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement?.innerHTML).toContain("\\sum_{i=1}^n i");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <Equation expression="E = mc^2" className="custom-class" />,
    );
    const paragraphElement = container.querySelector("p");
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement?.className).toContain("custom-class");
  });

  it("should pass additional HTML attributes", () => {
    const { container } = render(
      <Equation expression="a^2 + b^2 = c^2" title="Pythagorean theorem" />,
    );
    const paragraphElement = container.querySelector("p");
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement?.getAttribute("title")).toBe("Pythagorean theorem");
  });
});

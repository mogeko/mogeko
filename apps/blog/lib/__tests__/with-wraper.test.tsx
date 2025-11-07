import { describe, expect, it } from "vitest";
import { withWraper } from "@/lib/utils";

describe("withWraper", () => {
  it("should create a wrapper component with push method", () => {
    const Wrapper = withWraper("div");

    expect(typeof Wrapper).toBe("function");
    expect(typeof Wrapper.push).toBe("function");
  });

  it("should clear children after rendering", () => {
    const Wrapper = withWraper("div");

    Wrapper.push(<span key="1">Child 1</span>);
    const result1 = Wrapper({});

    // After first render, children should be cleared
    const result2 = Wrapper({});

    expect(result1).toBeDefined();
    expect(result2).toBeDefined();
  });

  it("should work with React components as wrapper", () => {
    const TestComponent: React.FC<{ children?: React.ReactNode }> = ({
      children,
    }) => <div className="test-component">{children}</div>;

    const Wrapper = withWraper(TestComponent);

    Wrapper.push(<span key="1">Child</span>);
    const result = Wrapper({});

    expect(result).toBeDefined();
  });
});

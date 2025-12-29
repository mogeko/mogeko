import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RowSeparator } from "@/components/table-box";

afterEach(() => {
  vi.resetAllMocks();
  cleanup();
  document.body.innerHTML = "";
});

vi.mock("server-only", () => ({}));
vi.mock("katex", () => {
  return {
    renderToString: vi.fn(),
  };
});

const TableWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <table>
      <tbody>{children}</tbody>
    </table>
  );
};

describe("RowSeparator", () => {
  it("should render separator with default colSpan when not provided", () => {
    const { container } = render(<RowSeparator />, {
      wrapper: TableWrapper,
    });

    const separator = container.querySelector('[data-slot="table-cell"]');

    expect(separator).toBeDefined();
    expect(separator?.getAttribute("colSpan")).toBeNull();
  });

  it("should render separator with specified colSpan", () => {
    const { container } = render(<RowSeparator colSpan={5} />, {
      wrapper: TableWrapper,
    });

    const separator = container.querySelector('[data-slot="table-cell"]');

    expect(separator).toBeDefined();
    expect(separator?.getAttribute("colSpan")).toBe("5");
  });

  it("should have correct styling classes", () => {
    const { container } = render(<RowSeparator />, {
      wrapper: TableWrapper,
    });

    const separator = container.querySelector('[data-slot="table-cell"]');

    expect(separator).toBeDefined();
    expect(separator?.className).toContain("h-1");
    expect(separator?.className).toContain("w-full");

    const span = container.querySelector("span");

    expect(span).toBeDefined();
    expect(span?.className).toContain("bg-foreground");
    expect(span?.className).toContain("h-[2px]");
    expect(span?.className).toContain("w-full");
  });
});

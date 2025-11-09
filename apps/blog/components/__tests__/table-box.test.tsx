import type { GetBlockResponse } from "@notionhq/client";
import { describe, expect, it, vi } from "vitest";
import { page } from "vitest/browser";
import { RowSeparator } from "@/components/table-box";

// Mock the notion module to avoid server-only imports
vi.mock("@/lib/notion", () => ({
  isFullBlock: vi.fn((block: any): block is GetBlockResponse => {
    return block && block.type === "table_row";
  }),
  queryBlocks: vi.fn((_args: { block_id: string }) => {
    return { results: [] };
  }),
}));

const TableWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <table>
      <tbody>{children}</tbody>
    </table>
  );
};

describe("RowSeparator", () => {
  it("should render separator with default colSpan when not provided", async () => {
    const { container } = await page.render(<RowSeparator />, {
      wrapper: TableWrapper,
    });

    const separator = container.querySelector('[data-slot="table-cell"]');
    expect(separator).toBeTruthy();
    expect(separator?.getAttribute("colSpan")).toBeNull();
  });

  it("should render separator with specified colSpan", async () => {
    const { container } = await page.render(<RowSeparator colSpan={5} />, {
      wrapper: TableWrapper,
    });

    const separator = container.querySelector('[data-slot="table-cell"]');
    expect(separator).toBeTruthy();
    expect(separator?.getAttribute("colSpan")).toBe("5");
  });

  it("should have correct styling classes", async () => {
    const { container } = await page.render(<RowSeparator />, {
      wrapper: TableWrapper,
    });

    const separator = container.querySelector('[data-slot="table-cell"]');
    expect(separator?.className).toContain("h-1");
    expect(separator?.className).toContain("w-full");

    const span = container.querySelector("span");
    expect(span?.className).toContain("bg-foreground");
    expect(span?.className).toContain("h-[2px]");
    expect(span?.className).toContain("w-full");
  });
});

// Note: TableBox component is an async server component and requires more complex mocking
// that may not be suitable for simple unit tests. The component should be tested in integration tests
// or with proper server component testing setup.

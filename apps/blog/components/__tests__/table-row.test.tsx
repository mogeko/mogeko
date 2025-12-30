import type { GetBlockResponse } from "@notionhq/client";
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("katex", () => ({ renderToString: vi.fn() }));

const { TRow } = await import("@/components/table-row");

const TableWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <table>
      <tbody>{children}</tbody>
    </table>
  );
};

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("TRow", () => {
  it("should render table row with cells when block is valid table_row", () => {
    const mockBlock: GetBlockResponse = {
      object: "block",
      id: "test-id",
      type: "table_row",
      table_row: {
        cells: [
          [
            {
              type: "text",
              text: { content: "Header", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "Header",
              href: null,
            },
          ],
          [
            {
              type: "text",
              text: { content: "Cell 1", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "Cell 1",
              href: null,
            },
          ],
          [
            {
              type: "text",
              text: { content: "Cell 2", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "Cell 2",
              href: null,
            },
          ],
        ],
      },
    };

    const { container } = render(<TRow block={mockBlock} />, {
      wrapper: TableWrapper,
    });

    const tableRow = container.querySelector("tr");

    expect(tableRow).toBeDefined();

    const cells = container.querySelectorAll("td");

    expect(cells).toHaveLength(3);
    expect(cells[0]?.textContent).toBe("Header");
    expect(cells[1]?.textContent).toBe("Cell 1");
    expect(cells[2]?.textContent).toBe("Cell 2");
  });

  it("should render first cell as TableHead when hx is true", () => {
    const mockBlock: GetBlockResponse = {
      object: "block",
      id: "test-id",
      type: "table_row",
      table_row: {
        cells: [
          [
            {
              type: "text",
              text: { content: "Header", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "Header",
              href: null,
            },
          ],
          [
            {
              type: "text",
              text: { content: "Cell", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "Cell",
              href: null,
            },
          ],
        ],
      },
    };

    const { container } = render(<TRow block={mockBlock} hx={true} />, {
      wrapper: TableWrapper,
    });

    const headerCell = container.querySelector("th");

    expect(headerCell).toBeDefined();
    expect(headerCell?.textContent).toBe("Header");

    const dataCell = container.querySelector("td");

    expect(dataCell).toBeDefined();
    expect(dataCell?.textContent).toBe("Cell");
  });

  it("should render all cells as TableHead when hy is true", () => {
    const mockBlock: GetBlockResponse = {
      object: "block",
      id: "test-id",
      type: "table_row",
      table_row: {
        cells: [
          [
            {
              type: "text",
              text: { content: "Header 1", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "Header 1",
              href: null,
            },
          ],
          [
            {
              type: "text",
              text: { content: "Header 2", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "Header 2",
              href: null,
            },
          ],
        ],
      },
    };

    const { container } = render(<TRow block={mockBlock} hy={true} />, {
      wrapper: TableWrapper,
    });

    const headerCells = container.querySelectorAll("th");

    expect(headerCells).toHaveLength(2);
    expect(headerCells[0]?.textContent).toBe("Header 1");
    expect(headerCells[1]?.textContent).toBe("Header 2");
  });

  it("should render first cell as TableHead and others as TableHead when both hx and hy are true", () => {
    const mockBlock: GetBlockResponse = {
      object: "block",
      id: "test-id",
      type: "table_row",
      table_row: {
        cells: [
          [
            {
              type: "text",
              text: { content: "Main Header", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "Main Header",
              href: null,
            },
          ],
          [
            {
              type: "text",
              text: { content: "Sub Header", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "Sub Header",
              href: null,
            },
          ],
        ],
      },
    };

    const { container } = render(
      <TRow block={mockBlock} hx={true} hy={true} />,
      {
        wrapper: TableWrapper,
      },
    );

    const headerCells = container.querySelectorAll("th");

    expect(headerCells).toHaveLength(2);
    expect(headerCells[0]?.textContent).toBe("Main Header");
    expect(headerCells[1]?.textContent).toBe("Sub Header");
  });

  it("should not render anything when block is not a full block", () => {
    const mockBlock: GetBlockResponse = {
      object: "block",
      id: "test-id",
    };

    const { container } = render(<TRow block={mockBlock} />, {
      wrapper: TableWrapper,
    });

    // Should not render any table rows
    const tableRow = container.querySelector("tr");

    expect(tableRow).toBeNull();
  });

  it("should not render anything when block type is not table_row", () => {
    const mockBlock: GetBlockResponse = {
      object: "block",
      id: "test-id",
      type: "paragraph",
      paragraph: {
        rich_text: [],
        color: "default",
      },
    };

    const { container } = render(<TRow block={mockBlock} />, {
      wrapper: TableWrapper,
    });

    expect(container.children).toHaveLength(1);
  });

  it("should handle empty cells array", () => {
    const mockBlock: GetBlockResponse = {
      object: "block",
      id: "test-id",
      type: "table_row",
      table_row: {
        cells: [],
      },
    };

    const { container } = render(<TRow block={mockBlock} />);

    // When cells array is empty, the component should not render anything
    expect(container.children).toHaveLength(0);
  });

  it("should handle single cell", () => {
    const mockBlock: GetBlockResponse = {
      object: "block",
      id: "test-id",
      type: "table_row",
      table_row: {
        cells: [
          [
            {
              type: "text",
              text: { content: "Single Cell", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "Single Cell",
              href: null,
            },
          ],
        ],
      },
    };

    const { container } = render(<TRow block={mockBlock} />, {
      wrapper: TableWrapper,
    });

    const tableRow = container.querySelector("tr");

    expect(tableRow).toBeDefined();

    const cells = container.querySelectorAll("td");

    expect(cells).toHaveLength(1);
    expect(cells[0]?.textContent).toBe("Single Cell");
  });

  it("should pass additional props to TableRow component", () => {
    const mockBlock: GetBlockResponse = {
      object: "block",
      id: "test-id",
      type: "table_row",
      table_row: {
        cells: [
          [
            {
              type: "text",
              text: { content: "Cell", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "Cell",
              href: null,
            },
          ],
        ],
      },
    };

    const { container } = render(
      <TRow block={mockBlock} className="custom-row" data-testid="test-row" />,
      {
        wrapper: TableWrapper,
      },
    );

    const tableRow = container.querySelector("tr");

    expect(tableRow).toBeDefined();
    expect(tableRow?.className).toContain("custom-row");
    expect(tableRow?.getAttribute("data-testid")).toBe("test-row");
  });

  it("should generate unique keys for cells", () => {
    const mockBlock: GetBlockResponse = {
      object: "block",
      id: "test-id",
      type: "table_row",
      table_row: {
        cells: [
          [
            {
              type: "text",
              text: { content: "Cell 1", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "Cell 1",
              href: null,
            },
          ],
          [
            {
              type: "text",
              text: { content: "Cell 2", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "Cell 2",
              href: null,
            },
          ],
        ],
      },
    };

    const { container } = render(<TRow block={mockBlock} />, {
      wrapper: TableWrapper,
    });

    const cells = container.querySelectorAll("td");

    expect(cells).toHaveLength(2);
    expect(cells[0]?.textContent).toBe("Cell 1");
    expect(cells[1]?.textContent).toBe("Cell 2");
  });
});

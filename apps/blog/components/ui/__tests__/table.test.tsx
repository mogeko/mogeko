import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("Table", () => {
  it("should render table with default styles", () => {
    render(
      <Table>
        <tbody>
          <tr>
            <td>Test content</td>
          </tr>
        </tbody>
      </Table>,
    );

    const table = screen.getByRole("table");

    expect(table.className).toContain("w-full");
    expect(table.className).toContain("caption-bottom");
    expect(table.className).toContain("border-spacing-0");
  });

  it("should apply custom className to table", () => {
    render(
      <Table className="custom-table">
        <tbody>
          <tr>
            <td>Test content</td>
          </tr>
        </tbody>
      </Table>,
    );

    const table = screen.getByRole("table");

    expect(table.className).toContain("custom-table");
    expect(table.className).toContain("w-full"); // Ensure default styles are still included
  });

  it("should have wrapper div with overflow handling", () => {
    render(
      <Table>
        <tbody>
          <tr>
            <td>Test content</td>
          </tr>
        </tbody>
      </Table>,
    );

    const table = screen.getByRole("table");

    const wrapper = table.parentElement;

    expect(wrapper).toBeDefined();
    expect(wrapper?.className).toContain("relative");
    expect(wrapper?.className).toContain("w-full");
    expect(wrapper?.className).toContain("overflow-x-auto");
  });

  it("should pass through additional HTML attributes", () => {
    render(
      <Table data-testid="test-table" aria-label="Data table">
        <tbody>
          <tr>
            <td>Test content</td>
          </tr>
        </tbody>
      </Table>,
    );

    const table = screen.getByTestId("test-table");

    expect(table.getAttribute("aria-label")).toBe("Data table");
  });
});

describe("TableHeader", () => {
  it("should render table header", () => {
    render(
      <Table>
        <TableHeader>
          <tr>
            <th>Header</th>
          </tr>
        </TableHeader>
      </Table>,
    );

    const header = screen.getByRole("rowgroup");

    expect(header.tagName).toBe("THEAD");
  });

  it("should apply custom className", () => {
    render(
      <Table>
        <TableHeader className="custom-header">
          <tr>
            <th>Header</th>
          </tr>
        </TableHeader>
      </Table>,
    );

    const header = screen.getByRole("rowgroup");

    expect(header.className).toContain("custom-header");
  });
});

describe("TableBody", () => {
  it("should render table body", () => {
    render(
      <Table>
        <TableBody>
          <tr>
            <td>Body content</td>
          </tr>
        </TableBody>
      </Table>,
    );

    const body = screen.queryByRole("rowgroup");

    expect(body).toBeDefined();
  });

  it("should apply custom className", () => {
    render(
      <Table>
        <TableBody className="custom-body">
          <tr>
            <td>Body content</td>
          </tr>
        </TableBody>
      </Table>,
    );

    const body = screen.getByRole("rowgroup");

    expect(body.className).toContain("custom-body");
  });
});

describe("TableFooter", () => {
  it("should render table footer", () => {
    render(
      <Table>
        <TableFooter>
          <tr>
            <td>Footer content</td>
          </tr>
        </TableFooter>
      </Table>,
    );

    const footer = screen.queryByRole("rowgroup");

    expect(footer).toBeDefined();
  });

  it("should apply custom className", () => {
    render(
      <Table>
        <TableFooter className="custom-footer">
          <tr>
            <td>Footer content</td>
          </tr>
        </TableFooter>
      </Table>,
    );

    const footer = screen.getByRole("rowgroup");

    expect(footer.className).toContain("custom-footer");
  });
});

describe("TableRow", () => {
  it("should render table row with default styles", () => {
    render(
      <Table>
        <tbody>
          <TableRow>
            <td>Row content</td>
          </TableRow>
        </tbody>
      </Table>,
    );

    const row = screen.getByRole("row");

    expect(row.className).toContain("outline-none");
    expect(row.className).toContain("focus:bg-accent");
    expect(row.className).toContain("focus:text-accent-foreground");
  });

  it("should apply custom className", () => {
    render(
      <Table>
        <tbody>
          <TableRow className="custom-row">
            <td>Row content</td>
          </TableRow>
        </tbody>
      </Table>,
    );

    const row = screen.getByRole("row");

    expect(row.className).toContain("custom-row");
    expect(row.className).toContain("outline-none"); // Ensure default styles are still included
  });

  it("should be focusable and have focus styles", async () => {
    const user = userEvent.setup();

    render(
      <Table>
        <tbody>
          <TableRow tabIndex={0}>
            <td>Focusable row</td>
          </TableRow>
        </tbody>
      </Table>,
    );

    const row = screen.getByRole("row");

    await user.tab();

    expect(document.activeElement).toBe(row);

    expect(row.className).toContain("focus:bg-accent");
    expect(row.className).toContain("focus:text-accent-foreground");
  });

  it("should pass through additional HTML attributes", () => {
    render(
      <Table>
        <tbody>
          <TableRow data-testid="test-row" aria-label="Table row">
            <td>Row content</td>
          </TableRow>
        </tbody>
      </Table>,
    );

    const row = screen.getByTestId("test-row");

    expect(row.getAttribute("aria-label")).toBe("Table row");
  });
});

describe("TableHead", () => {
  it("should render table head with default styles", () => {
    render(
      <Table>
        <thead>
          <tr>
            <TableHead>Header cell</TableHead>
          </tr>
        </thead>
      </Table>,
    );

    const headerCell = screen.getByRole("columnheader");

    expect(headerCell.className).toContain("not-first:pl-[1ch]");
    expect(headerCell.className).toContain("shrink-0");
    expect(headerCell.className).toContain("font-normal");
    expect(headerCell.className).toContain("text-left");
  });

  it("should apply custom className", () => {
    render(
      <Table>
        <thead>
          <tr>
            <TableHead className="custom-head">Header cell</TableHead>
          </tr>
        </thead>
      </Table>,
    );

    const headerCell = screen.getByRole("columnheader");

    expect(headerCell.className).toContain("custom-head");
    expect(headerCell.className).toContain("not-first:pl-[1ch]"); // Ensure default styles are still included
  });

  it("should pass through additional HTML attributes", () => {
    render(
      <Table>
        <thead>
          <tr>
            <TableHead data-testid="test-head" scope="col">
              Header cell
            </TableHead>
          </tr>
        </thead>
      </Table>,
    );

    const headerCell = screen.getByTestId("test-head");

    expect(headerCell.getAttribute("scope")).toBe("col");
  });
});

describe("Table data-slot attributes", () => {
  it("should have correct data-slot attribute for Table", () => {
    render(
      <Table>
        <tbody>
          <tr>
            <td>Content</td>
          </tr>
        </tbody>
      </Table>,
    );

    const table = screen.getByRole("table");

    expect(table.getAttribute("data-slot")).toBe("table-container");
  });

  it("should have correct data-slot attribute for TableHeader", () => {
    render(
      <Table>
        <TableHeader>
          <tr>
            <th>Header</th>
          </tr>
        </TableHeader>
      </Table>,
    );

    const header = screen.getByRole("rowgroup");

    expect(header.getAttribute("data-slot")).toBe("table-header");
  });

  it("should have correct data-slot attribute for TableBody", () => {
    render(
      <Table>
        <TableBody>
          <tr>
            <td>Body content</td>
          </tr>
        </TableBody>
      </Table>,
    );

    const body = screen.getByRole("rowgroup");

    expect(body.getAttribute("data-slot")).toBe("table-body");
  });

  it("should have correct data-slot attribute for TableFooter", () => {
    render(
      <Table>
        <TableFooter>
          <tr>
            <td>Footer content</td>
          </tr>
        </TableFooter>
      </Table>,
    );

    const footer = screen.getByRole("rowgroup");

    expect(footer.getAttribute("data-slot")).toBe("table-footer");
  });

  it("should have correct data-slot attribute for TableRow", () => {
    render(
      <Table>
        <tbody>
          <TableRow>
            <td>Row content</td>
          </TableRow>
        </tbody>
      </Table>,
    );

    const row = screen.getByRole("row");

    expect(row.getAttribute("data-slot")).toBe("table-row");
  });

  it("should have correct data-slot attribute for TableHead", () => {
    render(
      <Table>
        <thead>
          <tr>
            <TableHead>Header cell</TableHead>
          </tr>
        </thead>
      </Table>,
    );

    const headerCell = screen.getByRole("columnheader");

    expect(headerCell.getAttribute("data-slot")).toBe("table-head");
  });

  it("should have correct data-slot attribute for TableCell", () => {
    render(
      <Table>
        <tbody>
          <tr>
            <TableCell>Cell content</TableCell>
          </tr>
        </tbody>
      </Table>,
    );

    const cell = screen.getByRole("cell");

    expect(cell.getAttribute("data-slot")).toBe("table-cell");
  });

  it("should have correct data-slot attribute for TableCaption", () => {
    render(
      <Table>
        <TableCaption>Table description</TableCaption>
        <tbody>
          <tr>
            <td>Content</td>
          </tr>
        </tbody>
      </Table>,
    );

    const caption = screen.getByText("Table description");

    expect(caption.getAttribute("data-slot")).toBe("table-caption");
  });
});

describe("TableCell", () => {
  it("should render table cell with default styles", () => {
    render(
      <Table>
        <tbody>
          <tr>
            <TableCell>Cell content</TableCell>
          </tr>
        </tbody>
      </Table>,
    );

    const cell = screen.getByRole("cell");

    expect(cell.className).toContain("not-first:pl-[1ch]");
    expect(cell.className).toContain("shrink-0");
  });

  it("should apply custom className", () => {
    render(
      <Table>
        <tbody>
          <tr>
            <TableCell className="custom-cell">Cell content</TableCell>
          </tr>
        </tbody>
      </Table>,
    );

    const cell = screen.getByRole("cell");

    expect(cell.className).toContain("custom-cell");
    expect(cell.className).toContain("not-first:pl-[1ch]"); // Ensure default styles are still included
  });

  it("should pass through additional HTML attributes", () => {
    render(
      <Table>
        <tbody>
          <tr>
            <TableCell data-testid="test-cell" colSpan={2}>
              Cell content
            </TableCell>
          </tr>
        </tbody>
      </Table>,
    );

    const cell = screen.getByTestId("test-cell");

    expect(cell.getAttribute("colSpan")).toBe("2");
  });
});

describe("TableCaption", () => {
  it("should render table caption", () => {
    render(
      <Table>
        <TableCaption>Table description</TableCaption>
        <tbody>
          <tr>
            <td>Content</td>
          </tr>
        </tbody>
      </Table>,
    );

    const caption = screen.getByText("Table description");

    expect(caption.tagName).toBe("CAPTION");
  });

  it("should apply custom className", () => {
    render(
      <Table>
        <TableCaption className="custom-caption">
          Table description
        </TableCaption>
        <tbody>
          <tr>
            <td>Content</td>
          </tr>
        </tbody>
      </Table>,
    );

    const caption = screen.getByText("Table description");

    expect(caption.className).toContain("custom-caption");
  });

  it("should pass through additional HTML attributes", () => {
    render(
      <Table>
        <TableCaption data-testid="test-caption" aria-label="Table summary">
          Table description
        </TableCaption>
        <tbody>
          <tr>
            <td>Content</td>
          </tr>
        </tbody>
      </Table>,
    );

    const caption = screen.getByTestId("test-caption");

    expect(caption.getAttribute("aria-label")).toBe("Table summary");
  });
});

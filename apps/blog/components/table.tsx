import { RichText } from "@/components/text";
import type {
  GetBlockResponse,
  TableBlockObjectResponse,
} from "@/lib/api-endpoints";
import { notion } from "@/lib/notion";
import { forwardRef } from "react";

export const Table = forwardRef<
  HTMLTableElement,
  Omit<React.TableHTMLAttributes<HTMLTableElement>, "children"> & {
    children: TableBlockObjectResponse;
  }
>(async ({ children, ...props }, ref) => {
  const { has_column_header, has_row_header } = children.table;
  const [head, ...rest] = (
    await notion.blocks.children.list({ block_id: children.id })
  ).results;

  return (
    <table ref={ref} {...props}>
      {has_column_header && (
        <thead>
          <TableRow hasColHead={true}>{head}</TableRow>
        </thead>
      )}
      <tbody>
        {!has_column_header && (
          <TableRow hasRowHead={has_row_header}>{head}</TableRow>
        )}
        {rest.map((block) => {
          return (
            <TableRow hasRowHead={has_row_header} key={block.id}>
              {block}
            </TableRow>
          );
        })}
      </tbody>
    </table>
  );
});

export const TableRow = forwardRef<
  HTMLTableRowElement,
  Omit<React.HTMLAttributes<HTMLTableRowElement>, "children"> & {
    hasColHead?: boolean;
    hasRowHead?: boolean;
    children: GetBlockResponse;
  }
>(({ children, hasColHead = false, hasRowHead = false, ...props }, ref) => {
  if ("type" in children && children.type === "table_row") {
    const [head, ...rest] = children.table_row.cells;

    const RestCell = hasColHead ? "th" : "td";
    const HeadCell = hasRowHead ? "th" : RestCell;

    return (
      <tr ref={ref} {...props}>
        <HeadCell>
          <RichText>{head}</RichText>
        </HeadCell>
        {rest.map((cell, i) => {
          return (
            <RestCell key={`${children.id}-${i}`}>
              <RichText>{cell}</RichText>
            </RestCell>
          );
        })}
      </tr>
    );
  }
});

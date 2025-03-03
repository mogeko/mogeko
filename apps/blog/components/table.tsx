import { RichText } from "@/components/text";
import type {
  GetBlockResponse,
  TableBlockObjectResponse,
} from "@/lib/api-endpoints";
import { notion } from "@/lib/notion";

export const Table: React.FC<
  React.TableHTMLAttributes<HTMLTableElement> & {
    table: TableBlockObjectResponse;
  }
> = async ({ table: block, ...props }) => {
  const { has_column_header, has_row_header } = block.table;
  const [head, ...rest] = (
    await notion.blocks.children.list({ block_id: block.id })
  ).results;

  return (
    <table {...props}>
      {has_column_header && (
        <thead>
          <TableRow hasColHead={true} tableRowBlock={head} />
        </thead>
      )}
      <tbody>
        {!has_column_header && (
          <TableRow hasRowHead={has_row_header} tableRowBlock={head} />
        )}
        {rest.map((block) => {
          return (
            <TableRow
              hasRowHead={has_row_header}
              tableRowBlock={block}
              key={block.id}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export const TableRow: React.FC<
  Omit<React.HTMLAttributes<HTMLTableRowElement>, "children"> & {
    hasColHead?: boolean;
    hasRowHead?: boolean;
    tableRowBlock: GetBlockResponse;
  }
> = ({ tableRowBlock, hasColHead = false, hasRowHead = false, ...props }) => {
  if ("type" in tableRowBlock && tableRowBlock.type === "table_row") {
    const [head, ...rest] = tableRowBlock.table_row.cells;

    const RestCell = hasColHead ? "th" : "td";
    const HeadCell = hasRowHead ? "th" : RestCell;

    return (
      <tr {...props}>
        <HeadCell>
          <RichText rich_text={head} />
        </HeadCell>
        {rest.map((cell, i) => {
          return (
            <RestCell key={`${tableRowBlock.id}-${i}`}>
              <RichText rich_text={cell} />
            </RestCell>
          );
        })}
      </tr>
    );
  }
};

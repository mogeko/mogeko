import { TRow } from "@/components/table-row";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import type { TableBlockObjectResponse } from "@/lib/api-endpoints";
import { notion } from "@/lib/notion";

export const TableBox: React.FC<
  React.ComponentProps<typeof Table> & { block: TableBlockObjectResponse }
> = async ({ block, ...props }) => {
  const { has_column_header: hy, has_row_header: hx } = block.table;
  const [head, ...rest] = (
    await notion.blocks.children.list({ block_id: block.id })
  ).results;

  return (
    <Table {...props}>
      {hy && (
        <TableHeader>
          <TRow hy={hy} block={head} />
        </TableHeader>
      )}
      <TableBody>
        <RowSeparator colSpan={block.table.table_width} />
        {!hy && <TRow tabIndex={0} hx={hx} block={head} />}
        {rest.map((cell) => {
          return (
            <TRow
              tabIndex={0}
              key={`${block.id}-${cell.id}`}
              hx={hx}
              block={cell}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

export const RowSeparator: React.FC<{ colSpan?: number }> = ({ colSpan }) => {
  return (
    <tr>
      <td className="h-1 w-full" colSpan={colSpan}>
        <span className="block bg-foreground h-[2px] w-full" />
      </td>
    </tr>
  );
};

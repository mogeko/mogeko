import { RichText } from "@/components/text";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import type { GetBlockResponse } from "@/lib/api-endpoints";
import { forwardRef } from "react";

type TRowProps = { hy?: boolean; hx?: boolean; block: GetBlockResponse };

export const TRow = forwardRef<
  React.ComponentRef<typeof TableRow>,
  React.ComponentProps<typeof TableRow> & TRowProps
>(({ block, hy = false, hx = false, ...props }, ref) => {
  if ("type" in block && block.type === "table_row") {
    const [head, ...rest] = block.table_row.cells;

    const RestCell = hy ? TableHead : TableCell;
    const HeadCell = hx ? TableHead : RestCell;

    return (
      <TableRow ref={ref} {...props}>
        <HeadCell>
          <RichText rich_text={head} />
        </HeadCell>
        {rest.map((cell, i) => {
          return (
            <RestCell key={`${block.id}-${i}`}>
              <RichText rich_text={cell} />
            </RestCell>
          );
        })}
      </TableRow>
    );
  }
});
TRow.displayName = "TRow";

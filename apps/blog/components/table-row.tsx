import { RichText } from "@/components/text";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import type { GetBlockResponse } from "@/lib/api-endpoints";

export const TRow: React.FC<
  {} & { hasCH?: boolean; hasRH?: boolean; block: GetBlockResponse }
> = ({ block, hasCH = false, hasRH = false }) => {
  if ("type" in block && block.type === "table_row") {
    const [head, ...rest] = block.table_row.cells;

    const RestCell = hasCH ? TableHead : TableCell;
    const HeadCell = hasRH ? TableHead : RestCell;

    return (
      <TableRow>
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
};

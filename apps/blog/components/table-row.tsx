import { RichText } from "@/components/text";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { type GetBlockResponse, isFullBlock } from "@/lib/notion";

type TRowProps = { hy?: boolean; hx?: boolean; block: GetBlockResponse };

export const TRow: React.FC<
  React.ComponentProps<typeof TableRow> & TRowProps
> = ({ block, hy = false, hx = false, ...props }) => {
  if (isFullBlock(block) && block.type === "table_row") {
    const [head, ...rest] = block.table_row.cells;

    // Don't render if there are no cells
    if (!head) {
      return null;
    }

    const RestCell = hy ? TableHead : TableCell;
    const HeadCell = hx ? TableHead : RestCell;

    return (
      <TableRow {...props}>
        <HeadCell>
          <RichText richText={head} />
        </HeadCell>
        {rest.map((cell, i) => {
          return (
            <RestCell key={`${block.id}-${i}`}>
              <RichText richText={cell} />
            </RestCell>
          );
        })}
      </TableRow>
    );
  }
};

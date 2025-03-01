import { NotionBlockChildren } from "@/components/render";
import { RichText } from "@/components/text";
import type { GetBlockResponse } from "@/lib/api-endpoints";
import { colorVariants } from "@/lib/color-variants";
import { forwardRef } from "react";

export const Details = forwardRef<
  HTMLDetailsElement,
  Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, "children"> & {
    children: GetBlockResponse;
    summary?: React.ReactNode;
  }
>(async ({ className, children, summary, ...props }, ref) => {
  return (
    <details className={className} ref={ref} {...props}>
      <Summary block={children}>{summary}</Summary>
      <NotionBlockChildren block={children} />
    </details>
  );
});
Details.displayName = "Details";

export const Summary = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { block: GetBlockResponse }
>(async ({ className, block, ...props }, ref) => {
  if ("type" in block && block.type === "toggle") {
    const { color, rich_text } = block.toggle;
    const cn = colorVariants({ color, className });
    return (
      <summary className={cn.length ? cn : void 0} ref={ref} {...props}>
        <RichText>{rich_text}</RichText>
      </summary>
    );
  }
  return <summary className={className} ref={ref} {...props} />;
});
Summary.displayName = "Summary";

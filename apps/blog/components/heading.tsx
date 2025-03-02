import { RichText, plainText } from "@/components/text";
import type {
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
} from "@/lib/api-endpoints";
import { colorVariants } from "@/lib/color-variants";
import Link from "next/link";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Heading = forwardRef<
  HTMLHeadingElement,
  Omit<React.HTMLAttributes<HTMLHeadingElement>, "children"> & {
    level?: 1 | 2 | 3;
    children:
      | Heading1BlockObjectResponse["heading_1"]
      | Heading2BlockObjectResponse["heading_2"]
      | Heading3BlockObjectResponse["heading_3"];
  }
>(({ className, id, children, level = 1, ...props }, ref) => {
  const Comp = (["h1", "h2", "h3"] as const)[level - 1] ?? "h1";
  const cn = twMerge(colorVariants({ className, color: children.color }));

  return (
    <Comp id={id} className={cn} ref={ref} {...props}>
      {id ? (
        <Link href={`#${id}`} title={plainText(children.rich_text)}>
          {(["#", "##", "###"] as const)[level - 1] ?? "#"}
        </Link>
      ) : null}
      <RichText>{children.rich_text}</RichText>
    </Comp>
  );
});

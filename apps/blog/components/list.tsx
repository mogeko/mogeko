import { RichText } from "@/components/text";
import type {
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
} from "@/lib/api-endpoints";
import { colorVariants } from "@/lib/color-variants";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const ListItem = forwardRef<
  HTMLLIElement,
  Omit<React.LiHTMLAttributes<HTMLLIElement>, "children"> & {
    children:
      | NumberedListItemBlockObjectResponse["numbered_list_item"]
      | BulletedListItemBlockObjectResponse["bulleted_list_item"];
  }
>(({ className, children, ...props }, ref) => {
  const cn = twMerge(colorVariants({ color: children.color }));

  return (
    <li className={cn.length ? cn : void 0} ref={ref} {...props}>
      <RichText>{children.rich_text}</RichText>
    </li>
  );
});

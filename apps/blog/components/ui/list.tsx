import { type ColorVariantProps, colorVariants } from "@/lib/color-variants";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const ListItem = forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement> & ColorVariantProps
>(({ className, color, ...props }, ref) => {
  // TODO: Handle KeyDown event

  return (
    <li
      ref={ref}
      className={twMerge(
        colorVariants({
          className:
            "pl-[1ch] focus:outline-0 focus:bg-accent focus:text-accent-foreground",
          color,
        }),
      )}
      {...props}
    />
  );
});
ListItem.displayName = "ListItem";

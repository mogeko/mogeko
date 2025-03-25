import { type ColorVariantProps, colorVariants } from "@/lib/color-variants";
import { cn } from "@/lib/utils";
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
          className: [
            "pl-[1ch] focus:outline-none focus:bg-accent focus:text-accent-foreground",
            className,
          ],
          color,
        }),
      )}
      {...props}
    />
  );
});
ListItem.displayName = "ListItem";

export const OrderedList = forwardRef<
  HTMLOListElement,
  React.OlHTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => {
  return (
    <ol
      ref={ref}
      className={cn("my-1 list-inside list-decimal -indent-[1ch]", className)}
      {...props}
    />
  );
});
OrderedList.displayName = "OrderedList";

export const UnorderedList = forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn("my-1 list-inside list-['▪_'] -indent-[1ch]", className)}
      {...props}
    />
  );
});
UnorderedList.displayName = "UnorderedList";

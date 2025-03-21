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

export const OrderedList = forwardRef<
  HTMLOListElement,
  React.OlHTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => {
  return <ol ref={ref} className={cn("my-1", className)} {...props} />;
});

export const UnorderedList = forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  return <ul ref={ref} className={className} {...props} />;
});

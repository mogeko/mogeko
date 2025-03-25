import { type ColorVariantProps, colorVariants } from "@/lib/color-variants";
import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

export const ListItem: React.FC<
  React.LiHTMLAttributes<HTMLLIElement> & ColorVariantProps
> = ({ className, color, ...props }) => {
  return (
    <li
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
};

export const OrderedList: React.FC<
  React.OlHTMLAttributes<HTMLOListElement>
> = ({ className, ...props }) => {
  return (
    <ol
      className={cn("my-1 list-inside list-decimal -indent-[1ch]", className)}
      {...props}
    />
  );
};

export const UnorderedList: React.FC<
  React.HTMLAttributes<HTMLUListElement>
> = ({ className, ...props }) => {
  return (
    <ul
      className={cn("my-1 list-inside list-['▪_'] -indent-[1ch]", className)}
      {...props}
    />
  );
};

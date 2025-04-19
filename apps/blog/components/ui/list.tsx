import { type ColorVariantProps, colorVariants } from "@/lib/colors";
import { twMerge } from "tailwind-merge";

export const ListItem: React.FC<
  React.HTMLAttributes<HTMLDivElement> & ColorVariantProps
> = ({ className, color, ...props }) => {
  return (
    <div
      className={twMerge(
        colorVariants({
          className: [
            "outline-none focus:bg-accent focus:text-accent-foreground",
            className,
          ],
          color,
        }),
      )}
      role="listitem"
      {...props}
    />
  );
};

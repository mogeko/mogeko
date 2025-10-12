import { twMerge } from "tailwind-merge";
import { type ColorVariantProps, colorVariants } from "@/lib/colors";

export const ListItem: React.FC<
  React.HTMLAttributes<HTMLDivElement> & ColorVariantProps
> = ({ className, color, ...props }) => {
  return (
    // biome-ignore lint/a11y/useSemanticElements: Should be used in a list
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

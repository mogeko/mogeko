import { type VariantProps, cva } from "class-variance-authority";
import NextLink from "next/link";
import { twMerge } from "tailwind-merge";

export const linkVariants = cva(
  "outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
  {
    variants: {
      variant: {
        primary:
          "underline underline-offset-2 decoration-2 bg-muted text-muted-foreground",
        ghost: null,
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export const Link: React.FC<
  React.ComponentProps<typeof NextLink> & VariantProps<typeof linkVariants>
> = ({ className, variant, tabIndex = 0, ...props }) => {
  return (
    <NextLink
      className={twMerge(linkVariants({ variant, className }))}
      tabIndex={tabIndex}
      {...props}
    />
  );
};

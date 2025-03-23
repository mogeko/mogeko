import { type VariantProps, cva } from "class-variance-authority";
import NextLink from "next/link";
import { forwardRef } from "react";
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

export const Link = forwardRef<
  React.ComponentRef<typeof NextLink>,
  React.ComponentPropsWithoutRef<typeof NextLink> &
    VariantProps<typeof linkVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <NextLink
      ref={ref}
      className={twMerge(linkVariants({ variant, className }))}
      {...props}
    />
  );
});
Link.displayName = "Link";

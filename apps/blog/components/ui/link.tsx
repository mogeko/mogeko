import { cn } from "@/lib/utils";
import NextLink from "next/link";
import { forwardRef } from "react";

export const Link = forwardRef<
  React.ComponentRef<typeof NextLink>,
  React.ComponentPropsWithoutRef<typeof NextLink>
>(({ className, ...props }, ref) => {
  return (
    <NextLink
      ref={ref}
      className={cn(
        "bg-muted text-muted-foreground outline-none underline underline-offset-2 decoration-2 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
});

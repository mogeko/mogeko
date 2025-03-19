import { cn } from "@/lib/utils";
import NextLink from "next/link";
import { forwardRef } from "react";

export const ActionLink = forwardRef<
  React.ComponentRef<typeof NextLink>,
  React.ComponentProps<typeof NextLink> & { icon?: React.ReactNode }
>(({ icon, className, children, ...props }, ref) => {
  return (
    <NextLink
      ref={ref}
      className={cn(
        "flex items-start justify-between bg-transparent text-foreground hover:[&>figure]:bg-accent focus:[&>figure]:bg-accent",
        className,
      )}
      {...props}
    >
      <figure className="inline-flex items-center justify-center shrink w-[3ch] bg-border text-foreground select-none">
        {icon ?? "⊹"}
      </figure>
      <span className="inline-flex items-center justify-start self-stretch bg-secondary text-secondary-foreground min-w-1/10 w-full px-[1ch] select-none">
        {children}
      </span>
    </NextLink>
  );
});
ActionLink.displayName = "ActionLink";

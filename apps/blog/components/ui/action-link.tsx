import NextLink from "next/link";
import { cn } from "@/lib/utils";

export const ActionLink: React.FC<
  React.ComponentProps<typeof NextLink> & { icon?: React.ReactNode }
> = ({ icon, className, children, tabIndex = 0, ...props }) => {
  return (
    <NextLink
      data-slot="link"
      className={cn(
        "flex items-start justify-between bg-transparent text-foreground outline-none hover:[&>figure]:bg-accent focus:[&>figure]:bg-accent",
        className,
      )}
      tabIndex={tabIndex}
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
};

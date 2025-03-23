import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Breadcrumb = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <nav
      aria-label="breadcrumb"
      ref={ref}
      className={cn(
        "flex flex-wrap items-center break-words gap-[1ch]",
        className,
      )}
      {...props}
    />
  );
});
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbSeparator: React.FC = () => {
  return <span>{"\u276F"}</span>;
};

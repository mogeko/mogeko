import { type ColorVariantProps, colorVariants } from "@/lib/color-variants";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Summary = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & ColorVariantProps
>(({ className, children, color, ...props }, ref) => {
  return (
    <summary
      className={colorVariants({
        className: [
          "hover:bg-accent hover:text-accent-foreground marker:content-['▸'] group-open:marker:content-['▾']",
          className,
        ],
        color,
      })}
      ref={ref}
      {...props}
    >
      <span className="min-w-1/10 w-full select-none transition-[padding] duration-200 pl-0 group-open:pl-[1ch]">
        {children}
      </span>
    </summary>
  );
});
Summary.displayName = "Summary";

export const Details = forwardRef<
  HTMLDetailsElement,
  React.DetailsHTMLAttributes<HTMLDetailsElement>
>(({ className, ...props }, ref) => {
  return <details className={cn("group", className)} ref={ref} {...props} />;
});
Details.displayName = "Details";

import { type ColorVariantProps, colorVariants } from "@/lib/color-variants";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Summary = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & ColorVariantProps
>(({ className, children, color, ...props }, ref) => {
  return (
    <summary
      ref={ref}
      className={colorVariants({
        className: [
          "marker:content-['▸'] group-open:marker:content-['▾'] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className,
        ],
        color,
      })}
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
  return <details ref={ref} className={cn("group", className)} {...props} />;
});
Details.displayName = "Details";

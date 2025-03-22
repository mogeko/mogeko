import { type ColorVariantProps, colorVariants } from "@/lib/color-variants";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

export const Summary = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & ColorVariantProps & { asChild?: boolean }
>(({ className, children, color, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "span";

  return (
    <summary
      ref={ref}
      className={colorVariants({
        className: [
          "inline-flex min-w-1/10 w-full outline-none before:content-['▸'] group-open:before:content-['▾'] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className,
        ],
        color,
      })}
      tabIndex={0}
      {...props}
    >
      <Comp className="flex-1 select-none transition-[padding] duration-200 pl-0 group-open:pl-[1ch]">
        {children}
      </Comp>
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

import { type ColorVariantProps, colorVariants } from "@/lib/color-variants";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Summary = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { asChild?: boolean }
>(({ className, children, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "span";

  return (
    <summary
      ref={ref}
      className={cn(
        "inline-flex min-w-1/10 w-full outline-none before:content-['▸'] group-open:before:content-['▾'] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className,
      )}
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
  React.DetailsHTMLAttributes<HTMLDetailsElement> & ColorVariantProps
>(({ className, color, ...props }, ref) => {
  return (
    <details
      ref={ref}
      className={twMerge(
        colorVariants({ color, className: ["group", className] }),
      )}
      {...props}
    />
  );
});
Details.displayName = "Details";

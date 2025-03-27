import { type ColorVariantProps, colorVariants } from "@/lib/color-variants";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";

export const Summary: React.FC<
  React.HTMLAttributes<HTMLElement> & { asChild?: boolean }
> = ({ className, children, asChild, ...props }) => {
  const Comp = asChild ? (Slot as any) : "span";

  return (
    <summary
      className={cn(
        "flex w-full outline-none before:content-['▸'] group-open:before:content-['▾'] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground marker:hidden",
        className,
      )}
      tabIndex={0}
      {...props}
    >
      <Comp className="min-w-1/10 flex-1 select-none transition-[padding] duration-200 pl-0 group-open:pl-[1ch]">
        {children}
      </Comp>
    </summary>
  );
};

export const Details: React.FC<
  React.DetailsHTMLAttributes<HTMLDetailsElement> & ColorVariantProps
> = ({ className, color, ...props }) => {
  return (
    <details
      className={twMerge(
        colorVariants({ color, className: ["group", className] }),
      )}
      {...props}
    />
  );
};

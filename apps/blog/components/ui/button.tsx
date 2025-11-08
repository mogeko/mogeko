import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const buttonVariants = cva(
  "flex outline-none items-center justify-center font-bold min-h-2 w-full px-[2ch] uppercase tracking-[1px] transition-colors duration-200 cursor-pointer hover:bg-accent focus:bg-accent disabled:bg-secondary disabled:text-border disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secndary:
          "bg-background text-foreground shadow-[inset_0_0_0_1px] shadow-secondary hover:shadow-transparent focus:shadow-transparent",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & { asChild?: boolean }
> = ({ className, variant, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={twMerge(buttonVariants({ variant, className }))}
      {...props}
    />
  );
};

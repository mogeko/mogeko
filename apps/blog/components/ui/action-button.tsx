import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

export const ActionButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    hotkey?: React.ReactNode;
    open?: boolean;
    asChild?: boolean;
  }
>(({ className, children, hotkey, open, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      className={cn(
        "group inline-flex items-center justify-center cursor-pointer outline-0 shrink-0",
        className,
      )}
      {...props}
    >
      {hotkey && (
        <kbd className="bg-border text-foreground font-normal px-[1ch] py-0 select-none group-has-hover:bg-accent group-has-hover:text-accent-foreground group-has-focus:bg-accent group-has-focus:text-accent-foreground">
          {hotkey}
        </kbd>
      )}
      <span
        className={cn(
          "bg-secondary text-secondary-foreground shadow-border shadow-[inset_0_0_0_2px] font-normal px-[1ch] py-0 uppercase select-none group-has-hover:shadow-accent group-has-focus:shadow-accent",
          open && "bg-accent",
        )}
      >
        {children}
      </span>
    </Comp>
  );
});
ActionButton.displayName = "ActionButton";

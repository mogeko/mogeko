import { cn } from "@/lib/utils";
import { Root } from "@radix-ui/react-toggle";
import React from "react";

export const ActionButton = React.forwardRef<
  React.ComponentRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root> & { hotkey?: React.ReactNode }
>(({ className, children, hotkey, ...props }, ref) => {
  return (
    <Root
      className={cn(
        "group inline-flex items-center justify-center cursor-pointer outline-0 shrink-0",
        className,
      )}
      ref={ref}
      {...props}
    >
      {hotkey && (
        <span className="bg-muted text-muted-foreground font-normal px-[1ch] py-0 select-none group-has-hover:bg-accent group-has-hover:text-accent-foreground group-has-focus:bg-accent group-has-focus:text-accent-foreground group-data-[state=on]:bg-accent group-data-[state=on]:text-accent-foreground">
          {hotkey}
        </span>
      )}
      <span className="bg-secondary text-secondary-foreground shadow-muted shadow-[inset_0_0_0_2px] font-normal px-[1ch] py-0 uppercase select-none group-has-hover:shadow-accent group-has-focus:shadow-accent group-data-[state=on]:shadow-accent">
        {children}
      </span>
    </Root>
  );
});
ActionButton.displayName = "ActionButton";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const ActionButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    hotkey?: React.ReactNode;
    open?: boolean;
  }
>(({ className, children, hotkey, open, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center cursor-pointer outline-0 shrink-0 hover:[&>kbd]:bg-accent hover:[&>kbd]:text-accent-foreground hover:[&>span]:shadow-accent focus:[&>kbd]:bg-accent focus:[&>kbd]:text-accent-foreground focus:[&>span]:shadow-accent",
        className,
      )}
      {...props}
    >
      {hotkey && (
        <kbd className="bg-border text-foreground font-normal px-[1ch] py-0 select-none">
          {hotkey}
        </kbd>
      )}
      <span
        className={cn(
          "bg-secondary text-secondary-foreground shadow-border shadow-[inset_0_0_0_2px] font-normal px-[1ch] py-0 uppercase select-none",
          open && "bg-accent",
        )}
      >
        {children}
      </span>
    </button>
  );
});
ActionButton.displayName = "ActionButton";

import { cn } from "@/lib/utils";

export const Checkbox: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { checked?: boolean }
> = ({ checked = false, className, children, ...props }) => {
  return (
    <div
      data-slot="checkbox"
      className={cn(
        "inline-flex items-center justify-center cursor-pointer outline-none shrink-0",
        className,
      )}
      {...props}
    >
      <span className="inline-flex w-full h-full px-[1ch] text-foreground bg-border items-stretch">
        {checked ? "\u2573" : "\u00A0"}
      </span>
      <span className="inline-flex bg-secondary min-w-1/10 w-full items-stretch">
        {children}
      </span>
    </div>
  );
};

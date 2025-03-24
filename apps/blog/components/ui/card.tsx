import { cn } from "@/lib/utils";

export const Card: React.FC<
  React.HTMLAttributes<HTMLElement> & { variant?: "left" | "center" | "right" }
> = ({ className, children, title, variant = "center", ...props }) => {
  return (
    <article
      className={cn("relative block whitespace-pre-wrap", className)}
      {...props}
    >
      <header className="flex justify-between items-end">
        <div
          className={cn(
            "shadow-foreground shadow-[inset_2px_0_0_0,inset_0_2px_0_0] pt-0.5 px-[1ch]",
            variant === "left" ? "shrink-0" : "w-full min-w-1/10 pr-[2ch]",
          )}
          aria-hidden="true"
        />
        {title && <h2 className="shrink-0 px-[1ch]">{title}</h2>}
        <div
          className={cn(
            "shadow-foreground shadow-[inset_-2px_0_0_0,inset_0_2px_0_0] pt-0.5 px-[1ch]",
            variant === "right" ? "shrink-0" : "w-full min-w-1/10 pr-[2ch]",
          )}
          aria-hidden="true"
        />
      </header>
      <section className="shadow-foreground shadow-[inset_2px_0_0_0,inset_-2px_0_0_0,inset_0_-2px_0_0] block pt-0.5 pb-1 px-[1ch] overflow-x-auto overflow-y-hidden">
        {children}
      </section>
    </article>
  );
};

import { cn } from "@/lib/utils";

export const Separator: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <hr
      className={cn(
        "block bg-foreground shrink-0 h-[2px] w-full border-none",
        className,
      )}
    />
  );
};

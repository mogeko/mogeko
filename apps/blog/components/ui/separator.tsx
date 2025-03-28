import { cn } from "@/lib/utils";

export const Separator: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center shrink-0 h-1 w-full outline-none",
        className,
      )}
    >
      <div className="block bg-foreground shrink-0 h-[2px] w-full" />
    </div>
  );
};

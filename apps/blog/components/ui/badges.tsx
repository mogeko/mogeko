import { cn } from "@/lib/utils";

type BadgesProps = React.HTMLAttributes<HTMLSpanElement>;

export const Badges: React.FC<BadgesProps> = ({ className, ...props }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center outline-none px-[1ch] min-h-1 uppercas bg-secondary text-secondary-foreground",
        className,
      )}
      {...props}
    />
  );
};

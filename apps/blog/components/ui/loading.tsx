import { cn } from "@/lib/utils";

export const Loading: React.FC<
  Omit<React.HTMLAttributes<HTMLSpanElement>, "children">
> = ({ className, ...props }) => {
  return (
    <span
      className={cn(
        "after:animate-loading text-base inline-block text-inherit align-bottom",
        className,
      )}
      {...props}
    />
  );
};

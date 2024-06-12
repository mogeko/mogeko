import { cn } from "@/lib/utils";

export const Spoiler: React.FC<
  {} & {} & React.HTMLAttributes<HTMLSpanElement>
> = ({ className, children }) => {
  return (
    <span
      className={cn("bg-[#000] px-2 text-[#000] hover:text-[#fff]", className)}
    >
      {children}
    </span>
  );
};

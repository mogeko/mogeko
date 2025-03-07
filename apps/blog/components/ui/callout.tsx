import { type ColorVariantProps, colorVariants } from "@/lib/color-variants";
import { twMerge } from "tailwind-merge";

export const Callout: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    icon: React.ReactNode | null;
  } & ColorVariantProps
> = ({ icon, children, className, color, ...props }) => {
  return (
    <div
      className={twMerge(
        colorVariants({
          className: ["flex flex-row gap-2 p-2", className],
          color,
        }),
      )}
      {...props}
    >
      {icon && <div>{icon}</div>}
      {icon ? <div>{children}</div> : children}
    </div>
  );
};

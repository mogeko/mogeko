import { type ColorVariantProps, colorVariants } from "@/lib/color-variants";
import { twMerge } from "tailwind-merge";

export const ListItem: React.FC<
  React.LiHTMLAttributes<HTMLLIElement> & ColorVariantProps
> = ({ className, children, color, ...props }) => {
  const cn = twMerge(colorVariants({ color }));

  return (
    <li className={cn.length ? cn : void 0} {...props}>
      {children}
    </li>
  );
};

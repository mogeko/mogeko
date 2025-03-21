import { type ColorVariantProps, colorVariants } from "@/lib/color-variants";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const Heading: React.FC<
  React.HTMLAttributes<HTMLHeadingElement> & {
    level: 1 | 2 | 3;
  } & ColorVariantProps
> = ({ className, id, level = 1, children, color, ...props }) => {
  const Comp = (["h1", "h2", "h3"] as const)[level - 1] ?? "h1";
  const cn = twMerge(colorVariants({ className, color }));

  return (
    <Comp id={id} className={cn.length ? cn : void 0} {...props}>
      {id ? (
        <Link className="pr-[1ch]" href={`#${id}`}>
          {(["#", "##", "###"] as const)[level - 1] ?? "#"}
        </Link>
      ) : null}
      {children}
    </Comp>
  );
};

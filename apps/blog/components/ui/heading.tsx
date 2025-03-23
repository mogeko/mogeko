import { Link } from "@/components/ui/link";
import { type ColorVariantProps, colorVariants } from "@/lib/color-variants";
import { twMerge } from "tailwind-merge";

export const Heading: React.FC<
  React.HTMLAttributes<HTMLHeadingElement> & {
    level: 1 | 2 | 3;
  } & ColorVariantProps
> = ({ className, id, level = 1, children, color, ...props }) => {
  const Comp = (["h1", "h2", "h3"] as const)[level - 1] ?? "h1";

  return (
    <Comp
      id={id}
      className={twMerge(
        colorVariants({
          color,
          className: ["scroll-m-3.5 font-extrabold flex gap-[1ch]", className],
        }),
      )}
      {...props}
    >
      {id ? (
        <Link variant="ghost" href={`#${id}`}>
          {(["#", "##", "###"] as const)[level - 1] ?? "#"}
        </Link>
      ) : null}
      {children}
    </Comp>
  );
};

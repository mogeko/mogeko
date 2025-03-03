import { type ColorVariantProps, colorVariants } from "@/lib/color-variants";

export const Details: React.FC<
  React.DetailsHTMLAttributes<HTMLDetailsElement>
> = ({ className, ...props }) => {
  return <details className={className} {...props} />;
};

export const Summary: React.FC<
  React.HTMLAttributes<HTMLElement> & ColorVariantProps
> = ({ className, color, children, ...props }) => {
  const cn = colorVariants({ color, className });

  return (
    <summary className={cn.length ? cn : void 0} {...props}>
      {children}
    </summary>
  );
};

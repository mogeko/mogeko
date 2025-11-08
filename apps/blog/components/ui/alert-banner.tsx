import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const alertBannerVariants = cva(
  "flex gap-[1ch] py-1 px-[2ch] shadow-[1ch_1ch_0_0]",
  {
    variants: {
      color: {
        gray_background: "bg-secondary text-secondary-foreground shadow-muted",
      },
    },
    defaultVariants: {
      color: "gray_background",
    },
  },
);

export const AlertBanner: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    icon: React.ReactNode | null;
  } & VariantProps<typeof alertBannerVariants>
> = ({ icon, children, className, color, ...props }) => {
  return (
    <div
      role="alert"
      className={twMerge(alertBannerVariants({ color, className }))}
      {...props}
    >
      <div>{icon ?? <span>💡</span>}</div>
      <div>{children}</div>
    </div>
  );
};

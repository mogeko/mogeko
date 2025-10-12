import NextImage from "next/image";
import { cn } from "@/lib/utils";

export const Avatar: React.FC<
  React.ComponentPropsWithoutRef<typeof NextImage>
> = ({ className, height, width, ...props }) => {
  return (
    <NextImage
      className={cn("inline-block relative w-[4ch] h-2", className)}
      width={width ?? (29.95 / 3) * 4}
      height={height ?? 43}
      {...props}
    />
  );
};

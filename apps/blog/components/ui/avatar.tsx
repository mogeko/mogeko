import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { forwardRef } from "react";

export const Avatar = forwardRef<
  React.ComponentRef<typeof NextImage>,
  React.ComponentPropsWithoutRef<typeof NextImage>
>(({ className, height, width, ...props }, ref) => {
  return (
    <NextImage
      ref={ref}
      className={cn("inline-block relative w-[4ch] h-2", className)}
      width={width ?? (29.95 / 3) * 4}
      height={height ?? 43}
      {...props}
    />
  );
});
Avatar.displayName = "Avatar";

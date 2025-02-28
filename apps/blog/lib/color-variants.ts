import { type VariantProps, cva } from "class-variance-authority";

export const colorVariants = cva([], {
  variants: {
    color: {
      blue: ["text-notion-blue"],
      blue_background: ["bg-notion-blue"],
      brown: ["text-notion-brown"],
      brown_background: ["bg-notion-"],
      gray: ["text-notion-gray"],
      gray_background: ["bg-notion-gray"],
      green: ["text-notion-green"],
      green_background: ["bg-notion-green"],
      orange: ["text-notion-orange"],
      orange_background: ["bg-notion-orange"],
      pink: ["text-notion-pink"],
      pink_background: ["bg-notion-pink"],
      purple: ["text-notion-purple"],
      purple_background: ["bg-notion-purple"],
      red: ["text-notion-red"],
      red_background: ["bg-notion-red"],
      yellow: ["text-notion-yellow"],
      yellow_background: ["bg-notion-yellow"],
      default: null,
      default_background: null,
    },
    defaultVariants: {
      color: "default",
    },
  },
});

export type ColorVariantProps = VariantProps<typeof colorVariants>;

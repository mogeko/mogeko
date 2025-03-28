import { type VariantProps, cva } from "class-variance-authority";

export const colorVariants = cva([], {
  variants: {
    color: {
      blue: ["text-blue-700"],
      blue_background: ["bg-blue-300"],
      brown: ["text-amber-700"],
      brown_background: ["bg-amber-300"],
      gray: ["text-gray-700"],
      gray_background: ["bg-gray-300"],
      green: ["text-green-700"],
      green_background: ["bg-green-300"],
      orange: ["text-orange-700"],
      orange_background: ["bg-orange-300"],
      pink: ["text-pink-700"],
      pink_background: ["bg-pink-300"],
      purple: ["text-purple-700"],
      purple_background: ["bg-purple-300"],
      red: ["text-red-700"],
      red_background: ["bg-red-300"],
      yellow: ["text-yellow-700"],
      yellow_background: ["bg-yellow-300"],
      default: null,
      default_background: null,
    },
    defaultVariants: {
      color: "default",
    },
  },
});

export type ColorVariantProps = VariantProps<typeof colorVariants>;

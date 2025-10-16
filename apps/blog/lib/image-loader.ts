"use client";

import type { ImageLoader } from "next/image";

// Need to set `images.remotePatterns` in `next.config.js` to allow loading images from ImageKit
const IMAGEKIT_BASE_URL = "https://ik.imagekit.io/mogeko";

// Docs: https://imagekit.io/docs/image-transformation
export const imageKitLoader: ImageLoader = ({ src, width, quality }) => {
  const params = [`w-${width}`, `q-${quality || 80}`];

  return `${IMAGEKIT_BASE_URL}${src}?tr=${params.join(",")}`;
};

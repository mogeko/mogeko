"use client";

import type { ImageLoader } from "next/image";

// Need to set `images.remotePatterns` in `next.config.js` to allow loading images from Cloudinary
const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/mogeko/image/upload";

export const cloudinaryLoader: ImageLoader = ({ src, width, quality }) => {
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];

  return `${CLOUDINARY_BASE_URL}/${params.join(",")}/${src}`;
};

export function handleError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.target as HTMLImageElement;

  // Since the Cloudinary CDN is not always available in China, we use ImageKit
  // as a fallback. The image is stored in Cloudinary and proxied through ImageKit.
  target.src = `https://ik.imagekit.io/mogeko/${target.src}`;
  target.onerror = null; // prevents looping
}

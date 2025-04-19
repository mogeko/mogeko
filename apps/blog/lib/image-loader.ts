"use client";

import type { ImageLoaderProps } from "next/image";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/mogeko/image/upload";

export function imageLoader({ src, width, quality }: ImageLoaderProps) {
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];

  return `${CLOUDINARY_BASE_URL}/${params.join(",")}/${src}`;
}

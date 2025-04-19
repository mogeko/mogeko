import { Buffer } from "node:buffer";
import { subtle } from "node:crypto";
import { parse } from "node:path";
import { URL } from "node:url";
import { TextEncoder } from "node:util";
import { imageLoader } from "@/lib/image-loader";
import { v2 as cloudinary } from "cloudinary";
import NextImage from "next/image";

import "server-only";

export const Image: React.FC<
  Omit<React.ComponentProps<typeof NextImage>, "src"> & { src: string }
> = async ({ src, ...props }) => {
  const { public_id, width, height } = await cloudinary.uploader.upload(src, {
    public_id: `${await sha1(new URL(src).pathname)}-${parse(src).name}`,
    tags: ["notion"],
    folder: "notion-images",
    overwrite: false,
  });

  const h = props.width ? (height / width) * Number(props.width) : height;

  return (
    <NextImage height={h} loader={imageLoader} src={public_id} {...props} />
  );
};

export async function sha1(plaintext: string): Promise<string> {
  const utf8 = new TextEncoder().encode(plaintext);

  return await subtle.digest("SHA-1", utf8).then((hash) => {
    return Buffer.from(hash).toString("hex");
  });
}

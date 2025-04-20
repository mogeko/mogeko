import { Buffer } from "node:buffer";
import { subtle } from "node:crypto";
import { parse } from "node:path";
import { URL } from "node:url";
import { TextEncoder } from "node:util";
import { cloudinaryLoader } from "@/lib/image-loader";
import { v2 as cloudinary } from "cloudinary";
import { unstable_cache as cache } from "next/cache";
import NextImage from "next/image";

import "server-only";

export const Image: React.FC<
  Omit<React.ComponentProps<typeof NextImage>, "src"> & { src: string }
> = async ({ alt, src, ...props }) => {
  const fileName = parse(src).name;
  const { public_id, width, height } = await cloudinary.uploader.upload(src, {
    folder: "notion-images",
    public_id: `${await sha1(new URL(src).pathname)}-${fileName}`,
    tags: ["notion"],
    overwrite: false,
  });

  return (
    <NextImage
      height={props.width ? (height / width) * Number(props.width) : height}
      loader={cloudinaryLoader}
      src={public_id}
      alt={alt.length ? alt : fileName}
      {...props}
    />
  );
};

const sha1 = cache(async (plaintext: string): Promise<string> => {
  const utf8 = new TextEncoder().encode(plaintext);

  return await subtle.digest("SHA-1", utf8).then((hash) => {
    return Buffer.from(hash).toString("hex");
  });
});

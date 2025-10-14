import { Buffer } from "node:buffer";
import { subtle } from "node:crypto";
import { parse } from "node:path";
import { unstable_cache as cache } from "next/cache";
import NextImage from "next/image";
import { imageKitLoader } from "@/lib/image-loader";

import "server-only";

export const Image: React.FC<
  Omit<React.ComponentProps<typeof NextImage>, "src"> & { src: string }
> = async ({ alt, src, ...props }) => {
  const { width, height, name, filePath } = await upload(src);

  return (
    <NextImage
      height={props.width ? (height / width) * Number(props.width) : height}
      loader={imageKitLoader}
      src={filePath}
      alt={alt.length ? alt : name}
      {...props}
    />
  );
};

export async function upload(src: string): Promise<ImageResponse> {
  const priveKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!priveKey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not defined");
  }

  const uploader = cache(async () => {
    const formData = new FormData();

    formData.append("file", src);
    formData.append(
      "fileName",
      `${await sha1(new URL(src).pathname)}-${parse(src).name}`,
    );
    formData.append("folder", "notion-images");
    formData.append("tags", "notion");

    const res = await fetch("https://upload.imagekit.io/api/v2/files/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${await base64(`${priveKey}:`)}`,
        ContentType: "multipart/form-data",
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Failed to upload image: ${res.statusText}`);
    }

    return (await res.json()) as Promise<ImageResponse>;
  });

  return await uploader();
}

const base64 = cache(async (plaintext: string): Promise<string> => {
  return Buffer.from(plaintext).toString("base64");
});

const sha1 = cache(async (plaintext: string): Promise<string> => {
  const utf8 = new TextEncoder().encode(plaintext);

  return await subtle.digest("SHA-1", utf8).then((hash) => {
    return Buffer.from(hash).toString("hex");
  });
});

type ImageResponse = {
  fileId: string;
  name: string;
  url: string;
  height: number;
  width: number;
  filePath: string;
};

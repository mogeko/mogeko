import { Buffer } from "node:buffer";
import { subtle } from "node:crypto";
import { parse } from "node:path";
import { unstable_cache as cache } from "next/cache";
import NextImage from "next/image";
import { imageKitLoader } from "@/lib/image-loader";
import { type UploadResponse, upload } from "@/lib/imagekit";
import { redis } from "@/lib/redis";

export const Image: React.FC<
  Omit<React.ComponentProps<typeof NextImage>, "src"> & { src: string }
> = async ({ alt, src, ...props }) => {
  const hash = await sha1(new URL(src).pathname);

  let cached = await redis.hgetall<ImageCache>(`image:${hash}`);

  if (!cached) {
    const { width, height, name, filePath } = await upload({
      file: src,
      fileName: `${hash}-${parse(src).name}`,
      folder: "notion-images",
      tags: ["notion"],
      useUniqueFileName: false,
      overwriteFile: true,
    });

    cached = { width, height, name, filePath };

    await redis.hset(`image:${hash}`, cached);
  }

  const { filePath, name, width, height } = cached;

  return (
    <NextImage
      loader={imageKitLoader}
      height={props.width ? (height / width) * Number(props.width) : height}
      src={filePath}
      alt={alt.length ? alt : name}
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

type ImageCache = Pick<
  UploadResponse,
  "name" | "filePath" | "width" | "height"
>;

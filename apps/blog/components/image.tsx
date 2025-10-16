import { parse } from "node:path/posix";
import { URL } from "node:url";
import { unstable_cache as cache } from "next/cache";
import NextImage from "next/image";
import { imageKitLoader } from "@/lib/image-loader";
import { type UploadResponse, upload } from "@/lib/imagekit";
import { redis } from "@/lib/redis";

export const Image: React.FC<
  Omit<React.ComponentProps<typeof NextImage>, "src"> & { src: string }
> = async ({ alt, src, ...props }) => {
  const { pathname } = new URL(src);
  const { name: imageName, dir } = parse(pathname);
  const hkey = `notion-images:${pathname}`;

  // Cache the `redis.hgetall` call to save quota and reduce latency.
  let cached = await cache(redis.hgetall)<ImageCache>(hkey);

  if (!cached) {
    const { width, height, name, filePath } = await upload({
      file: src,
      fileName: imageName,
      folder: `notion-images/${dir}`,
      tags: ["notion"],
      useUniqueFileName: false,
      overwriteFile: true,
    });

    cached = { width, height, name, filePath };

    await redis.hset(hkey, cached);
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

type ImageCache = Pick<
  UploadResponse,
  "name" | "filePath" | "width" | "height"
>;

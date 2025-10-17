import { basename, parse } from "node:path/posix";
import { URL } from "node:url";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import NextImage from "next/image";
import { after } from "next/server";
import { imageKitLoader } from "@/lib/image-loader";
import { type UploadResponse, upload } from "@/lib/imagekit";
import { redis } from "@/lib/redis";

export const Image: React.FC<
  Omit<React.ComponentProps<typeof NextImage>, "src"> & { src: string }
> = async ({ alt, src: file, ...props }) => {
  const { name: fileName, dir } = parse(new URL(file).pathname);
  const [key, folder] = ((path: string) => {
    return [`notion-images:${path}`, `/notion-images/${path}`];
  })(basename(dir));

  let cached = await cache(redis.json.get, [], {
    tags: [key],
  })<UploadResponse>(key);

  if (!cached) {
    cached = await upload({ file, fileName, folder, useUniqueFileName: false });

    await redis.json.set(key, "$", cached);

    after(() => revalidateTag(key));
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

import { cacheLife, cacheTag } from "next/cache";
import sharp from "sharp";
import { NotFoundError } from "@/lib/errors";
import { lookup } from "@/lib/mime";
import { redis } from "@/lib/redis";

export async function setImage<T extends ImageResp>(
  uploader: (buff: ArrayBufferLike, meta: ImageResp) => Promise<T>,
  options: Options,
): Promise<T>;
export async function setImage(options: Options): Promise<ImageResp>;
export async function setImage<T extends ImageResp>(
  uploader: Options | ((buff: ArrayBufferLike, meta: ImageResp) => Promise<T>),
  options?: Options,
): Promise<T> {
  if (!(uploader instanceof Function) || !options) {
    return setImage<T>(async (_, meta) => meta as T, uploader as Options);
  } else {
    const res = await fetch(options.url);

    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status}`);
    }

    const buffer = await res.arrayBuffer();
    const image = sharp(buffer);
    const { height, width, format } = await image.metadata();
    const blur = image.resize(10).blur();
    const mimeType = lookup(format) || "application/octet-stream";
    const blurDataURL = await blur.toBuffer().then((data) => {
      return `data:${mimeType};base64,${data.toString("base64")}`;
    });
    const { fileName: name, key } = options;

    const meta = { mimeType, name, height, width, blurDataURL };

    const data = await uploader(buffer, meta);

    await redis.hset(`image:${key}`, data);

    return data;
  }
}

export async function getImage<T extends ImageResp>(key: string): Promise<T> {
  "use cache";

  const data = await redis.hgetall<T>(`image:${key}`);

  if (!data) {
    throw new NotFoundError(`No record found with key: ${key}`);
  }

  cacheTag("image", data.name, key);
  cacheLife("max");

  return data;
}

type Options = {
  fileName: string;
  url: string | URL | Request;
  key: string;
};

export type ImageResp = {
  name: string;
  height: number;
  width: number;
  blurDataURL: string;
  mimeType?: string;
};

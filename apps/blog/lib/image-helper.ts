import { redis } from "bun";
import { cacheLife, cacheTag } from "next/cache";
import sharp from "sharp";
import * as v from "valibot";
import { NotFoundError } from "@/lib/errors";
import { lookup } from "@/lib/mime";

export async function setImage<T extends DataResp>(
  uploader: (buff: ArrayBufferLike, meta: DataResp) => Promise<T>,
  options: Options,
): Promise<T>;
export async function setImage(options: Options): Promise<DataResp>;
export async function setImage<T extends DataResp>(
  uploader: Options | ((buff: ArrayBufferLike, meta: DataResp) => Promise<T>),
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

const DataSchema = v.object({
  name: v.string(),
  blurDataURL: v.string(),
  height: v.pipe(v.string(), v.decimal(), v.transform(Number)),
  width: v.pipe(v.string(), v.decimal(), v.transform(Number)),
  mimeType: v.optional(v.string()),
  filePath: v.optional(v.string()),
});

export async function getImage(key: string): Promise<DataResp> {
  "use cache";

  const hash = await redis.hgetall(`image:${key}`);

  if (!Object.keys(hash).length) {
    throw new NotFoundError(`No record found with key: ${key}`);
  }

  const data = v.parse(DataSchema, hash);

  cacheTag("image", data.name, key);
  cacheLife("max");

  return data;
}

export type DataResp = v.InferOutput<typeof DataSchema>;

type Options = {
  fileName: string;
  url: string | URL | Request;
  key: string;
};

import { Buffer } from "node:buffer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { lookup } from "mime-types";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { after } from "next/server";
import sharp from "sharp";
import { redis } from "@/lib/redis";
import { BUCKET_NAME, s3 } from "@/lib/s3";

export async function upload(options: Options): Promise<ImageParamWithPath> {
  const filePath = `${options.key}/${options.fileName}`;

  return await setImageParams<ImageParamWithPath>(async (buffer, meta) => {
    const { ETag: _eTag } = await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Body: buffer,
        Key: filePath,
        ContentType: meta.mimeType,
        Metadata: {
          uploadedBy: "mogeko-blog",
          height: meta.height.toString(),
          width: meta.width.toString(),
          blurDataURL: meta.blurDataURL,
        },
      }),
    );

    return { ...meta, filePath };
  }, options);
}

export async function setImageParams<T extends ImageParam>(
  uploader: (buff: Buffer, meta: ImageParam) => Promise<T>,
  options: Options,
): Promise<T>;
export async function setImageParams(options: Options): Promise<ImageParam>;
export async function setImageParams<T extends ImageParam>(
  uploader: Options | ((buff: Buffer, meta: ImageParam) => Promise<T>),
  options?: Options,
): Promise<T> {
  if (!(uploader instanceof Function) || !options) {
    return setImageParams<T>(async (_, meta) => meta as T, uploader as Options);
  } else {
    const res = await fetch(options.url);

    if (!res.ok) {
      if ((await res.text()).match("Request has expired")) {
        after(() => revalidateTag("notion"));

        throw new Error("Notion image request has expired, revalidating tag");
      }

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

    const data = await uploader(Buffer.from(buffer), meta);

    await redis.hset(`${BUCKET_NAME ?? "images"}:${key}`, data);

    after(() => revalidateTag(key));

    return data;
  }
}

export async function getImageParams<T extends ImageParamWithPath>(
  key: string,
): Promise<T | null> {
  const bucket = BUCKET_NAME ?? "images";

  // Cache the `redis.hgetall` call to save quota and reduce latency
  return await cache(redis.hgetall, [], { tags: [bucket, key] })<T>(
    `${bucket}:${key}`,
  );
}

type Options = {
  fileName: string;
  url: string | URL | Request;
  key: string;
};

export type ImageParam = {
  name: string;
  height: number;
  width: number;
  mimeType?: string;
  blurDataURL: string;
};

export type ImageParamWithPath = {
  filePath: string;
} & ImageParam;

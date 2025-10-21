import { Buffer } from "node:buffer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { lookup } from "mime-types";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { after } from "next/server";
import sharp from "sharp";
import { redis } from "@/lib/redis";
import { BUCKET_NAME, s3 } from "@/lib/s3";

export async function upload(options: Options): Promise<ImageMetaWithPath> {
  const filePath = `${options.id}/${options.fileName}`;

  return await setMeta<ImageMetaWithPath>(async (buffer, meta) => {
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

export async function setMeta<T extends ImageMeta>(
  uploader: (buff: Buffer, meta: ImageMeta) => Promise<T>,
  options: Options,
): Promise<T>;
export async function setMeta(options: Options): Promise<ImageMeta>;
export async function setMeta<T extends ImageMeta>(
  uploader: Options | ((buff: Buffer, meta: ImageMeta) => Promise<T>),
  options?: Options,
): Promise<T> {
  if (!(uploader instanceof Function) || !options) {
    return setMeta<T>(async (_, meta) => meta as T, uploader as Options);
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
    const { fileName: name, id } = options;

    const meta = { mimeType, name, height, width, blurDataURL };

    const data = await uploader(Buffer.from(buffer), meta);

    await redis.hset(`${BUCKET_NAME ?? "images"}:${id}`, data);

    after(() => revalidateTag(id));

    return data;
  }
}

export async function getMeta<T extends ImageMetaWithPath>(
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
  id: string;
};

export type ImageMeta = {
  name: string;
  height: number;
  width: number;
  mimeType?: string;
  blurDataURL: string;
};

export type ImageMetaWithPath = {
  filePath: string;
} & ImageMeta;

import { Buffer } from "node:buffer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { lookup } from "mime-types";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { after } from "next/server";
import sharp from "sharp";
import { redis } from "@/lib/redis";
import { BUCKET_NAME, s3 } from "@/lib/s3";

export async function upload(options: Options): Promise<ImageMetaWithPath> {
  const filePath = `${options.key}/${options.fileName}`;

  return await setImageParams<ImageMetaWithPath>(async (buffer, meta) => {
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
        after(() => updateTag("notion"));

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

    after(() => updateTag(key));

    return data;
  }
}

export async function getImageParams<T extends ImageMetaWithPath>(
  key: string,
): Promise<T | null> {
  "use cache";

  const bucket = BUCKET_NAME ?? "images";

  cacheTag(bucket, key);
  cacheLife("max");

  return await redis.hgetall<T>(`${bucket}:${key}`);
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

export type ImageMetaWithPath = {
  filePath: string;
} & ImageParam;

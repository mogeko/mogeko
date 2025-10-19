import { unstable_cache as cache, revalidateTag } from "next/cache";
import { after } from "next/server";
import sharp from "sharp";
import { redis } from "@/lib/redis";
import { BUCKET_NAME as Bucket, PutObjectCommand, s3 } from "@/lib/s3";

export async function upload(opts: UploadOptions): Promise<UploadResponse> {
  const res = await fetch(opts.url);

  if (!res.ok) {
    throw new Error(`Response status: ${res.status}`);
  }

  const buffer = await res.arrayBuffer();
  const image = sharp(buffer);
  const { height, width, format } = await image.metadata();
  const blur = image.resize(10).blur();
  const blurDataURL = await blur.toBuffer().then((data) => {
    return `data:image/${format};base64,${data.toString("base64")}`;
  });
  // biome-ignore format: Allow using multiple declarations in one line
  const name = opts.fileName, filePath = `${opts.id}/${name}`;

  const { ETag: eTag } = await s3.send(
    new PutObjectCommand({ Bucket, Key: filePath, Body: Buffer.from(buffer) }),
  );

  const data = { height, width, name, filePath, format, blurDataURL, eTag };

  await redis.hset(`${Bucket ?? "images"}:${opts.id}`, data);

  after(() => revalidateTag(opts.id));

  return data;
}

export async function getUpload<T extends UploadResponse>(
  key: string,
): Promise<T | null> {
  const bucket = Bucket ?? "images";

  // Cache the `redis.hgetall` call to save quota and reduce latency
  return await cache(redis.hgetall, [], { tags: [bucket, key] })<T>(
    `${bucket}:${key}`,
  );
}

export type UploadOptions = {
  url: string | URL | Request;
  fileName: string;
  id: string;
};

export type UploadResponse = {
  height: number;
  width: number;
  filePath: string;
  name: string;
  format: string;
  blurDataURL: string;
  eTag?: string;
};

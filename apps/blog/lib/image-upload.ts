import { PutObjectCommand } from "@aws-sdk/client-s3";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { after } from "next/server";
import sharp from "sharp";
import { redis } from "@/lib/redis";
import { BUCKET_NAME, s3 } from "@/lib/s3";

export async function upload(opts: UploadOptions): Promise<UploadResponse> {
  const res = await fetch(opts.url);

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
  const blurDataURL = await blur.toBuffer().then((data) => {
    return `data:image/${format};base64,${data.toString("base64")}`;
  });
  const name = opts.fileName;
  const filePath = `${opts.id}/${name}`;
  const mimeType = `image/${format}`;

  const { ETag: eTag } = await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Body: Buffer.from(buffer),
      Key: filePath,
      ContentType: mimeType,
    }),
  );

  const data = { height, width, name, filePath, mimeType, blurDataURL, eTag };

  await redis.hset(`${BUCKET_NAME ?? "images"}:${opts.id}`, data);

  after(() => revalidateTag(opts.id));

  return data;
}

export async function getUpload<T extends UploadResponse>(
  key: string,
): Promise<T | null> {
  const bucket = BUCKET_NAME ?? "images";

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
  mimeType?: string;
  blurDataURL: string;
  eTag?: string;
};

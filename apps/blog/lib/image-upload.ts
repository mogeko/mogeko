import sharp from "sharp";
import { redis } from "@/lib/redis";
import { BUCKET_NAME, PutObjectCommand, s3 } from "@/lib/s3";

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
  const { fileName: name, folder } = opts;
  const [Bucket, filePath] = [BUCKET_NAME, `${folder}/${name}`];

  const { ETag: eTag } = await s3.send(
    new PutObjectCommand({ Bucket, Key: filePath, Body: Buffer.from(buffer) }),
  );

  const data = { height, width, name, filePath, format, blurDataURL, eTag };

  await redis.hset(`${Bucket ?? "images"}:${folder}`, data);

  return data;
}

export type UploadOptions = {
  url: string | URL | Request;
  fileName: string;
  folder: string;
};

export type UploadResponse = {
  height: number;
  width: number;
  filePath: string;
  name?: string;
  format: string;
  blurDataURL: string;
  eTag?: string;
};

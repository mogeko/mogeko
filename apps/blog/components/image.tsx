import { subtle } from "node:crypto";
import { parse } from "node:path/posix";
import { URL } from "node:url";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import NextImage from "next/image";
import { NotFoundError } from "@/lib/errors";
import { getImage, type ImageResp, setImage } from "@/lib/image-helper";
import { BUCKET_NAME, s3 } from "@/lib/s3";

export type NotionImageResp = ImageResp & { filePath: string };

export const Image: React.FC<
  React.ComponentProps<typeof NextImage> & { notionId?: string }
> = async ({ alt, src, notionId, ...props }) => {
  const url = new URL(src);
  const key = notionId || (await sha1(url.toString()));
  const { name: fileName } = parse(url.pathname);

  try {
    const data = await getImage<ImageResp | NotionImageResp>(key).catch(
      (err: unknown) => {
        if (NotFoundError.isNotFoundError(err)) {
          return (notionId ? upload : setImage)({ key, url, fileName });
        } else {
          throw err;
        }
      },
    );

    const { height, width, name, blurDataURL, mimeType, ...rest } = data;

    return (
      <NextImage
        src={"filePath" in rest ? `/image/${rest.filePath}` : src}
        height={props.width ? (height / width) * Number(props.width) : height}
        alt={alt.length ? alt : name}
        unoptimized={mimeType === "image/svg+xml"}
        placeholder="blur"
        blurDataURL={blurDataURL}
        {...props}
      />
    );
  } catch (_err: unknown) {
    // biome-ignore lint: Rollback to unoptimized original image
    return <img src={url.toString()} alt={alt} />;
  }
};

export async function sha1(plaintext: string): Promise<string> {
  const utf8 = new TextEncoder().encode(plaintext);

  return await subtle.digest("SHA-1", utf8).then((hash) => {
    return Buffer.from(hash).toString("hex");
  });
}

async function upload(
  options: Parameters<typeof setImage>[number],
): Promise<NotionImageResp> {
  const filePath = `${options.key}/${options.fileName}`;

  return await setImage(async (buffer, meta) => {
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

import { basename, parse } from "node:path/posix";
import { URL } from "node:url";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import NextImage from "next/image";
import { getImage, type ImageResp, setImage } from "@/lib/image-helper";
import { BUCKET_NAME, s3 } from "@/lib/s3";

export const Image: React.FC<
  React.ComponentProps<typeof NextImage> & { uploadId?: string }
> = async ({ alt, src, uploadId, ...props }) => {
  const url = new URL(src);
  const { name: fileName, dir } = parse(url.pathname);
  const key = uploadId || basename(dir);

  try {
    const data: NotionImageResp | ImageResp = await getImage(key).then(
      (data) => {
        return data || upload({ key, url, fileName });
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
  } catch (_err) {
    // biome-ignore lint: Rollback to unoptimized original image
    return <img src={url.toString()} alt={alt} />;
  }
};

export type NotionImageResp = ImageResp & { filePath: string };

export async function upload(
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

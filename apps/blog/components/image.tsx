import { parse } from "node:path/posix";
import { s3 } from "bun";
import NextImage from "next/image";
import { NotFoundError } from "@/lib/errors";
import { type DataResp, getImage, setImage } from "@/lib/image-helper";

export const Image: React.FC<
  React.ComponentProps<typeof NextImage> & { notionId?: string; src: string }
> = async ({ alt, src, notionId, ...props }) => {
  const url = new URL(src);
  const key = notionId || (await sha1(url.toString()));
  const { name: fileName } = parse(url.pathname);

  try {
    const data = await getImage(key).catch((err: unknown) => {
      if (NotFoundError.isNotFoundError(err)) {
        return (notionId ? upload : setImage)({ key, url, fileName });
      } else {
        throw err;
      }
    });

    const { height, width, name, blurDataURL, mimeType, filePath } = data;
    const image_domain = process.env.APP_IMAGE_DOMAIN;
    const image_base_url = image_domain ? `https://${image_domain}` : "/image";

    return (
      <NextImage
        src={filePath ? `${image_base_url}/${filePath}` : src}
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
  return Buffer.from(
    await crypto.subtle.digest("SHA-1", new TextEncoder().encode(plaintext)),
  ).toString("hex");
}

export async function upload(
  options: Parameters<typeof setImage>[number],
): Promise<DataResp> {
  const filePath = `${options.key}/${options.fileName}`;

  return await setImage(async (buffer, meta) => {
    await s3.write(filePath, buffer, { type: meta.mimeType });

    return { ...meta, filePath };
  }, options);
}

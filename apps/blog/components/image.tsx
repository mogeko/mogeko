import { basename, parse } from "node:path/posix";
import { URL } from "node:url";
import NextImage from "next/image";
import { getUpload, upload } from "@/lib/image-upload";

export const Image: React.FC<
  React.ComponentProps<typeof NextImage> & { imageId?: string }
> = async ({ alt, src, imageId, ...props }) => {
  const url = new URL(src);
  const { name: fileName, dir } = parse(url.pathname);
  const id = imageId || basename(dir);

  let cached = await getUpload(id);

  if (!cached) {
    cached = await upload({ url, fileName, id });
  }

  const { height, width, filePath, name, blurDataURL } = cached;

  return (
    <NextImage
      src={`/image/${filePath}`}
      height={props.width ? (height / width) * Number(props.width) : height}
      alt={alt.length ? alt : name}
      placeholder="blur"
      blurDataURL={blurDataURL}
      {...props}
    />
  );
};

import { basename, parse } from "node:path/posix";
import { URL } from "node:url";
import NextImage from "next/image";
import { getMeta, upload } from "@/lib/image-upload";

export const Image: React.FC<
  React.ComponentProps<typeof NextImage> & { uploadId?: string }
> = async ({ alt, src, uploadId, ...props }) => {
  const url = new URL(src);
  const { name: fileName, dir } = parse(url.pathname);
  const id = uploadId || basename(dir);

  try {
    const { height, width, filePath, name, blurDataURL } = await getMeta(
      id,
    ).then((data) => {
      return data || upload({ id, url, fileName });
    });

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
  } catch (_err) {
    // biome-ignore lint: Rollback to unoptimized original image
    return <img src={url.toString()} alt={alt} />;
  }
};

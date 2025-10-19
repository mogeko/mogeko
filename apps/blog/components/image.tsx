import { basename, parse } from "node:path/posix";
import { URL } from "node:url";
import NextImage from "next/image";
import { getUpload, upload } from "@/lib/image-upload";

export const Image: React.FC<
  Omit<React.ComponentProps<typeof NextImage>, "src"> & { src: string }
> = async ({ alt, src: url, id, ...props }) => {
  const { name: fileName, dir } = parse(new URL(url).pathname);
  const key = id ?? basename(dir);

  let cached = await getUpload(key);

  if (!cached) {
    cached = await upload({ url, fileName, id: key });
  }

  const { height, width, filePath, name } = cached;

  return (
    <NextImage
      height={props.width ? (height / width) * Number(props.width) : height}
      src={`/image/${filePath}`}
      alt={alt.length ? alt : name}
      {...props}
    />
  );
};

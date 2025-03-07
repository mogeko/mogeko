import { parse } from "node:path";
import { URL } from "node:url";
import { getPreviewImage } from "@/lib/preview-images";
import NextImage from "next/image";

export const Image: React.FC<
  Omit<React.ComponentProps<typeof NextImage>, "src"> & { src: string }
> = async ({ src, alt, width, ...props }) => {
  const imgUrl = new URL(src);
  const previewImage = await getPreviewImage(imgUrl);
  const { name } = parse(imgUrl.pathname);

  if (!previewImage) {
    return <NextImage src={src} alt={alt.length ? alt : name} {...props} />;
  }

  const { originalHeight, originalWidth, dataURIBase64 } = previewImage;
  const aspectRatio = originalHeight / originalWidth;

  return (
    <NextImage
      src={src}
      blurDataURL={dataURIBase64}
      height={width ? aspectRatio * Number(width) : originalHeight}
      width={width ? Number(width) : originalWidth}
      alt={alt.length ? alt : name}
      {...props}
    />
  );
};

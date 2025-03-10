import { parse } from "node:path";
import { URL } from "node:url";
import { getPreviewImage } from "@/lib/preview-images";
import NextImage from "next/image";

export const Image: React.FC<
  Omit<React.ComponentProps<typeof NextImage>, "src"> & { src: string }
> = async ({ alt, width, ...props }) => {
  const imgUrl = new URL(props.src);
  const previewImage = await getPreviewImage(imgUrl);

  if (!previewImage) {
    // setTimeout(() => revalidateTag(imgUrl.pathname), 3000);

    // return <Image alt={alt} width={width} {...props} />;
    return;
  }

  const { name } = parse(imgUrl.pathname);
  const { originalHeight, originalWidth, dataURIBase64 } = previewImage;
  const aspectRatio = originalHeight / originalWidth;

  return (
    <NextImage
      blurDataURL={dataURIBase64}
      height={width ? aspectRatio * Number(width) : originalHeight}
      width={width ? Number(width) : originalWidth}
      alt={alt.length ? alt : name}
      {...props}
    />
  );
};

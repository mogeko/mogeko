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
    return <img src={props.src} alt={alt} width={width} />;
  }

  const { name } = parse(imgUrl.pathname);
  const { height: h, width: w, blur } = previewImage;
  const aspectRatio = h / w;

  return (
    <NextImage
      height={width ? aspectRatio * Number(width) : h}
      width={width ? Number(width) : w}
      blurDataURL={blur}
      placeholder="blur"
      alt={alt.length ? alt : name}
      unoptimized
      {...props}
    />
  );
};

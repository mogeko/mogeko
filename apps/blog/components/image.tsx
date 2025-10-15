import { Buffer } from "node:buffer";
import { subtle } from "node:crypto";
import { parse } from "node:path";
import { unstable_cache as cache } from "next/cache";
import NextImage from "next/image";
import { imageKitLoader } from "@/lib/image-loader";
import { upload } from "@/lib/imagekit";

export const Image: React.FC<
  Omit<React.ComponentProps<typeof NextImage>, "src"> & { src: string }
> = async ({ alt, src, ...props }) => {
  const hash = await sha1(new URL(src).pathname);

  const { width, height, name, filePath } = await upload({
    file: src,
    fileName: `${hash}-${parse(src).name}`,
    folder: "notion-images",
    tags: ["notion"],
  });

  return (
    <NextImage
      height={props.width ? (height / width) * Number(props.width) : height}
      loader={imageKitLoader}
      src={filePath}
      alt={alt.length ? alt : name}
      {...props}
    />
  );
};

const sha1 = cache(async (plaintext: string): Promise<string> => {
  const utf8 = new TextEncoder().encode(plaintext);

  return await subtle.digest("SHA-1", utf8).then((hash) => {
    return Buffer.from(hash).toString("hex");
  });
});

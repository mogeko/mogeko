import { unstable_cache as cache } from "next/cache";
import sharp from "sharp";

type Metadate = { width: number; height: number; blur: string };

export async function getPreviewImage(url: URL) {
  const createPreviewImage = cache(
    async (): Promise<Metadate> => {
      return await fetch(url)
        .then((res) => res.arrayBuffer())
        .then(lqip);
    },
    [url.pathname],
    {
      revalidate: 60 * 60 * 24 * 30, // 1 day
      tags: [url.pathname, "preview-image"],
    },
  );

  try {
    return await createPreviewImage();
  } catch (err: any) {
    console.warn("Failed to create preview image", url, err.message);

    return null;
  }
}

async function lqip(input: ArrayBuffer): Promise<Metadate> {
  const image = sharp(input).rotate();

  const { width, height } = await image.metadata();

  const { data, info } = await image
    .resize(Math.min(width ?? 0, 16), Math.min(height ?? 0, 16), {
      fit: sharp.fit.inside,
    })
    .webp({ quality: 20, alphaQuality: 20, smartSubsample: true })
    .toBuffer({ resolveWithObject: true });

  return {
    width: width ?? info.width,
    height: height ?? info.height,
    blur: `data:image/webp;base64,${data.toString("base64")}`,
  };
}

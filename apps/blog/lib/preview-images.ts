import lqip, { type LqipModernOutput } from "lqip-modern";
import { unstable_cache } from "next/cache";

type Metadate = LqipModernOutput["metadata"];

export async function getPreviewImage(url: URL, retry = 0) {
  if (retry >= 3) return null;

  const createPreviewImage = unstable_cache(
    async (): Promise<Metadate> => {
      const body = await (await fetch(url)).arrayBuffer();
      const { metadata } = await lqip(body);

      return metadata;
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
    console.warn(
      `Failed to create preview image (retry: ${retry})`,
      url,
      err.message,
    );

    return await new Promise<Metadate | null>((resolve) => {
      setTimeout(() => {
        resolve(getPreviewImage(url, retry + 1));
      }, 3000);
    });
  }
}

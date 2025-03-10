import lqip, { type LqipModernOutput } from "lqip-modern";
import { unstable_cache } from "next/cache";

export async function getPreviewImage(url: URL, retry = 0) {
  if (retry >= 3) return null;

  const createPreviewImage = unstable_cache(
    async (): Promise<LqipModernOutput["metadata"] | null> => {
      try {
        const body = await (await fetch(url)).arrayBuffer();
        const { metadata } = await lqip(body);

        return metadata;
      } catch (err: any) {
        console.warn(
          `Failed to create preview image (retry: ${retry})`,
          url,
          err.message,
        );

        await new Promise((resolve) => setTimeout(resolve, 3000));

        return getPreviewImage(url, retry + 1);
      }
    },
    [url.pathname],
    {
      revalidate: 60 * 60 * 24 * 30, // 1 day
      tags: [url.pathname, "preview-image"],
    },
  );

  return createPreviewImage();
}

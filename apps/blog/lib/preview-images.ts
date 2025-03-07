import lqip from "lqip-modern";
import { unstable_cache } from "next/cache";

export async function getPreviewImage(url: URL) {
  const createPreviewImage = unstable_cache(
    async () => {
      try {
        const body = await (await fetch(url)).arrayBuffer();
        const { metadata } = await lqip(body);

        return metadata;
      } catch (err: any) {
        console.warn("failed to create preview image", url, err.message);
        return null;
      }
    },
    [url.pathname],
    {
      revalidate: 60 * 60 * 24 * 30, // 1 day
    },
  );

  return createPreviewImage();
}

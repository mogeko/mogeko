import { createElement } from "react";
import { OgTemplate } from "@/components/og-templates/post";
import { ImageResponse } from "@vercel/og";
import { loadFonts, getEntries } from "@/utils";
import type { CollectionEntry } from "astro:content";
import type { GetStaticPaths, APIRoute } from "astro";

export const GET: APIRoute<{
  entry: CollectionEntry<"posts">;
}> = async ({ props: { entry } }) => {
  const html = createElement(OgTemplate, { data: entry.data });

  try {
    return new ImageResponse(html, {
      fonts: [
        {
          name: "SmileySans",
          data: (await loadFonts()).smileySans,
          weight: 400,
          style: "normal",
        },
      ],
    });
  } catch (error: any) {
    console.error(error.message);

    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
};

export const getStaticPaths = (async () => {
  return (await getEntries()).map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}) satisfies GetStaticPaths;

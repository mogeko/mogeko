import { createElement } from "react";
import { OgTemplate } from "@/components/og-templates/post";
import { ImageResponse } from "@vercel/og";
import { getCollection } from "astro:content";
import path from "node:path";
import fs from "node:fs/promises";
import type { GetStaticPaths } from "astro";

export async function GET({ props: { entry } }: Props) {
  try {
    return new ImageResponse(createElement(OgTemplate, { data: entry.data }), {
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
}

const loadFonts = async () => {
  return {
    smileySans: await fs.readFile(
      path.resolve("./public/fonts/smiley-sans/SmileySans-Oblique.ttf"),
    ),
  };
};

export const getStaticPaths = (async () => {
  const entries = await getCollection("posts");
  return entries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}) satisfies GetStaticPaths;

type Props = Awaited<ReturnType<typeof getStaticPaths>>[number];

import { createElement } from "react";
import { OgTemplate } from "@/components/og-post";
import { ImageResponse } from "@vercel/og";
import { getCollection } from "astro:content";
import type { GetStaticPaths } from "astro";

export async function GET({ props: { entry } }: Props) {
  try {
    return new ImageResponse(
      createElement(OgTemplate, { data: entry.data }),
      {},
    );
  } catch (error: any) {
    return new Response("Failed to generate the image", { status: 500 });
  }
}

export const getStaticPaths = (async () => {
  const entries = await getCollection("posts");
  return entries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}) satisfies GetStaticPaths;

type Props = Awaited<ReturnType<typeof getStaticPaths>>[number];

import { OgTemplate } from "@/components/og-templates/home";
import { loadFonts } from "@/utils";
import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";
import { createElement } from "react";

export const GET: APIRoute = async () => {
  try {
    return new ImageResponse(createElement(OgTemplate), {
      fonts: [
        {
          name: "Pacifico",
          data: (await loadFonts()).pacifico,
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

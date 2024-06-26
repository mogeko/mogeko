import { createElement } from "react";
import { OgTemplate } from "@/components/og-templates/home";
import { ImageResponse } from "@vercel/og";
import { loadFonts } from "@/data";
import type { APIRoute } from "astro";

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

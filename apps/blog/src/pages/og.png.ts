import { createElement } from "react";
import { OgTemplate } from "@/components/og-templates/home";
import { ImageResponse } from "@vercel/og";

export async function GET() {
  try {
    return new ImageResponse(createElement(OgTemplate), {
      fonts: [
        {
          name: "Pacifico",
          data: (await fetchFonts()).fontRegular,
          weight: 400,
          style: "normal",
        },
      ],
    });
  } catch (error: any) {
    return new Response("Failed to generate the image", { status: 500 });
  }
}

const fetchFonts = async () => {
  const fontFile = await fetch(
    `https://cdn.jsdelivr.net/fontsource/fonts/pacifico@latest/latin-400-normal.ttf`,
  );

  return {
    fontRegular: await fontFile.arrayBuffer(),
  };
};

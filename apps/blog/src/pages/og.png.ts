import { createElement } from "react";
import { OgTemplate } from "@/components/og-templates/home";
import { ImageResponse } from "@vercel/og";
import path from "node:path";
import fs from "node:fs/promises";

export async function GET() {
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
}

const loadFonts = async () => {
  return {
    pacifico: await fs.readFile(
      path.resolve("./public/fonts/pacifico/Pacifico-Regular.ttf"),
    ),
  };
};

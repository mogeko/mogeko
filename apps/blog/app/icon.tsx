import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";
import satori from "satori";

export function generateImageMetadata() {
  return [
    { contentType: "image/png", size: { width: 512, height: 512 }, id: "512" },
    { contentType: "image/png", size: { width: 192, height: 192 }, id: "192" },
    { contentType: "image/svg+xml", id: "svg" },
  ];
}

export default async function Icon({ id }: { id: string }) {
  if (id === "192") {
    return new ImageResponse(
      <div tw="flex p-[15%] bg-black w-full h-full">
        <div tw="w-[23.952px] h-[38.4px] bg-[rgba(92,255,59,1)]" />
      </div>,
      { width: 192, height: 192 },
    );
  }

  if (id === "512") {
    return new ImageResponse(
      <div tw="flex p-[15%] bg-black w-full h-full">
        <div tw="w-[63.872px] h-[102.4px] bg-[rgba(92,255,59,1)]" />
      </div>,
      { width: 512, height: 512 },
    );
  }

  if (id === "svg") {
    const svg = await satori(
      <div tw="flex p-[15%] bg-black w-full h-full">
        <div tw="w-[23.952px] h-[38.4px] bg-[rgba(92,255,59,1)]" />
      </div>,
      { width: 192, height: 192, fonts: [] },
    );

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        // Set the `cache-control` to be consistent with `ImageResponse`
        // See: https://vercel.com/docs/og-image-generation/og-image-api
        "cache-control": "public, immutable, no-transform, max-age=31536000",
      },
    });
  }
}

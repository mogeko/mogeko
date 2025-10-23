import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";
import satori from "satori";

export function generateImageMetadata() {
  return [
    { contentType: "image/png", size: { width: 512, height: 512 }, id: "512" },
    { contentType: "image/png", size: { width: 192, height: 192 }, id: "192" },
    { contentType: "image/svg+xml", id: "svg" },
  ] as const;
}

type LegalId = ReturnType<typeof generateImageMetadata>[number]["id"];

export default async function Icon(props: { id: Promise<LegalId> }) {
  const id = await props.id;

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
    return new NextResponse(
      await satori(
        <div tw="flex p-[15%] bg-black w-full h-full">
          <div tw="w-[23.952px] h-[38.4px] bg-[rgba(92,255,59,1)]" />
        </div>,
        { width: 192, height: 192, fonts: [] },
      ),
      {
        headers: {
          // Set the `cache-control` to be consistent with `ImageResponse`
          // See: https://vercel.com/docs/og-image-generation/og-image-api
          "Cache-Control": "public, immutable, no-transform, max-age=31536000",
          "Content-Type": "image/svg+xml",
        },
      },
    );
  }
}

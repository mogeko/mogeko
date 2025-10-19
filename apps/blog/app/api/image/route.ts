import { type NextRequest, NextResponse } from "next/server";
import { getUpload } from "@/lib/image-upload";

export async function GET({ nextUrl }: NextRequest) {
  const { searchParams } = nextUrl;
  const imageId = searchParams.get("id");

  if (!imageId) {
    return NextResponse.json(
      { error: "Image ID is required" },
      { status: 400 },
    );
  }

  const upload = await getUpload(imageId);
}

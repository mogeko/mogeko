import { notFound } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";
import type { NotionImageResp } from "@/components/image";
import { getImage, type ImageResp } from "@/lib/image-helper";

export async function GET(req: NextRequest, ctx: RouteContext<"/image/[id]">) {
  const { id } = await ctx.params;

  try {
    const data = await getImage<ImageResp | NotionImageResp>(id);

    if ("filePath" in data) {
      return NextResponse.redirect(new URL(`/image/${data.filePath}`, req.url));
    } else {
      throw new Error(`Values not found for key: ${id}`);
    }
  } catch (_err: unknown) {
    notFound();
  }
}

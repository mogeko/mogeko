import { type NextRequest, NextResponse } from "next/server";
import type { NotionImageResp } from "@/components/image";
import { NotFoundError } from "@/lib/errors";
import { getImage, type ImageResp } from "@/lib/image-helper";

export async function GET(req: NextRequest, ctx: RouteContext<"/image/[id]">) {
  const { id } = await ctx.params;

  try {
    const data = await getImage<ImageResp | NotionImageResp>(id);

    if ("filePath" in data) {
      return NextResponse.redirect(new URL(`/image/${data.filePath}`, req.url));
    } else {
      throw new NotFoundError(`Image not found for key: ${id}`);
    }
  } catch (err: unknown) {
    if (NotFoundError.isNotFoundError(err)) {
      return new NextResponse(err.message, { status: 404 });
    }
    return NextResponse.error();
  }
}

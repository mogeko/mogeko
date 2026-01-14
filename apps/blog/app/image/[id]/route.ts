import { type NextRequest, NextResponse } from "next/server";
import { NotFoundError } from "@/lib/errors";
import { getImage } from "@/lib/image-helper";

export async function GET(req: NextRequest, ctx: RouteContext<"/image/[id]">) {
  const { id } = await ctx.params;

  const { filePath } = await getImage(id);

  if (filePath) {
    return NextResponse.redirect(new URL(`/image/${filePath}`, req.url));
  } else {
    throw new NotFoundError(`Image not found for key: ${id}`);
  }
}

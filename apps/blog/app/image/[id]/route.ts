import { type NextRequest, NextResponse } from "next/server";
import { getImageParams } from "@/lib/image-upload";

type RContext = RouteContext<"/image/[id]">;

export async function GET(req: NextRequest, ctx: RContext) {
  const { id } = await ctx.params;

  const redirectURL = await getImageParams(id).then((data) => {
    if (data) {
      return new URL(`/image/${data.filePath}`, req.url);
    } else {
      return new URL("/404", req.url);
    }
  });

  return NextResponse.redirect(redirectURL);
}

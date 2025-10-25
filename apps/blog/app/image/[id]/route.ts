import { type NextRequest, NextResponse } from "next/server";
import type { NotionImageResp } from "@/components/image";
import { getImage, type ImageResp } from "@/lib/image-helper";

type RContext = RouteContext<"/image/[id]">;

export async function GET(req: NextRequest, ctx: RContext) {
  const { id } = await ctx.params;

  type Resp = ImageResp | NotionImageResp;

  const redirectURL = await getImage<Resp>(id).then((data) => {
    if (data && "filePath" in data) {
      return new URL(`/image/${data.filePath}`, req.url);
    } else {
      return new URL("/404", req.url);
    }
  });

  return NextResponse.redirect(redirectURL);
}

import { type NextRequest, NextResponse } from "next/server";
import { getUpload } from "@/lib/image-upload";
import { BUCKET_NAME, GetObjectCommand, s3 } from "@/lib/s3";

type Context = RouteContext<"/image/[...asset_key]">;

export async function GET(_req: NextRequest, ctx: Context) {
  const { asset_key } = await ctx.params;

  const upload = await getUpload(asset_key[0]);

  try {
    const { Body } = await s3.send(
      new GetObjectCommand({ Bucket: BUCKET_NAME, Key: asset_key.join("/") }),
    );

    if (!Body || !upload) {
      return NextResponse.redirect("/404");
    }

    return new NextResponse(Body.transformToWebStream(), {
      headers: { "Content-Type": `image/${upload.format}` },
    });
  } catch (_err) {
    return NextResponse.error();
  }
}

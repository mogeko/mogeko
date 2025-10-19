import { GetObjectCommand, NoSuchKey } from "@aws-sdk/client-s3";
import { type NextRequest, NextResponse } from "next/server";
import { BUCKET_NAME as Bucket, s3 } from "@/lib/s3";

type RContext = RouteContext<"/image/[...key]">;

export async function GET(req: NextRequest, ctx: RContext) {
  const { key } = await ctx.params;

  try {
    const { Body, ContentType } = await s3.send(
      new GetObjectCommand({ Bucket, Key: key.join("/") }),
    );

    if (!Body) {
      return NextResponse.redirect(new URL("/404", req.url));
    }

    const stream = Body.transformToWebStream();

    return new NextResponse(stream, {
      headers: {
        ContentType: ContentType || "application/octet-stream",
      },
    });
  } catch (err: unknown) {
    if (err instanceof NoSuchKey) {
      return NextResponse.redirect(new URL("/404", req.url));
    }

    return NextResponse.error();
  }
}

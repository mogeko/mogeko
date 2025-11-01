import { GetObjectCommand, NoSuchKey } from "@aws-sdk/client-s3";
import { type NextRequest, NextResponse } from "next/server";
import { NotFoundError } from "@/lib/errors";
import { BUCKET_NAME as Bucket, s3 } from "@/lib/s3";

type RContext = RouteContext<"/image/[...key]">;

export async function GET(_req: NextRequest, ctx: RContext) {
  const { key } = await ctx.params;

  try {
    const { Body, ContentType } = await s3.send(
      new GetObjectCommand({ Bucket, Key: key.join("/") }),
    );

    if (!Body) {
      throw new NotFoundError(`Image not found for key: ${key.join("/")}`);
    }

    const stream = Body.transformToWebStream();

    return new NextResponse(stream, {
      headers: {
        "Content-Type": ContentType || "application/octet-stream",
      },
    });
  } catch (err: unknown) {
    switch (true) {
      case NotFoundError.isNotFoundError(err):
      case err instanceof NoSuchKey: {
        return new NextResponse(err.message, { status: 404 });
      }
      default: {
        return NextResponse.error();
      }
    }
  }
}

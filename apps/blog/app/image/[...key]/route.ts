import { s3 } from "bun";
import { type NextRequest, NextResponse } from "next/server";

type RContext = RouteContext<"/image/[...key]">;

export async function GET(_req: NextRequest, ctx: RContext) {
  const { key } = await ctx.params;

  try {
    const s3File = s3.file(key.join("/"));

    const { type } = await s3File.stat();

    return new NextResponse(s3File.stream(), {
      headers: {
        "Content-Type": type || "application/octet-stream",
      },
    });
  } catch (_err: unknown) {
    return NextResponse.error();
  }
}

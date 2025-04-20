import { encrypt } from "@/lib/aes-gcm";
import { type NextRequest, NextResponse } from "next/server";

const DEFAULT_VALIDITY_PERIOD = 300000; // 5 minutes

export async function GET({ nextUrl }: NextRequest) {
  const client_id = process.env.OAUTH_CLIENT_ID;
  const passwd = process.env.APP_ENCRYPTION_PASSWD;

  if (!client_id || !passwd) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }

  const oauthParams = new URLSearchParams({
    client_id,
    redirect_uri: `${nextUrl.origin}/api/oauth/access_token`,
    state: await encrypt(
      JSON.stringify({
        value: nextUrl.searchParams.get("next") ?? nextUrl.origin,
        expires: Date.now() + DEFAULT_VALIDITY_PERIOD,
      }),
      passwd,
    ),
  });

  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?${oauthParams.toString()}`,
  );
}

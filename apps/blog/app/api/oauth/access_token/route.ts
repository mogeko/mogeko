import { decrypt, encrypt } from "@/lib/aes-gcm";
import { type NextRequest, NextResponse } from "next/server";

const TOKEN_VALIDITY_PERIOD = 31536000000; // 1 year;

export async function GET({ nextUrl }: NextRequest) {
  const state = nextUrl.searchParams.get("state");
  const code = nextUrl.searchParams.get("code");

  if (!state || !code) {
    return NextResponse.json(
      { error: "`state` and `code` are required." },
      { status: 400 },
    );
  }

  const client_id = process.env.OAUTH_CLIENT_ID;
  const client_secret = process.env.OAUTH_CLIENT_SECRET;
  const passwd = process.env.APP_ENCRYPTION_PASSWD;

  if (!client_id || !client_secret || !passwd) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }

  let callbackURL: string;
  try {
    callbackURL = JSON.parse(await decrypt(state, passwd)).value;
  } catch (_) {
    return NextResponse.json({ error: "Invalid `state`." }, { status: 400 });
  }

  const response = NextResponse.redirect(callbackURL);

  try {
    const resp = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      body: new URLSearchParams({
        redirect_uri: `${nextUrl.origin}/api/oauth/access_token`,
        client_id,
        client_secret,
        code,
      }),
      headers: {
        Accept: "application/json",
      },
    });

    if (resp.ok) {
      const oauthToken = await encrypt(
        JSON.stringify({
          value: (await resp.json()).access_token,
          expires: Date.now() + TOKEN_VALIDITY_PERIOD,
        }),
        passwd,
      );

      response.cookies.set("oauth_token", oauthToken, {
        path: "/", // Required for Safari
        expires: new Date(Date.now() + TOKEN_VALIDITY_PERIOD),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    } else {
      throw new Error(`Failed to get access token: ${resp.statusText}`);
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return response;
}

import { encrypt } from "@mogeko/utils/ase-gcm";
import { getSecret } from "astro:env/server";
import type { APIRoute } from "astro";

const DEFAULT_VALIDITY_PERIOD = 5 * 60 * 1000; // 5 minutes

export const GET: APIRoute = async ({ request, redirect }) => {
  const requestURL = new URL(request.url);
  const appReturnURL = requestURL.searchParams.get("redirect_uri");

  if (!appReturnURL) {
    const ctx = JSON.stringify({ error: "`redirect_uri` is required." });
    return new Response(ctx, { status: 400 });
  }

  const client_id = getSecret("OAUTH_CLIENT_ID");
  const passwd = getSecret("ENCRYPTION_PASSWD");

  if (!client_id || !passwd) {
    const ctx = JSON.stringify({ error: "Internal server error." });
    return new Response(ctx, { status: 500 });
  }

  const proto = request.headers.get("x-forwarded-proto") || "https";
  const redirect_uri = `${proto}://${requestURL.host}/api/oauth/access_token`;
  const state = await encrypt(
    JSON.stringify({
      value: appReturnURL,
      expires: Date.now() + DEFAULT_VALIDITY_PERIOD,
    }),
    passwd,
  );

  const oauthParams = new URLSearchParams({ client_id, redirect_uri, state });

  return redirect(
    `https://github.com/login/oauth/authorize?${oauthParams.toString()}`,
    302,
  );
};

export const prerender = false;

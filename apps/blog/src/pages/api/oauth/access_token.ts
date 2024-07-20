import { encrypt, decrypt } from "@mogeko/utils/ase-gcm";
import { getSecret } from "astro:env/server";
import type { APIRoute } from "astro";

const TOKEN_VALIDITY_PERIOD = 1000 * 60 * 60 * 24 * 365; // 1 year;

export const GET: APIRoute = async ({ request, redirect, cookies }) => {
  const query = new URL(request.url).searchParams;
  const [code, state, error] = ["code", "state", "error"].map(query.get);
  const client_id = getSecret("OAUTH_CLIENT_ID");
  const client_secret = getSecret("OAUTH_CLIENT_SECRET");
  const passwd = getSecret("ENCRYPTION_PASSWD");

  if (!client_id || !client_secret || !passwd) {
    const ctx = JSON.stringify({ error: "Internal server error." });
    return new Response(ctx, { status: 500 });
  } else if (!state) {
    const ctx = JSON.stringify({ error: "`state` are required." });
    return new Response(ctx, { status: 400 });
  }

  let appReturnUrl: string;
  try {
    appReturnUrl = JSON.parse(await decrypt(state, passwd)).value;
  } catch (_) {
    const ctx = JSON.stringify({ error: "Invalid state." });
    return new Response(ctx, { status: 400 });
  }

  const returnUrl = new URL(appReturnUrl);

  if (error && error === "access_denied") {
    return redirect(returnUrl.toString(), 302);
  } else if (!code) {
    const ctx = JSON.stringify({ error: "`code` are required." });
    return new Response(ctx, { status: 400 });
  }

  let accessToken: string;
  try {
    const resp = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      body: new URLSearchParams({ client_id, client_secret, code, state }),
      headers: {
        Accept: "application/json",
      },
    });

    if (resp.ok) {
      accessToken = (await resp.json()).access_token;
    } else {
      throw new Error(`Failed to get access token: ${resp.statusText}`);
    }
  } catch (err: any) {
    const ctx = JSON.stringify({ error: err.message });
    return new Response(ctx, { status: 500 });
  }

  const oauthToken = await encrypt(
    JSON.stringify({
      value: accessToken,
      expires: Date.now() + TOKEN_VALIDITY_PERIOD,
    }),
    passwd,
  );

  cookies.set("oauth_token", oauthToken, {
    domain: returnUrl.hostname,
    expires: new Date(Date.now() + TOKEN_VALIDITY_PERIOD),
    secure: true,
  });

  return redirect(returnUrl.toString(), 302);
};

export const prerender = false;

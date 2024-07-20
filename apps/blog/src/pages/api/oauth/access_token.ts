import { encrypt, decrypt } from "@mogeko/utils/ase-gcm";
import { getSecret } from "astro:env/server";
import type { APIRoute } from "astro";

const TOKEN_VALIDITY_PERIOD = 1000 * 60 * 60 * 24 * 365; // 1 year;

export const GET: APIRoute = async ({ request, redirect, cookies }) => {
  const requestURL = new URL(request.url);

  const code = requestURL.searchParams.get("code");
  const state = requestURL.searchParams.get("state");
  const error = requestURL.searchParams.get("error");

  if (!code || !state) {
    return new Response(
      JSON.stringify({ error: "`code` and `state` are required." }),
      { status: 400 },
    );
  }

  const client_id = getSecret("OAUTH_CLIENT_ID");
  const client_secret = getSecret("OAUTH_CLIENT_SECRET");
  const passwd = getSecret("ENCRYPTION_PASSWD");

  if (!client_id || !client_secret || !passwd) {
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
    });
  }

  let appReturnUrl: string;
  try {
    appReturnUrl = JSON.parse(await decrypt(state, passwd)).value;
  } catch (_) {
    return new Response(JSON.stringify({ error: "Invalid state." }), {
      status: 400,
    });
  }

  const returnUrl = new URL(appReturnUrl);

  if (error && error === "access_denied") {
    return redirect(returnUrl.toString(), 302);
  }

  let accessToken: string;
  try {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        body: new URLSearchParams({ client_id, client_secret, code, state }),
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (response.ok) {
      accessToken = (await response.json()).access_token;
    } else {
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
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

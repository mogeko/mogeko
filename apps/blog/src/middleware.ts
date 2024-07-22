import { decrypt } from "@mogeko/utils/ase-gcm";
import githubAppJwt, { type Result } from "universal-github-app-jwt";
import { getSecret } from "astro:env/server";
import { defineMiddleware, sequence } from "astro:middleware";

export const onRequest = sequence(
  defineMiddleware(async ({ locals }, next) => {
    const privateKey = getSecret("APP_PRIVATE_KEY");
    const clientID = getSecret("OAUTH_CLIENT_ID");

    if (clientID && privateKey) {
      locals.getAppJWT = ((cache?: Result<string>) => {
        return async () => {
          if (!cache || cache.expiration < Date.now()) {
            cache = await githubAppJwt({ id: clientID, privateKey });
          }
          return cache.token;
        };
      })(void 0);
    } else {
      const ctx = JSON.stringify({ error: "Internal server error." });
      return new Response(ctx, { status: 500 });
    }

    return next();
  }),
  defineMiddleware(async ({ url, cookies, locals }, next) => {
    // It will print a 'WARN' message when generating static pages. It's a known issue.
    // In order to alleviate this issue, we only decrypt the cookie when the URL pathname
    // matches `/posts/*`.
    // See: https://github.com/withastro/docs/issues/7215
    if (/^\/posts\/.+/.test(url.pathname) && cookies.has("oauth_token")) {
      const cookie = cookies.get("oauth_token")?.value;
      const passwd = getSecret("ENCRYPTION_PASSWD");

      if (cookie && passwd) {
        const oauthToken = JSON.parse(
          await decrypt(cookie, passwd).catch((_) => "{}"),
        ).value;

        locals.user = { token: oauthToken };
      }
    }

    return next();
  }),
);

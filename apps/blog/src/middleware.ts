import { getSecret } from "astro:env/server";
import { defineMiddleware, sequence } from "astro:middleware";
import { createAppAuth } from "@/utils";
import { decrypt } from "@mogeko/utils/ase-gcm";

export const onRequest = sequence(
  defineMiddleware(async ({ locals }, next) => {
    const pkcs8 = getSecret("APP_PRIVATE_KEY");
    const iid = getSecret("APP_INSTALLATIONS_ID");
    const cid = getSecret("OAUTH_CLIENT_ID");

    locals.getAppToken = createAppAuth(pkcs8, iid, cid);

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

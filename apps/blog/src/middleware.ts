import { decrypt } from "@mogeko/utils/ase-gcm";
import { getSecret } from "astro:env/server";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(
  async ({ url, cookies, locals }, next) => {
    try {
      // It will print a 'WARN' message when generating static pages. It's a known issue.
      // In order to alleviate this issue, we only decrypt the cookie when the URL pathname
      // matches `/posts/*`.
      // See: https://github.com/withastro/docs/issues/7215
      if (/^\/posts\/.+/.test(url.pathname) && cookies.has("oauth_token")) {
        const cookie = cookies.get("oauth_token")?.value;
        const passwd = getSecret("ENCRYPTION_PASSWD");

        if (passwd && cookie) {
          const { value } = JSON.parse(await decrypt(cookie, passwd));

          locals.user = { token: value };
        }
      }
    } finally {
      return next();
    }
  },
);

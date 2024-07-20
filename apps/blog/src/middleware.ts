import { decrypt } from "@mogeko/utils/ase-gcm";
import { getSecret } from "astro:env/server";
import { defineMiddleware } from "astro:middleware";

// It will log a 'WARN' message for static pages. It's a known issue.
// See: https://github.com/withastro/docs/issues/7215
export const onRequest = defineMiddleware(async (context, next) => {
  try {
    if (context.cookies.has("oauth_token")) {
      const cookie = context.cookies.get("oauth_token");
      const passwd = getSecret("ENCRYPTION_PASSWD");

      if (passwd && cookie) {
        const { value } = JSON.parse(await decrypt(cookie.value, passwd));

        context.locals.user = { token: value };
      }
    }
  } finally {
    return next();
  }
});

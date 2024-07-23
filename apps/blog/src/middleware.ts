import githubAppJwt from "universal-github-app-jwt";
import { isPast } from "date-fns";
import { decrypt } from "@mogeko/utils/ase-gcm";
import { getSecret } from "astro:env/server";
import { defineMiddleware, sequence } from "astro:middleware";

const createAppAuth: {
  (pkcs8: string, cid: string, iid: string): App.Locals["getAppToken"];
  cache?: { token: string; expiresAt: string };
} = (pkcs8, cid, iid) => {
  return async () => {
    if (!createAppAuth.cache || isPast(createAppAuth.cache.expiresAt)) {
      const jwt = await githubAppJwt({ id: cid, privateKey: pkcs8 });
      const { token, expires_at } = await fetch(
        `https://api.github.com/app/installations/${iid}/access_tokens`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt.token}`,
            Accept: "application/json",
          },
        },
      ).then((resp) => resp.json());

      createAppAuth.cache = { token, expiresAt: expires_at };
    }

    return createAppAuth.cache.token;
  };
};

export const onRequest = sequence(
  defineMiddleware(async ({ locals }, next) => {
    const pkcs8 = getSecret("APP_PRIVATE_KEY");
    const iid = getSecret("APP_INSTALLATIONS_ID");
    const cid = getSecret("OAUTH_CLIENT_ID");

    if (!pkcs8 || !cid || !iid) throw new Error("Internal server error.");

    locals.getAppToken = createAppAuth(pkcs8, cid, iid);

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

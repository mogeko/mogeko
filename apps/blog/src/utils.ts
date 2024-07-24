import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCollection, type CollectionEntry } from "astro:content";
import { getTime } from "date-fns";
import { memoize } from "@mogeko/utils";
import githubAppJwt from "universal-github-app-jwt";
import { isPast } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loadFonts = memoize(
  async () => {
    return {
      pacifico: await fetch(
        "https://github.com/google/fonts/raw/main/ofl/pacifico/Pacifico-Regular.ttf",
      ).then((res) => res.arrayBuffer()),
    };
  },
  () => "fonts",
);

export const getEntries = memoize(
  async () => {
    return (
      await getCollection("posts", ({ data }) => {
        return import.meta.env.PROD ? data.draft !== true : true;
      })
    ).sort((a, b) => {
      return getTime(b.data.date) - getTime(a.data.date);
    });
  },
  () => "posts",
);

export type Entry = CollectionEntry<"posts">;

export const createAppAuth: {
  (pkcs8?: string, cid?: string, iid?: string): App.Locals["getAppToken"];
  cache?: { token: string; expiresAt: string };
} = (pkcs8, iid, cid) => {
  return async () => {
    if (!pkcs8 || !cid || !iid) throw new Error("Internal server error.");
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

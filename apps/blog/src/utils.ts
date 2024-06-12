import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCollection, type CollectionEntry } from "astro:content";
import { getTime } from "date-fns";
import path from "node:path";
import fs from "node:fs/promises";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { slug } from "github-slugger";

export const memoize: {
  <T, F extends (...args: any[]) => T>(
    fn: F,
    hasher?: (...args: Parameters<F>) => any,
  ): F & { cache: Map<any, T> };
  Cache: MapConstructor;
} = function (fn, hasher) {
  const memoized = function (this: any, ...args: any) {
    const keys = hasher ? hasher.apply(this, args) : args[0];
    const cache = memoized.cache;

    if (!cache.has(keys)) {
      memoized.cache = cache.set(keys, fn.apply(this, args));
    }

    return cache.get(keys);
  };
  memoized.cache = new (memoize.Cache || Map)();

  return memoized as any;
};
memoize.Cache = Map;

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

export const loadFonts = memoize(
  async () => {
    return {
      pacifico: await fs.readFile(
        path.resolve("./public/fonts/pacifico/Pacifico-Regular.ttf"),
      ),
      smileySans: await fs.readFile(
        path.resolve("./public/fonts/smiley-sans/SmileySans-Oblique.ttf"),
      ),
    };
  },
  () => "fonts",
);

import { getCollection, type CollectionEntry } from "astro:content";
import { getTime } from "date-fns";
import { memoize } from "@mogeko/utils";

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

import { getCollection, type CollectionEntry } from "astro:content";
import { getTime } from "date-fns";
import { memoize } from "@mogeko/utils";
import path from "node:path";
import fs from "node:fs/promises";

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

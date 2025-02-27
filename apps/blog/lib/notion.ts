import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  fetch: (input, opts) => {
    return fetch(input, { ...opts, next: { revalidate: 60 } });
  },
});

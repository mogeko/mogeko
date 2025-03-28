import { Client } from "@notionhq/client";

import "server-only";

export const notion = new Client({
  auth: process.env.NOTION_AUTH_TOKEN,
  fetch: fetch, // Using Next.js `fetch` to obtain optimization
});

export * from "@notionhq/client";

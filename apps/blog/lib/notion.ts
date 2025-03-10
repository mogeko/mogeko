import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_AUTH_TOKEN,
  fetch: fetch,
});

export * from "@notionhq/client";

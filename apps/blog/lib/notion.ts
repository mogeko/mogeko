import { Client } from "@notionhq/client";
import { cache } from "react";

export const notion = new Client({
  auth: process.env.NOTION_AUTH_TOKEN,
  fetch: (input, options) => {
    return fetch(input, {
      ...options,
      next: {
        revalidate: 60, // 1 minute
      },
    });
  },
});

export const notionBlocksChildrenList = cache(notion.blocks.children.list);
export const notionPagesRetrieve = cache(notion.pages.retrieve);
export const notionBlockRetrieve = cache(notion.blocks.retrieve);
export const notionDatabasesRetrieve = cache(notion.databases.retrieve);

export * from "@notionhq/client";

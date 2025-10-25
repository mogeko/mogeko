import { Client, isFullDatabase, isFullPage } from "@notionhq/client";
import { cacheLife, cacheTag } from "next/cache";

import "server-only";

export const notion = new Client({
  auth: process.env.NOTION_AUTH_TOKEN,
  fetch: async (input, init) => {
    return await fetch(input, {
      next: {
        revalidate: 10 * 60, // 10 minute
        tags: ["notion"],
      },
      ...init,
    });
  },
});

export async function retrieveDatabase(database_id?: string) {
  "use cache";

  if (database_id) {
    const database = await notion.databases.retrieve({ database_id });

    cacheTag("notion", "database", database_id);
    cacheLife("default");

    if (isFullDatabase(database)) {
      return database;
    }
  }
}

export async function retrievePage(page_id?: string) {
  "use cache";

  if (page_id) {
    cacheTag("notion", "page", page_id);
    cacheLife("default");

    const page = await notion.pages.retrieve({ page_id });

    if (isFullPage(page)) {
      return page;
    }
  }
}

export * from "@notionhq/client";

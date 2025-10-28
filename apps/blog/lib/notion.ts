import { Client, isFullDatabase, isFullPage } from "@notionhq/client";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { APIErrorCode, NotFoundError } from "@/lib/errors";

import "server-only";

export const notion = new Client({
  auth: process.env.NOTION_AUTH_TOKEN,
  fetch: async (input, init) => {
    return await fetch(input, {
      next: {
        revalidate: 10 * 60, // 10 minute
        tags: ["notion", "fetch"],
      },
      ...init,
    });
  },
});

export async function retrieveDatabase(database_id?: string) {
  "use cache";

  try {
    if (!database_id) {
      throw new NotFoundError(`Database ID is required`);
    }

    cacheTag("notion", "database", database_id);
    cacheLife("default");

    const database = await notion.databases.retrieve({ database_id });

    if (isFullDatabase(database)) {
      return database;
    }
  } catch (err: unknown) {
    if (err instanceof Error && "code" in err) {
      switch (err.code) {
        case APIErrorCode.ObjectNotFound: {
          notFound();
        }
      }
    }
  }
}

export async function retrievePage(page_id?: string) {
  "use cache";

  try {
    if (!page_id) {
      throw new NotFoundError(`No page found with id: ${page_id}`);
    }

    cacheTag("notion", "page", page_id);
    cacheLife("default");

    const page = await notion.pages.retrieve({ page_id });

    if (isFullPage(page)) {
      return page;
    }
  } catch (err: any) {
    if (err instanceof Error && "code" in err) {
      switch (err.code) {
        case APIErrorCode.ObjectNotFound: {
          notFound();
        }
      }
    }
  }
}

export * from "@notionhq/client";

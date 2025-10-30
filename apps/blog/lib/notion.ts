import { Client, isFullDatabase, isFullPage } from "@notionhq/client";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { APIErrorCode, NotFoundError } from "@/lib/errors";

import "server-only";

const notion = new Client({ auth: process.env.NOTION_AUTH_TOKEN, fetch });

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
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error) {
      switch (error.code) {
        case APIErrorCode.ObjectNotFound: {
          notFound();
        }
      }
    }
    throw error;
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
  } catch (error: any) {
    if (error instanceof Error && "code" in error) {
      switch (error.code) {
        case APIErrorCode.ObjectNotFound: {
          notFound();
        }
      }
    }
    throw error;
  }
}

export async function retrieveUsers(user_id: string) {
  "use cache";

  cacheTag("notion", "user", user_id);
  cacheLife("default");

  try {
    return await notion.users.retrieve({ user_id });
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error) {
      switch (error.code) {
        case APIErrorCode.ObjectNotFound: {
          notFound();
        }
      }
    }
    throw error;
  }
}

export async function queryDataSources(
  params: Parameters<typeof notion.dataSources.query>[number],
) {
  "use cache";

  cacheTag("notion", "data_source", params.data_source_id);
  cacheLife("default");

  try {
    return await notion.dataSources.query(params);
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error) {
      switch (error.code) {
        case APIErrorCode.ObjectNotFound: {
          notFound();
        }
      }
    }
    throw error;
  }
}

export async function queryBlocks(
  params: Parameters<typeof notion.blocks.children.list>[number],
) {
  "use cache";

  cacheTag("notion", "block", params.block_id);
  cacheLife("default");

  try {
    return await notion.blocks.children.list(params);
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error) {
      switch (error.code) {
        case APIErrorCode.ObjectNotFound: {
          notFound();
        }
      }
    }
    throw error;
  }
}

export * from "@notionhq/client";

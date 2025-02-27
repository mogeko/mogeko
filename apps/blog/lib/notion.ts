import { Client, LogLevel } from "@notionhq/client";
import { NotionCompatAPI } from "notion-compat";
import { cache } from "react";

const isDev = process.env.NODE_ENV === "development";
const notionClient = new Client({
  logLevel: isDev ? LogLevel.DEBUG : LogLevel.WARN,
  auth: process.env.NOTION_TOKEN,
});

export const notion = new NotionCompatAPI(notionClient);

export const getPage = cache((id: string) => notion.getPage(id));

export const getNotionDB = cache(() => {
  const id = process.env.NOTION_DATABASE_ID;

  if (!id) throw new Error("Database ID is not provided");

  return notionClient.databases.query({
    database_id: id,
  });
});

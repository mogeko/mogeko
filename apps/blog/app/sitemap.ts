import type { MetadataRoute } from "next";
import {
  isFullPage,
  iteratePaginatedAPI,
  notion,
  retrieveDatabase,
} from "@/lib/notion";

const queryDataSource = notion.dataSources.query;

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const baseUrl = domain ? `https://${domain}` : "http://localhost:3000";
  const feeds: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
  ];

  if (databaseId) {
    const database = await retrieveDatabase(databaseId);

    if (database) {
      await Promise.all(
        database.data_sources.map(async ({ id }) => {
          for await (const page of iteratePaginatedAPI(queryDataSource, {
            data_source_id: id,
          })) {
            if (isFullPage(page)) {
              feeds.push({
                url: `${baseUrl}/posts/${page.id}`,
                lastModified: new Date(page.last_edited_time),
                changeFrequency: "weekly",
                priority: 0.8,
              });
            }
          }
        }),
      );
    }
  }

  return feeds;
}

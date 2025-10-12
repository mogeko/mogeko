import type { MetadataRoute } from "next";
import {
  isFullDatabase,
  isFullPage,
  iteratePaginatedAPI,
  notion,
} from "@/lib/notion";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const baseUrl = domain ? `https://${domain}` : "http://localhost:3000";
  const feeds: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
  ];

  if (databaseId) {
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    if (isFullDatabase(database)) {
      database.data_sources.forEach(async ({ id }) => {
        for await (const page of iteratePaginatedAPI(notion.dataSources.query, {
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
      });
    }
  }

  return feeds;
}

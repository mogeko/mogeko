import { isFullPage, iteratePaginatedAPI, notion } from "@/lib/notion";
import type { MetadataRoute } from "next";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const baseUrl = domain ? `https://${domain}` : "http://localhost:3000";
  const feeds: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
  ];

  if (databaseId) {
    for await (const page of iteratePaginatedAPI(notion.databases.query, {
      database_id: databaseId,
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
  }

  return feeds;
}

import { isFullPage, iteratePaginatedAPI, notion } from "@/lib/notion";
import type { MetadataRoute } from "next";

export const revalidate = 86400; // 1 day

const isProd = () => process.env.NODE_ENV === "production";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const vercelUrl = process.env.VERCEL_URL;
  const baseUrl = isProd() ? `https://${vercelUrl}` : "http://localhost:3000";
  const acc: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
  ];

  if (databaseId) {
    for await (const page of iteratePaginatedAPI(notion.databases.query, {
      database_id: databaseId,
    })) {
      if (isFullPage(page)) {
        acc.push({
          url: `${baseUrl}/posts/${page.id}`,
          lastModified: new Date(page.last_edited_time),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  }

  return acc;
}

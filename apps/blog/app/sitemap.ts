import { env } from "node:process";
import type { MetadataRoute } from "next";
import { isFullPage, queryDataSources, retrieveDatabase } from "@/lib/notion";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const databaseId = env.NOTION_DATABASE_ID;
  const domain = env.VERCEL_PROJECT_PRODUCTION_URL;
  const baseUrl = domain ? `https://${domain}` : "http://localhost:3000";
  const feeds: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
  ];

  const database = await retrieveDatabase(databaseId);

  if (database) {
    await Promise.all(
      database.data_sources.map(async ({ id }) => {
        await queryDataSources({ data_source_id: id }).then((dataSources) => {
          dataSources.results.forEach((page) => {
            if (isFullPage(page)) {
              feeds.push({
                url: `${baseUrl}/posts/${page.id}`,
                lastModified: new Date(page.last_edited_time),
                changeFrequency: "weekly",
                priority: 0.8,
              });
            }
          });
        });
      }),
    );
  }

  return feeds;
}

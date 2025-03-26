import { plainText } from "@/components/text";
import { isFullDatabase, notion } from "@/lib/notion";
import pkg from "@/package.json";
import type { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const database_id = process.env.NOTION_DATABASE_ID;
  const icons = [
    { src: "/icon-192x192.png", type: "image/png", sizes: "192x192" },
    { src: "/icon-512x512.png", type: "image/png", sizes: "512x512" },
  ];

  if (database_id) {
    const database = await notion.databases.retrieve({ database_id });

    if (isFullDatabase(database)) {
      return {
        name: plainText(database.title),
        description: pkg.description,
        icons,
      };
    }
  }

  return { icons };
}

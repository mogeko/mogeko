import { env } from "node:process";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = env.VERCEL_PROJECT_PRODUCTION_URL;
  const baseUrl = domain ? `https://${domain}` : "http://localhost:3000";

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

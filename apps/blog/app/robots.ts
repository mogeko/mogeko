import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const baseUrl = domain ? `https://${domain}` : "http://localhost:3000";

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

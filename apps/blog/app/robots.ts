import type { MetadataRoute } from "next";

const isProd = () => process.env.NODE_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  const vercelUrl = process.env.VERCEL_URL;
  const baseUrl = isProd() ? `https://${vercelUrl}` : "http://localhost:3000";

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

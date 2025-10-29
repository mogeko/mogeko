import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.notionusercontent.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
    ],
    minimumCacheTTL: 2678400, // 31 days
  },
  reactCompiler: true,
  cacheComponents: true,
};

export default nextConfig;

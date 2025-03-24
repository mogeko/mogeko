import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [{ hostname: "**.amazonaws.com", protocol: "https" }],
  },
  logging: {
    fetches: { fullUrl: true },
  },
};

export default nextConfig;

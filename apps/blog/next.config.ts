import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.notionusercontent.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "res.cloudinary.com/mogeko/image/upload" },
    ],
  },
  logging: {
    fetches: { fullUrl: true },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

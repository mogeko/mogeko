import { createContentCollectionPlugin } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withContent = createContentCollectionPlugin({
  configPath: "./content/config.ts",
});

export default withContent(nextConfig);

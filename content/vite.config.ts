import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import contentCollections from "@content-collections/vite";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  css: {
    transformer: "lightningcss",
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./styles/typography.css"),
      },
      output: {
        assetFileNames: "typography.css",
      },
    },
  },
  plugins: [contentCollections()],
  resolve: {
    alias: { "@": __dirname },
  },
});

import { defineConfig } from "vitest/config";

export default defineConfig({
  define: { "import.meta.vitest": "undefined" },
  test: {
    includeSource: ["{src,tests}/**/*.{js,ts}", "index.ts"],
  },
  resolve: {
    alias: { "@": new URL("./src", import.meta.url).pathname },
  },
});

import { defineConfig } from "vitest/config";

export default defineConfig({
  define: { "import.meta.vitest": "undefined" },
  test: {
    includeSource: ["{lib,tests}/*.{js,ts}"],
  },
  resolve: {
    alias: { "@": new URL(".", import.meta.url).pathname },
  },
});

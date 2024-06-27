import { defineConfig } from "vitest/config";

export default defineConfig({
  define: { "import.meta.vitest": "undefined" },
  test: {
    includeSource: ["./**/*.{js,ts}"],
    coverage: {
      reporter: ["text", "json", "html"],
      provider: "v8",
    },
  },
  resolve: {
    alias: { "@": new URL(".", import.meta.url).pathname },
  },
});

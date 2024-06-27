import { defineConfig } from "vitest/config";

export default defineConfig({
  define: { "import.meta.vitest": "undefined" },
  test: {
    includeSource: ["index.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
      provider: "v8",
    },
  },
});

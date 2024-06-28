import { defineConfig } from "vitest/config";

export default defineConfig({
  define: { "import.meta.vitest": "undefined" },
  test: {
    includeSource: ["{src,tests}/**/*.{js,ts}"],
    coverage: {
      reporter: ["text", "json", "html"],
      provider: "v8",
    },
  },
  resolve: {
    alias: { "@": new URL("./src", import.meta.url).pathname },
  },
});

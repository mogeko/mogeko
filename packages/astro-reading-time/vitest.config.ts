import tsconfigPaths from "vite-tsconfig-paths";
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
  plugins: [tsconfigPaths()],
});

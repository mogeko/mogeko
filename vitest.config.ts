import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["**/*/vitest.config.ts"],
    reporters: [
      ["junit", { outputFile: ".github/test-report.junit.xml" }],
      ["default", { summary: true }],
    ],
    coverage: {
      exclude: ["**/dist/*"],
    },
  },
});

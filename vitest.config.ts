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
      // It seems that Bun does not currently support `v8`, so using `istanbul`
      // as a fallback to generate coverage reports.
      // See: https://github.com/oven-sh/bun/issues/2445
      // See: https://github.com/oven-sh/bun/issues/4145
      provider: "istanbul",
    },
  },
});

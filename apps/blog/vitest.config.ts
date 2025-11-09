import { argv, env } from "node:process";
import react from "@vitejs/plugin-react-swc";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": JSON.stringify({}),
  },
  test: {
    setupFiles: ["./scripts/vitest-setup.ts"],
    browser: {
      provider: playwright(),
      enabled: true,
      headless: !argv.includes("--watch") || !!env.CI,
      instances: [{ browser: "chromium" }],
    },
  },
  resolve: {
    alias: { "@": new URL(".", import.meta.url).pathname },
  },
});

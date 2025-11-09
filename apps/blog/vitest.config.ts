import react from "@vitejs/plugin-react-swc";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": JSON.stringify({}),
  },
  test: {
    browser: {
      provider: playwright(),
      enabled: true,
      instances: [{ browser: "chromium" }],
      headless: true,
    },
  },
  resolve: {
    alias: { "@": new URL(".", import.meta.url).pathname },
  },
});

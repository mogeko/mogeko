import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsdown";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  define: { "import.meta.vitest": "undefined" },
  entry: {
    index: resolve(__dirname, "index.ts"),
  },
});

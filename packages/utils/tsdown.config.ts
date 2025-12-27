import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsdown";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  define: { "import.meta.vitest": "undefined" },
  entry: {
    "aes-gcm": resolve(__dirname, "./src/aes-gcm.ts"),
    index: resolve(__dirname, "./index.ts"),
  },
});

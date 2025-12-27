import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsdown";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entry: {
    index: resolve(__dirname, "src/index.ts"),
  },
  format: ["esm", "cjs"],
});

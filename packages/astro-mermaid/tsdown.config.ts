import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsdown";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  define: { "import.meta.vitest": "undefined" },
  entry: {
    "astro-mermaid": resolve(__dirname, "index.ts"),
    "shiki-transformer": resolve(__dirname, "src/shiki-transformer.ts"),
    "rehype-wrapper": resolve(__dirname, "src/rehype-wrapper.ts"),
  },
});

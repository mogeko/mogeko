import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsup";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entryPoints: {
    "astro-mermaid": resolve(__dirname, "index.ts"),
    "shiki-transformer": resolve(__dirname, "src/shiki-transformer.ts"),
    "rehype-wrapper": resolve(__dirname, "src/rehype-wrapper.ts"),
  },
  format: ["esm"],
  clean: true,
  dts: true,

  // To delete the in-source testing (comes from vitest)
  // See: https://github.com/egoist/tsup/issues/625#issuecomment-1608591913
  define: { "import.meta.vitest": "false" },
  treeshake: true,
});

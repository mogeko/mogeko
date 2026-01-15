import { resolve } from "node:path";
import { build } from "tsdown";

await build({
  entry: {
    "astro-mermaid": resolve(import.meta.dir, "index.ts"),
    "shiki-transformer": resolve(import.meta.dir, "src/shiki-transformer.ts"),
    "rehype-wrapper": resolve(import.meta.dir, "src/rehype-wrapper.ts"),
  },
});

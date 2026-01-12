import { resolve } from "node:path";
import { build } from "tsdown";

await build({
  define: { "import.meta.vitest": "undefined" },
  entry: {
    index: resolve(import.meta.dir, "index.ts"),
  },
});

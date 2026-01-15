import { resolve } from "node:path";
import { build } from "tsdown";

await build({
  entry: {
    index: resolve(import.meta.dir, "src/index.ts"),
  },
  format: ["esm", "cjs"],
});

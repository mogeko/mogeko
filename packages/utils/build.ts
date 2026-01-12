import { resolve } from "node:path";
import { build } from "tsdown";

await build({
  entry: {
    "aes-gcm": resolve(import.meta.dir, "./src/aes-gcm.ts"),
    index: resolve(import.meta.dir, "./index.ts"),
  },
});

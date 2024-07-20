import path from "node:path";
import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: {
    "ase-gcm": path.resolve(__dirname, "./src/ase-gcm.ts"),
    index: path.resolve(__dirname, "./index.ts"),
  },
  format: ["esm"],
  clean: true,
  dts: true,

  // To delete the in-source testing (comes from vitest)
  // See: https://github.com/egoist/tsup/issues/625#issuecomment-1608591913
  define: { "import.meta.vitest": "false" },
  treeshake: true,
});

import { defineConfig } from "@rslib/core";
import pkg from "./package.json";

export default defineConfig({
  lib: [
    {
      format: "esm",
      syntax: ["node 18"],
      dts: true,
    },
    {
      format: "cjs",
      syntax: ["node 18"],
    },
  ],
  source: {
    define: {
      __VDASH_VERSION__: JSON.stringify(pkg.version),
    },
  },
  output: {
    sourceMap: true,
  },
});

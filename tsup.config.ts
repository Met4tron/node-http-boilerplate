import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src"],
  format: "esm",
  clean: true,
  sourcemap: true,
  minify: false,
  platform: "node",
  tsconfig: "./tsconfig",
});

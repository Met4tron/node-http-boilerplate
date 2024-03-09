import { defineConfig } from 'vitest/config'
import * as path from "node:path";

export default defineConfig({
  test: {
    include: ['../src/**/*.spec.ts'],
    alias: {
      '~modules': new URL('./src/modules/', import.meta.url).pathname,
      '~infra': new URL('./src/infra/', import.meta.url).pathname,
      '~config': new URL('./src/config/', import.meta.url).pathname
    },
    globals: true,
  },
})
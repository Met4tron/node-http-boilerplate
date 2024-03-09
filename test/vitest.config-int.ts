import {defineConfig, mergeConfig} from 'vitest/config'
import vitestConfigUnit from "./vitest.config-unit"

export default mergeConfig(vitestConfigUnit, defineConfig({
  test: {
    include: ['../src/**/*.spec.ts'],
    coverage: {
      thresholds: {
        branches: 80,
        statements: 80,
        functions: 80,
        lines: 80,
      },
      exclude: ["**/infra/database/**"],
    }
  }
}))
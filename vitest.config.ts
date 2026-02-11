/**
 * Vitest Configuration for @tinyland-inc/tinyland-activity-logger
 *
 * Works in three modes:
 *   1. Standalone:  cd packages/tinyland-activity-logger && pnpm test
 *   2. Workspace:   vitest run --project=tinyland-activity-logger (from root)
 *   3. Bazel:       bazel test //packages/tinyland-activity-logger:test
 *
 * Coverage thresholds: Utilities category (60%)
 */

import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  test: {
    name: 'tinyland-activity-logger',
    root: __dirname,
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    pool: 'forks',
    isolate: true,
    testTimeout: 10000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts'],
      thresholds: {
        statements: 60,
        branches: 55,
        functions: 60,
        lines: 60,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});

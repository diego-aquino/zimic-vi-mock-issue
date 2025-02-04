/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  publicDir: 'public',
  test: {
    globals: true,
    include: ['./tests/**/*.test.ts'],
    clearMocks: true,
    browser: {
      name: 'chromium',
      provider: 'playwright',
      enabled: true,
      headless: true,
      screenshotFailures: false,
    },
  },
});

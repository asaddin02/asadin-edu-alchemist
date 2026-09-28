import { existsSync } from 'node:fs';
import { defineConfig } from '@playwright/test';

// Uses a system Chrome when available (CHROME_PATH or /usr/bin/google-chrome); otherwise Playwright's Chromium.
const chrome =
  process.env.CHROME_PATH || (existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined);

export default defineConfig({
  testDir: './tests',
  testMatch: /.*\.spec\.js/,
  timeout: 45000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  // Canvas animations are CPU-heavy; a few workers keep timings stable.
  workers: process.env.CI ? 2 : 4,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:18766',
    headless: true,
    // Service workers would bypass request interception; the PWA test allows them explicitly.
    serviceWorkers: 'block',
    locale: 'id-ID',
    launchOptions: { executablePath: chrome, args: ['--no-sandbox'] },
  },
  // The production server with its proxy off: the app then calls PubChem and Wikimedia directly, which the
  // tests stub. (Python's http.server has a listen backlog of 5 and drops parallel module requests.)
  webServer: {
    command: 'node server/server.mjs',
    env: { PORT: '18766', HOST: '127.0.0.1', PROXY: '0' },
    url: 'http://127.0.0.1:18766',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'ignore',
  },
});

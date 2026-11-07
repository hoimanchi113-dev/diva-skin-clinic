import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  use: { baseURL: "http://127.0.0.1:3117", trace: "retain-on-failure" },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: [
    {
      command: "npm run start -- --port 3117",
      url: "http://127.0.0.1:3117",
      env: { DIVA_INTERNAL_DEMO: "true", NEXT_TELEMETRY_DISABLED: "1" },
      reuseExistingServer: false,
      timeout: 90_000,
    },
    {
      command: "npm run start -- --port 3118",
      url: "http://127.0.0.1:3118",
      env: { DIVA_INTERNAL_DEMO: "false", NEXT_TELEMETRY_DISABLED: "1" },
      reuseExistingServer: false,
      timeout: 90_000,
    },
  ],
});

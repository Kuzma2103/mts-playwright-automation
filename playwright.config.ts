import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    outputDir: "test-results",
    fullyParallel: true,
    globalSetup: require.resolve("./global-setup.ts"),
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: 3,
    reporter: "html",
    timeout: 30000,
    expect: {
        timeout: 5000,
    },

    use: {
        baseURL: "https://mts.rs/",
        headless: true,
        viewport: { width: 1920, height: 1080 },
        // Ignore ssl certificate
        ignoreHTTPSErrors: true,
        // Capture screenshot after each test failure.
        screenshot: "only-on-failure",
        // Record video on test failure
        video: "retain-on-failure",
        // Toggles bypassing Content-Security-Policy.
        bypassCSP: true,
        trace: "on-first-retry",
    },

    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                viewport: { width: 1920, height: 1080 },
            },
        },
    ],
});

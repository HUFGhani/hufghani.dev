import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env.CI);

export default defineConfig({
	testDir: 'e2e',
	timeout: 30_000,
	expect: {
		timeout: 5_000
	},
	fullyParallel: true,
	workers: isCI ? 2 : undefined,
	retries: isCI ? 2 : 0,
	reporter: [
		['list'],
		['html', { outputFolder: 'playwright-report', open: 'never' }]
	],
	outputDir: 'test-results',
	use: {
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure'
	},
	projects: [
		{
			name: 'Chromium',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			name: 'Firefox',
			use: { ...devices['Desktop Firefox'] }
		},
		{
			name: 'WebKit',
			use: { ...devices['Desktop Safari'] }
		},
		{
			name: 'iPhone 15 Pro',
			use: { ...devices['iPhone 15 Pro'] }
		},
		{
			name: 'Pixel 8',
			use: {
				...devices['Pixel 5'],
				viewport: { width: 412, height: 915 }
			}
		}
	],
	webServer: {
		command: 'VITE_E2E_TESTING=true pnpm run build && pnpm run preview',
		port: 4173,
		timeout: 120_000,
		reuseExistingServer: !isCI
	}
});

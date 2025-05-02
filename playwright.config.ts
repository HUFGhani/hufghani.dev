import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'e2e',
	reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
	fullyParallel: true,
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
			use: {
				...devices['iPhone 15 Pro'], // closest profile available
				viewport: { width: 393, height: 852 },
				deviceScaleFactor: 3
			}
		},
		{
			name: 'Pixel 8',
			use: {
				...devices['Pixel 5'], // closest profile
				viewport: { width: 412, height: 915 }
			}
		},
		{
			name: 'iPad Pro 11"',
			use: {
				...devices['iPad Pro 11']
			}
		},
		{
			name: 'Galaxy S23',
			use: {
				...devices['Galaxy S9+'], // closest profile
				viewport: { width: 384, height: 854 },
				deviceScaleFactor: 3
			}
		},
		{
			name: 'Galaxy Tab S8',
			use: {
				...devices['iPad (gen 7)'],
				viewport: { width: 800, height: 1280 }
			}
		}
	]
});

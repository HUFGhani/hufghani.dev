import { expect, test, type Page } from '@playwright/test';

const AXE_CORE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.3/axe.min.js';

const repositories = {
	data: {
		viewer: {
			repositories: {
				nodes: [
					{
						name: 'Accessibility test project',
						url: 'https://github.com/HUFGhani/accessibility-test-project',
						description: 'A project used by the accessibility test suite.',
						isArchived: false,
						isTemplate: false,
						primaryLanguage: { name: 'TypeScript' }
					}
				]
			}
		}
	}
};

type AxeViolation = {
	id: string;
	impact: string | null;
	help: string;
	helpUrl: string;
	nodes: Array<{ target: string[]; failureSummary?: string }>;
};

async function runAxe(page: Page, pageName: string) {
	await page.addScriptTag({ url: AXE_CORE_URL });

	const results = await page.evaluate(async () => {
		const axe = (window as Window & {
			axe: {
				run: (context: Document, options: object) => Promise<{ violations: AxeViolation[] }>;
			};
		}).axe;

		return axe.run(document, {
			runOnly: {
				type: 'tag',
				values: [
					'wcag2a',
					'wcag2aa',
					'wcag21a',
					'wcag21aa',
					'wcag22aa',
					'best-practice'
				]
			}
		});
	});

	const violations = results.violations.map((violation) => ({
		id: violation.id,
		impact: violation.impact,
		help: violation.help,
		helpUrl: violation.helpUrl,
		nodes: violation.nodes.map((node) => ({
			target: node.target,
			failureSummary: node.failureSummary
		}))
	}));

	expect(violations, `axe-core accessibility violations on ${pageName}:\n${JSON.stringify(violations, null, 2)}`).toEqual([]);
}

test.describe('automated accessibility', () => {
	test('homepage meets WCAG 2.2 AA and axe best-practice checks', async ({ page }) => {
		await page.goto('/');
		await runAxe(page, 'homepage');
	});

	test('experience page meets WCAG 2.2 AA and axe best-practice checks', async ({ page }) => {
		await page.goto('/experience/');
		await runAxe(page, 'experience page');
	});

	test('projects page meets WCAG 2.2 AA and axe best-practice checks', async ({ page }) => {
		await page.route('**/api/repositories**', async (route) => {
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify(repositories)
			});
		});

		await page.goto('/project/');
		await expect(page.getByRole('heading', { level: 1, name: 'Projects.' })).toBeVisible();
		await runAxe(page, 'projects page');
	});

	test('homepage remains accessible in light theme and at a mobile viewport', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto('/');
		await page.getByRole('button', { name: 'Switch to light mode' }).click();
		await runAxe(page, 'mobile homepage in light theme');
	});
});

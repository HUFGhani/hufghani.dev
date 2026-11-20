import { expect, test } from '@playwright/test';

const repositories = Array.from({ length: 11 }, (_, index) => ({
	name: `Project ${index + 1}`,
	url: `https://github.com/HUFGhani/project-${index + 1}`,
	description: `Description for project ${index + 1}`,
	isArchived: false,
	isTemplate: false,
	primaryLanguage: { name: 'TypeScript' }
}));

const repositoryResponse = {
	data: {
		viewer: {
			repositories: {
				nodes: [
					...repositories,
					{
						name: 'Archived Project',
						url: 'https://github.com/HUFGhani/archived',
						description: 'Archived repository',
						isArchived: true,
						isTemplate: false,
						primaryLanguage: { name: 'JavaScript' }
					},
					{
						name: 'Template Project',
						url: 'https://github.com/HUFGhani/template',
						description: 'Template repository',
						isArchived: false,
						isTemplate: true,
						primaryLanguage: { name: 'JavaScript' }
					},
					{
						name: 'hufghani dev',
						url: 'https://github.com/HUFGhani/hufghani.dev',
						description: 'Portfolio source',
						isArchived: false,
						isTemplate: false,
						primaryLanguage: { name: 'Svelte' }
					}
				]
			}
		}
	}
};

test.describe('homepage', () => {
	test('shows the introduction and primary navigation', async ({ page }) => {
		await page.goto('/');

		await expect(page).toHaveTitle(/Hamza Ghani/);
		await expect(page.getByRole('heading', { level: 1, name: /Hello, I'm Hamza/ })).toBeVisible();
		await expect(page.getByRole('link', { name: /Explore my work/ })).toHaveAttribute(
			'href',
			'/project'
		);
		await expect(page.getByRole('link', { name: /Connect on LinkedIn/ })).toBeVisible();
	});

	test('keeps the writing section hidden while the blog feature is disabled', async ({ page }) => {
		await page.goto('/');

		await expect(page.getByRole('link', { name: /Writing/ })).toHaveCount(0);
		await expect(page.getByRole('link', { name: /Projects/ })).toHaveAttribute('href', '/project');
		await expect(page.getByRole('link', { name: /Experience/ })).toHaveAttribute(
			'href',
			'/docs/Curriculum-Vitae.pdf'
		);
	});
});

test.describe('projects page', () => {
	test.beforeEach(async ({ page }) => {
		await page.route('**/api/repositories', async (route) => {
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify(repositoryResponse)
			});
		});

		await page.goto('/');
		await page.getByRole('link', { name: /Explore my work/ }).click();
		await expect(page).toHaveURL(/\/project\/$/);
	});

	test('renders project metadata, heading and project cards', async ({ page }) => {
		await expect(page).toHaveTitle(/Projects/);
		await expect(page.getByRole('heading', { level: 1, name: 'Projects.' })).toBeVisible();
		await expect(page.getByRole('textbox', { name: 'Search projects' })).toBeVisible();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 1' })).toBeVisible();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 9' })).toBeVisible();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 10' })).toHaveCount(0);
	});

	test('filters projects and reflects the search in the URL', async ({ page }) => {
		const search = page.getByRole('textbox', { name: 'Search projects' });

		await search.fill('Project 2');

		await expect(page.getByRole('heading', { level: 2, name: 'Project 2' })).toBeVisible();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 1' })).toHaveCount(0);
		await expect(page).toHaveURL(/q=Project%202/);
	});

	test('paginates projects and updates the page query parameter', async ({ page }) => {
		await page.getByRole('button', { name: 'Next page' }).click();

		await expect(page.getByRole('heading', { level: 2, name: 'Project 10' })).toBeVisible();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 1' })).toHaveCount(0);
		await expect(page).toHaveURL(/page=2/);

		await page.getByRole('button', { name: 'Previous page' }).click();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 1' })).toBeVisible();
		await expect(page).not.toHaveURL(/page=2/);
	});

	test('shows an empty state when the search has no matches', async ({ page }) => {
		await page.getByRole('textbox', { name: 'Search projects' }).fill('no matching project');

		await expect(page.getByText('No projects found')).toBeVisible();
		await expect(page.getByRole('button', { name: 'Next page' })).toHaveCount(0);
	});

	test('does not display archived, template or excluded repositories', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 2, name: 'Archived Project' })).toHaveCount(0);
		await expect(page.getByRole('heading', { level: 2, name: 'Template Project' })).toHaveCount(0);
		await expect(page.getByRole('heading', { level: 2, name: 'hufghani dev' })).toHaveCount(0);
	});
});

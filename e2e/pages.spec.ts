import { expect, test, type Page } from '@playwright/test';

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

const emptyRepositoryResponse = {
	data: { viewer: { repositories: { nodes: [] } } }
};

const mockRepositories = async (page: Page, response: unknown = repositoryResponse, status = 200) => {
	await page.route('**/api/repositories**', async (route) => {
		await route.fulfill({
			status,
			contentType: 'application/json',
			body: JSON.stringify(response)
		});
	});
};

test.describe('homepage', () => {
	test('shows the introduction, metadata and primary navigation', async ({ page }) => {
		await page.goto('/');

		await expect(page).toHaveTitle(/Hamza Ghani/);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://hufghani.dev/'
		);
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
		await expect(page.getByRole('link', { name: /Blog/ })).toHaveCount(0);
		await expect(page.getByRole('link', { name: /Projects/ })).toHaveAttribute('href', '/project');
		await expect(page.locator('main').getByRole('link', { name: /Experience/ })).toHaveAttribute(
			'href',
			'/experience'
		);
	});

	test('shows the privacy-conscious professional experience page', async ({ page }) => {
		await page.goto('/experience');

		await expect(page).toHaveTitle(/Professional Experience/);
		await expect(page.getByRole('heading', { level: 1, name: /Hamza Ghani\s*\./ })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Professional experience' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Technical Skills' })).toBeVisible();
	});

	test('covers the experience page skills, career history, education and certification', async ({ page }) => {
		await page.goto('/experience/');

		await expect(page).toHaveTitle(/Professional Experience/);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://hufghani.dev/experience/'
		);

		for (const heading of ['Frontend', 'Backend & APIs', 'Cloud & delivery', 'Testing & quality']) {
			await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
		}

		for (const technology of ['TypeScript', 'React', 'Node.js', 'AWS CDK', 'Playwright']) {
			await expect(page.getByText(technology, { exact: true })).toBeVisible();
		}

		await expect(page.getByRole('heading', { name: 'Professional experience' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Software Engineer · Booking.com', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Graduate Software Engineer · Booking.com', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Junior Software Developer · Team Netsol', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Certification' })).toBeVisible();
		await expect(page.getByText('AWS Certified Developer – Associate')).toBeVisible();
		await expect(page.getByRole('navigation', { name: 'Professional profiles' }).getByRole('link')).toHaveCount(2);
	});

	test('keeps the shared navigation mounted while route content transitions', async ({ page }) => {
		await mockRepositories(page);
		await page.goto('/');

		const navigation = page.getByRole('navigation', { name: 'Main navigation' });
		const navigationElement = await navigation.elementHandle();

		expect(navigationElement).not.toBeNull();

		await page.getByRole('link', { name: 'Project', exact: true }).click();
		await expect(page).toHaveURL(/\/project\/?$/);
		await expect(page.getByRole('heading', { level: 1, name: 'Projects.' })).toBeVisible();
		await expect.poll(() => navigationElement!.evaluate((element) => element.isConnected)).toBe(true);

		await navigation.getByRole('link', { name: 'Professional experience', exact: true }).click();
		await expect(page).toHaveURL(/\/experience\/?$/);
		await expect(page.getByRole('heading', { name: 'Technical Skills' })).toBeVisible();
		await expect.poll(() => navigationElement!.evaluate((element) => element.isConnected)).toBe(true);
	});

	test('switches between light and dark themes and remembers the selection', async ({ page }) => {
		await page.goto('/');

		await page.getByRole('button', { name: 'Switch to light mode' }).click();
		await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

		await page.reload();
		await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

		await page.getByRole('button', { name: 'Switch to dark mode' }).click();
		await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	});
});

test.describe('projects page', () => {
	test.beforeEach(async ({ page }) => {
		await mockRepositories(page);
		await page.goto('/project/');
	});

	test('renders project metadata, accessible search and project cards', async ({ page }) => {
		await expect(page).toHaveTitle(/Projects/);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://hufghani.dev/project/'
		);
		await expect(page.getByRole('heading', { level: 1, name: 'Projects.' })).toBeVisible();
		await expect(page.getByRole('searchbox', { name: 'Search projects' })).toBeVisible();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 1', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 9', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 10', exact: true })).toHaveCount(0);
	});

	test('filters projects and reflects the search in the URL', async ({ page }) => {
		const search = page.getByRole('searchbox', { name: 'Search projects' });
		await search.fill('Project 2');

		await expect(page.getByRole('heading', { level: 2, name: 'Project 2', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 1', exact: true })).toHaveCount(0);
		// URLSearchParams serializes spaces as +; accept either valid URL encoding.
		await expect.poll(() => new URL(page.url()).searchParams.get('q')).toBe('Project 2');
	});

	test('resets to the first page when searching from page two', async ({ page }) => {
		await page.getByRole('button', { name: 'Next page' }).click();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 10', exact: true })).toBeVisible();

		await page.getByRole('searchbox', { name: 'Search projects' }).fill('Project 2');
		await expect(page.getByRole('heading', { level: 2, name: 'Project 2', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 10', exact: true })).toHaveCount(0);
		await expect.poll(() => new URL(page.url()).searchParams.get('q')).toBe('Project 2');
		await expect(page).not.toHaveURL(/page=2/);
	});

	test('clears the search and restores all projects', async ({ page }) => {
		const search = page.getByRole('searchbox', { name: 'Search projects' });
		await search.fill('Project 2');
		await expect(page.getByRole('heading', { level: 2, name: 'Project 2', exact: true })).toBeVisible();

		await search.fill('');
		await expect(page.getByRole('heading', { level: 2, name: 'Project 1', exact: true })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Next page' })).toBeVisible();
		await expect.poll(() => new URL(page.url()).searchParams.get('q')).toBeNull();
	});

	test('restores filters and pagination from a directly opened URL', async ({ page }) => {
		await page.goto('/project/?q=Project&page=2');

		await expect(page.getByRole('searchbox', { name: 'Search projects' })).toHaveValue('Project');
		await expect(page.getByRole('heading', { level: 2, name: 'Project 10', exact: true })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
	});

	test('supports browser back and forward for pagination', async ({ page }) => {
		await page.getByRole('button', { name: 'Next page' }).click();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 10', exact: true })).toBeVisible();
		await expect(page).toHaveURL(/page=2/);

		await page.goBack();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 1', exact: true })).toBeVisible();
		await expect(page).not.toHaveURL(/page=2/);

		await page.goForward();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 10', exact: true })).toBeVisible();
	});

	test('exposes accessible pagination and keyboard focus', async ({ page }) => {
		const pagination = page.getByRole('navigation', { name: 'Project pagination' });
		await expect(pagination).toBeVisible();
		await expect(pagination.getByRole('button', { name: 'Previous page' })).toBeDisabled();
		await expect(pagination.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');
		await page.getByRole('searchbox', { name: 'Search projects' }).focus();
		await page.keyboard.press('Tab');
		await expect(page.locator('a[href="https://github.com/HUFGhani/project-1"]')).toBeFocused();
	});

	test('paginates projects and updates the page query parameter', async ({ page }) => {
		await page.getByRole('button', { name: 'Next page' }).click();

		await expect(page.getByRole('heading', { level: 2, name: 'Project 10', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 1', exact: true })).toHaveCount(0);
		await expect(page).toHaveURL(/page=2/);

		await page.getByRole('button', { name: 'Previous page' }).click();
		await expect(page.getByRole('heading', { level: 2, name: 'Project 1', exact: true })).toBeVisible();
		await expect(page).not.toHaveURL(/page=2/);
	});

	test('shows an empty state when the search has no matches', async ({ page }) => {
		await page.getByRole('searchbox', { name: 'Search projects' }).fill('no matching project');
		await expect(page.getByRole('status')).toContainText('No projects found');
		await expect(page.getByRole('button', { name: 'Next page' })).toHaveCount(0);
	});

	test('shows a useful message when the API returns no projects', async ({ page }) => {
		await page.unroute('**/api/repositories**');
		await mockRepositories(page, emptyRepositoryResponse);
		await page.goto('/project/');
		await expect(page.getByRole('status')).toContainText('No projects found');
	});

	test('shows a recoverable message when the repository API fails', async ({ page }) => {
		await page.unroute('**/api/repositories**');
		await mockRepositories(page, {}, 500);
		await page.goto('/project/');
		await expect(page.getByRole('status')).toContainText('Unable to load projects');
		await expect(page.getByRole('status')).toContainText('Please refresh the page to try again.');
	});

	test('does not display archived, template or excluded repositories', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 2, name: 'Archived Project' })).toHaveCount(0);
		await expect(page.getByRole('heading', { level: 2, name: 'Template Project' })).toHaveCount(0);
		await expect(page.getByRole('heading', { level: 2, name: 'hufghani dev' })).toHaveCount(0);
	});
});

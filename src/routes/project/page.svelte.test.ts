import { fireEvent, render, waitFor } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import Page from './+page.svelte';

const repositories = Array.from({ length: 11 }, (_, index) => ({
	name: `Project ${index + 1}`,
	url: `https://github.com/HUFGhani/project-${index + 1}`,
	description: `Description for project ${index + 1}`,
	isArchived: false,
	isTemplate: false,
	primaryLanguage: { name: 'TypeScript' }
}));

const pageData = {
	viewer: { repositories: { nodes: repositories } },
	loadError: false
};

const renderProjectsPage = () => render(Page, { props: { data: pageData as never } });

describe('projects page', () => {
	beforeEach(() => {
		window.history.replaceState({}, '', '/project/');
	});

	it('renders the page introduction, search field and SEO title', async () => {
		const { getByRole } = renderProjectsPage();

		expect(getByRole('heading', { level: 1, name: /Projects/ })).toBeInTheDocument();
		expect(getByRole('searchbox', { name: 'Search projects' })).toBeInTheDocument();
		await waitFor(() =>
			expect(getByRole('heading', { level: 2, name: 'Project 1' })).toBeInTheDocument()
		);
		expect(document.title).toContain('Projects');
		expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://hufghani.dev/project/'
		);
	});

	it('shows projects in pages of nine and navigates to the next page', async () => {
		const { getByRole, queryByRole } = renderProjectsPage();

		await waitFor(() =>
			expect(getByRole('heading', { level: 2, name: 'Project 1' })).toBeInTheDocument()
		);
		expect(getByRole('heading', { level: 2, name: 'Project 9' })).toBeInTheDocument();
		expect(queryByRole('heading', { level: 2, name: 'Project 10' })).not.toBeInTheDocument();

		await fireEvent.click(getByRole('button', { name: 'Next page' }));

		await waitFor(() => {
			expect(getByRole('heading', { level: 2, name: 'Project 10' })).toBeInTheDocument();
			expect(queryByRole('heading', { level: 2, name: 'Project 1' })).not.toBeInTheDocument();
		});
		expect(window.location.search).toContain('page=2');
	});

	it('resets pagination when a new search is entered', async () => {
		const { getByRole, queryByRole } = renderProjectsPage();
		await waitFor(() => expect(getByRole('button', { name: 'Next page' })).toBeInTheDocument());
		await fireEvent.click(getByRole('button', { name: 'Next page' }));
		await waitFor(() => expect(getByRole('heading', { level: 2, name: 'Project 10' })).toBeInTheDocument());

		await fireEvent.input(getByRole('searchbox', { name: 'Search projects' }), {
			target: { value: 'Project 1' }
		});

		await waitFor(() => {
			expect(getByRole('heading', { level: 2, name: 'Project 1' })).toBeInTheDocument();
			expect(queryByRole('button', { name: 'Next page' })).not.toBeInTheDocument();
		});
		expect(window.location.search).toContain('q=Project');
		expect(window.location.search).not.toContain('page=');
	});

	it('filters projects and updates the URL when the search changes', async () => {
		const { getByRole, queryByRole } = renderProjectsPage();
		await waitFor(() =>
			expect(getByRole('heading', { level: 2, name: 'Project 1' })).toBeInTheDocument()
		);
		await fireEvent.input(getByRole('searchbox', { name: 'Search projects' }), {
			target: { value: 'Project 2' }
		});

		await waitFor(() => {
			expect(getByRole('heading', { level: 2, name: 'Project 2' })).toBeInTheDocument();
			expect(queryByRole('heading', { level: 2, name: 'Project 1' })).not.toBeInTheDocument();
		});
		expect(window.location.search).toContain('q=Project');
		expect(window.location.search).not.toContain('page=');
	});

	it('restores the search and page from the URL on mount', async () => {
		window.history.replaceState({}, '', '/project/?q=Project&page=2');
		const { getByRole, queryByRole } = renderProjectsPage();

		await waitFor(() => {
			expect(getByRole('searchbox', { name: 'Search projects' })).toHaveValue('Project');
			expect(getByRole('heading', { level: 2, name: 'Project 10' })).toBeInTheDocument();
		});
		expect(queryByRole('heading', { level: 2, name: 'Project 1' })).not.toBeInTheDocument();
	});

	it('restores the selected page when browser history changes', async () => {
		const { getByRole, queryByRole } = renderProjectsPage();
		await waitFor(() => expect(getByRole('button', { name: 'Next page' })).toBeInTheDocument());
		await fireEvent.click(getByRole('button', { name: 'Next page' }));

		await waitFor(() => expect(getByRole('heading', { level: 2, name: 'Project 10' })).toBeInTheDocument());
		window.history.back();
		await fireEvent(window, new PopStateEvent('popstate'));

		await waitFor(() => {
			expect(getByRole('heading', { level: 2, name: 'Project 1' })).toBeInTheDocument();
			expect(queryByRole('heading', { level: 2, name: 'Project 10' })).not.toBeInTheDocument();
		});
	});

	it('shows an empty state when no projects match', async () => {
		const { getByRole, getByText } = renderProjectsPage();
		await waitFor(() =>
			expect(getByRole('heading', { level: 2, name: 'Project 1' })).toBeInTheDocument()
		);
		await fireEvent.input(getByRole('searchbox', { name: 'Search projects' }), {
			target: { value: 'no matching project' }
		});

		await waitFor(() => expect(getByText('No projects found')).toBeInTheDocument());
	});

	it('shows a separate message when repository loading fails', () => {
		const { getByRole } = render(Page, {
			props: {
				data: {
					viewer: { repositories: { nodes: [] } },
					loadError: true
				} as never
			}
		});

		expect(getByRole('status')).toHaveTextContent('Unable to load projects');
		expect(getByRole('status')).toHaveTextContent('Please refresh the page to try again.');
	});
});

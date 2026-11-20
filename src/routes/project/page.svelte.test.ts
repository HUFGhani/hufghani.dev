import '@testing-library/jest-dom/vitest';
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
	viewer: {
		repositories: {
			nodes: [
				...repositories,
				{
					name: 'Archived Project',
					url: 'https://github.com/HUFGhani/archived',
					description: 'Should not be listed',
					isArchived: true,
					isTemplate: false,
					primaryLanguage: { name: 'JavaScript' }
				},
				{
					name: 'Template Project',
					url: 'https://github.com/HUFGhani/template',
					description: 'Should not be listed',
					isArchived: false,
					isTemplate: true,
					primaryLanguage: { name: 'JavaScript' }
				},
				{
					name: 'hufghani dev',
					url: 'https://github.com/HUFGhani/hufghani.dev',
					description: 'The portfolio repository',
					isArchived: false,
					isTemplate: false,
					primaryLanguage: { name: 'Svelte' }
				}
			]
		}
	}
};

const renderProjectsPage = () => render(Page, { props: { data: pageData as never } });

describe('projects page', () => {
	beforeEach(() => {
		window.history.replaceState({}, '', '/project/');
	});

	it('renders the page introduction and search field', async () => {
		const { getByRole } = renderProjectsPage();

		expect(getByRole('heading', { level: 1, name: /Projects/ })).toBeInTheDocument();
		expect(getByRole('textbox', { name: 'Search projects' })).toBeInTheDocument();
		await waitFor(() =>
			expect(getByRole('heading', { level: 2, name: 'Project 1' })).toBeInTheDocument()
		);
	});

	it('shows projects in pages of nine and navigates to the next page', async () => {
		const { getByRole, queryByRole } = renderProjectsPage();

		await waitFor(() =>
			expect(getByRole('heading', { level: 2, name: 'Project 1' })).toBeInTheDocument()
		);
		expect(getByRole('heading', { level: 2, name: 'Project 9' })).toBeInTheDocument();
		expect(queryByRole('heading', { level: 2, name: 'Project 10' })).not.toBeInTheDocument();

		fireEvent.click(getByRole('button', { name: 'Next page' }));

		await waitFor(() => {
			expect(getByRole('heading', { level: 2, name: 'Project 10' })).toBeInTheDocument();
			expect(queryByRole('heading', { level: 2, name: 'Project 1' })).not.toBeInTheDocument();
		});
		expect(window.location.search).toContain('page=2');
	});

	it('filters projects from the search input and updates the URL', async () => {
		const { getByRole, queryByRole } = renderProjectsPage();
		const search = getByRole('textbox', { name: 'Search projects' });

		await waitFor(() => expect(getByRole('heading', { level: 2, name: 'Project 1' })).toBeInTheDocument());
		await fireEvent.input(search, { target: { value: 'Project 2' } });

		await waitFor(() => {
			expect(getByRole('heading', { level: 2, name: 'Project 2' })).toBeInTheDocument();
			expect(queryByRole('heading', { level: 2, name: 'Project 1' })).not.toBeInTheDocument();
		});
		expect(window.location.search).toContain('q=Project');
	});

	it('shows the empty state when no projects match', async () => {
		const { getByRole, getByText } = renderProjectsPage();
		const search = getByRole('textbox', { name: 'Search projects' });

		await waitFor(() =>
			expect(getByRole('heading', { level: 2, name: 'Project 1' })).toBeInTheDocument()
		);
		await fireEvent.input(search, { target: { value: 'no matching project' } });

		await waitFor(() => {
			expect(getByText(/No projects found/i)).toBeInTheDocument();
		});
	});

	it('excludes archived, template and non-project repositories', async () => {
		const { queryByRole } = renderProjectsPage();

		await waitFor(() =>
			expect(queryByRole('heading', { level: 2, name: 'Project 1' })).toBeInTheDocument()
		);
		expect(queryByRole('heading', { level: 2, name: 'Archived Project' })).not.toBeInTheDocument();
		expect(queryByRole('heading', { level: 2, name: 'Template Project' })).not.toBeInTheDocument();
		expect(queryByRole('heading', { level: 2, name: 'hufghani dev' })).not.toBeInTheDocument();
	});
});

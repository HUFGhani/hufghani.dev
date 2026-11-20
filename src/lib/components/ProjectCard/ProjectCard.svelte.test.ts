import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ProjectCard from './ProjectCard.svelte';

const project = {
	url: 'https://github.com/example/project',
	title: 'Example Project',
	description: 'A useful project description.',
	language: 'TypeScript',
	languageIcon: 'typescript/typescript-original.svg'
};

describe('ProjectCard', () => {
	it('renders the project details and repository link', () => {
		const { getByRole, getByText } = render(ProjectCard, { props: { project } });
		const link = getByRole('link', { name: /Example Project/ });

		expect(link).toHaveAttribute('href', project.url);
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
		expect(getByText(project.description)).toBeInTheDocument();
		expect(getByText(project.language)).toBeInTheDocument();
	});

	it('shows a fallback description and repository label when details are missing', () => {
		const { getByText } = render(ProjectCard, {
			props: { project: { url: project.url, title: project.title } }
		});

		expect(getByText('A personal project and exploration in software development.')).toBeInTheDocument();
		expect(getByText('Repository')).toBeInTheDocument();
	});
});

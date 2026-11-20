import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Page from './+page.svelte';

describe('homepage', () => {
	it('renders the introduction, primary project link and SEO metadata', () => {
		const { getByRole, getByText } = render(Page);

		expect(getByRole('heading', { level: 1, name: /Hello, I'm Hamza/ })).toBeInTheDocument();
		expect(getByText(/turning complex problems into clear, useful experiences/)).toBeInTheDocument();
		expect(getByRole('link', { name: /Explore my work/ })).toHaveAttribute('href', '/project');
		expect(document.title).toContain('Hamza Ghani');
		expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://hufghani.dev/'
		);
	});

	it('shows the main overview links and keeps writing hidden by default', () => {
		const { getByRole, queryByRole } = render(Page);

		expect(getByRole('link', { name: /Projects/ })).toHaveAttribute('href', '/project');
		expect(getByRole('link', { name: /Experience/ })).toHaveAttribute(
			'href',
			'/docs/Curriculum-Vitae.pdf'
		);
		expect(queryByRole('link', { name: /Writing/ })).not.toBeInTheDocument();
	});

	it('renders the contact section and LinkedIn link', () => {
		const { getByRole, getByText } = render(Page);

		expect(getByText('Have something in mind?')).toBeInTheDocument();
		expect(getByRole('link', { name: /Connect on LinkedIn/ })).toHaveAttribute(
			'href',
			'https://www.linkedin.com/in/hamza-u-f-ghani/'
		);
	});
});

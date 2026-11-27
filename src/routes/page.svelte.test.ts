import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Page from './+page.svelte';

describe('homepage', () => {
	it('renders the professional introduction, primary links and SEO metadata', () => {
		const { getByRole, getByText, queryByText } = render(Page);

		expect(getByRole('heading', { level: 1, name: /Hello, I'm Hamza/ })).toBeInTheDocument();
		expect(getByText(/frontend engineering, reliable systems/)).toBeInTheDocument();
		expect(getByRole('link', { name: /Explore my work/ })).toHaveAttribute('href', '/project');
		expect(getByRole('link', { name: 'Professional experience', exact: true })).toHaveAttribute('href', '/experience');
		expect(document.title).toContain('Hamza Ghani');
		expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
			'content',
			'Software engineer focused on frontend engineering, reliable systems and thoughtful digital experiences.'
		);
		expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://hufghani.dev/'
		);
		expect(queryByText(/husband|dad|Manchester/i)).not.toBeInTheDocument();
	});

	it('shows the main overview links and keeps writing hidden by default', () => {
		const { getByRole, queryByRole } = render(Page);

		expect(getByRole('link', { name: /Projects/ })).toHaveAttribute('href', '/project');
		expect(getByRole('link', { name: /Experience/ })).toHaveAttribute('href', '/experience');
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

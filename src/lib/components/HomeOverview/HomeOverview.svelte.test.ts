import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import HomeOverview from './HomeOverview.svelte';

describe('HomeOverview', () => {
	it('renders project and experience links by default', () => {
		const { getByRole, queryByRole } = render(HomeOverview);

		expect(getByRole('heading', { name: 'What I’m about' })).toBeInTheDocument();
		expect(getByRole('link', { name: /Projects/ })).toHaveAttribute('href', '/project');
		expect(getByRole('link', { name: /Experience/ })).toHaveAttribute('href', '/docs/Curriculum-Vitae.pdf');
		expect(queryByRole('link', { name: /Writing/ })).not.toBeInTheDocument();
	});

	it('shows the writing link only when the blog feature is enabled', () => {
		const { getByRole } = render(HomeOverview, { props: { showBlog: true } });

		expect(getByRole('link', { name: /Writing/ })).toHaveAttribute('href', '/blog');
	});
});

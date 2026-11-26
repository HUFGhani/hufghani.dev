import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import HomeHero from './HomeHero.svelte';

describe('HomeHero', () => {
	it('renders a minimal professional introduction and project links', () => {
		const { getByRole, getByText, queryByText } = render(HomeHero);

		expect(getByRole('heading', { level: 1 })).toHaveTextContent("Hello, I'm Hamza.");
		expect(getByText(/frontend engineering, reliable systems/)).toBeInTheDocument();
		expect(getByRole('link', { name: /Explore my work/ })).toHaveAttribute('href', '/project');
		expect(getByRole('link', { name: /Professional experience/ })).toHaveAttribute('href', '/experience');
		expect(queryByText(/husband|dad|Manchester|Booking[.]com/i)).not.toBeInTheDocument();
	});
});

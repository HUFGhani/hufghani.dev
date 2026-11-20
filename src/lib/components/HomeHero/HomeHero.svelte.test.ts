import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import HomeHero from './HomeHero.svelte';

describe('HomeHero', () => {
	it('renders the introduction and project call to action', () => {
		const { getByRole, getByText } = render(HomeHero);

		expect(getByRole('heading', { level: 1 })).toHaveTextContent("Hello, I'm Hamza.");
		expect(getByRole('link', { name: /Explore my work/ })).toHaveAttribute('href', '/project');
		expect(getByText(/Software Engineer at/)).toBeInTheDocument();
		expect(getByRole('link', { name: 'Booking.com' })).toHaveAttribute('href', 'https://www.booking.com/');
	});
});

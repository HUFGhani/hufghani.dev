import { fireEvent, render } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import NavBar from './NavBar.svelte';

describe('NavBar', () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute('data-theme');
	});

	it('renders the home link and theme control', () => {
		const { getByRole } = render(NavBar);

		expect(getByRole('link', { name: 'hufghani.dev home' })).toBeInTheDocument();
		expect(getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();
	});

	it('restores the saved theme on mount', () => {
		localStorage.setItem('theme', 'light');

		const { getByRole } = render(NavBar);

		expect(document.documentElement).toHaveAttribute('data-theme', 'light');
		expect(getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
	});

	it('toggles and persists the selected theme', async () => {
		const { getByRole } = render(NavBar);

		await fireEvent.click(getByRole('button', { name: 'Switch to light mode' }));

		expect(document.documentElement).toHaveAttribute('data-theme', 'light');
		expect(localStorage.getItem('theme')).toBe('light');
		expect(getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
	});
});

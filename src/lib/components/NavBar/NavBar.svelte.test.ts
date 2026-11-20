import { fireEvent, render } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import NavBar from './NavBar.svelte';

describe('NavBar', () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute('data-theme');
	});

	it('renders the home link, primary navigation and theme control', () => {
		const { getByRole, queryByRole } = render(NavBar);

		expect(getByRole('link', { name: 'hufghani.dev home' })).toBeInTheDocument();
		expect(getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
		expect(getByRole('link', { name: 'Project' })).toHaveAttribute('href', '/project');
		expect(getByRole('link', { name: 'Curriculum Vitae' })).toHaveAttribute(
			'href',
			'/docs/Curriculum-Vitae.pdf'
		);
		expect(queryByRole('link', { name: 'Blog' })).not.toBeInTheDocument();
		expect(getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();
	});

	it('restores the saved light theme on mount', () => {
		localStorage.setItem('theme', 'light');

		const { getByRole } = render(NavBar);

		expect(document.documentElement).toHaveAttribute('data-theme', 'light');
		expect(getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
	});

	it('restores the saved dark theme on mount', () => {
		localStorage.setItem('theme', 'dark');

		const { getByRole } = render(NavBar);

		expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
		expect(getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();
	});

	it('toggles and persists the selected theme', async () => {
		const { getByRole } = render(NavBar);

		await fireEvent.click(getByRole('button', { name: 'Switch to light mode' }));

		expect(document.documentElement).toHaveAttribute('data-theme', 'light');
		expect(localStorage.getItem('theme')).toBe('light');
		expect(getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();

		await fireEvent.click(getByRole('button', { name: 'Switch to dark mode' }));

		expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
		expect(localStorage.getItem('theme')).toBe('dark');
		expect(getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();
	});
});

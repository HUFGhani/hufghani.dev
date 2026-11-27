import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Page from './+page.svelte';

describe('experience page', () => {
	it('renders a professional CV without personal contact or family details', () => {
		const { getByRole, getByText, queryByText } = render(Page);

		expect(getByRole('heading', { level: 1, name: /Hamza Ghani\s*\./ })).toBeInTheDocument();
		expect(getByRole('heading', { name: 'Professional experience' })).toBeInTheDocument();
		expect(getByRole('heading', { name: /Software Engineer\\s*·\\s*Booking[.]com/ })).toBeInTheDocument();
		expect(queryByText(/husband|father|dad|Manchester, UK|@/i)).not.toBeInTheDocument();
		expect(document.title).toContain('Professional Experience');
		expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://hufghani.dev/experience/'
		);
	});

	it('shows technology tags as static labels and keeps all experience visible', () => {
		const { getByText, queryByRole, getByRole } = render(Page);

		expect(getByRole('heading', { name: 'Technical Skills' })).toBeInTheDocument();
		expect(getByText('TypeScript').tagName).toBe('SPAN');
		expect(queryByRole('button', { name: 'TypeScript' })).not.toBeInTheDocument();
		expect(getByRole('heading', { name: 'Software Engineer · Booking.com' })).toBeInTheDocument();
		expect(getByRole('heading', { name: 'Graduate Software Engineer · Booking.com' })).toBeInTheDocument();
		expect(getByRole('heading', { name: 'Junior Software Developer · Team Netsol' })).toBeInTheDocument();
	});

	it('provides professional profile links', () => {
		const { getByRole } = render(Page);

		expect(getByRole('link', { name: /LinkedIn/ })).toHaveAttribute(
			'href',
			'https://www.linkedin.com/in/hamza-u-f-ghani/'
		);
		expect(getByRole('link', { name: /GitHub/ })).toHaveAttribute(
			'href',
			'https://github.com/HUFGhani'
		);
	});
});

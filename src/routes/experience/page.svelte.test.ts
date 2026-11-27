import { fireEvent, render, waitFor } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Page from './+page.svelte';

describe('experience page', () => {
	it('renders a professional CV without personal contact or family details', () => {
		const { getByRole, getByText, queryByText } = render(Page);

		expect(getByRole('heading', { level: 1, name: 'Hamza Ghani.' })).toBeInTheDocument();
		expect(getByRole('heading', { name: 'Professional experience' })).toBeInTheDocument();
		expect(getByText(/Software Engineer · Booking[.]com/)).toBeInTheDocument();
		expect(queryByText(/husband|father|dad|Manchester, UK|@/i)).not.toBeInTheDocument();
		expect(document.title).toContain('Professional Experience');
		expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://hufghani.dev/experience/'
		);
	});

	it('connects technology selections to relevant experience', async () => {
		const { getByRole, getAllByTestId } = render(Page);
		const typescript = getByRole('button', { name: 'TypeScript' });

		await fireEvent.click(typescript);

		await waitFor(() => {
			expect(typescript).toHaveAttribute('aria-pressed', 'true');
			expect(getAllByTestId('experience-entry')[0]).not.toHaveClass('opacity-35');
			expect(getAllByTestId('experience-entry')[2]).toHaveClass('opacity-35');
		});

		await fireEvent.click(getByRole('button', { name: /Clear filter/ }));

		await waitFor(() => {
			expect(typescript).toHaveAttribute('aria-pressed', 'false');
			expect(getAllByTestId('experience-entry')[2]).not.toHaveClass('opacity-35');
		});
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

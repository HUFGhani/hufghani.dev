import { fireEvent, render } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import ProjectPagination from './ProjectPagination.svelte';

describe('ProjectPagination', () => {
	it('renders the result range and available pages', () => {
		const { getByText, getByRole } = render(ProjectPagination, {
			props: {
				currentPage: 2,
				totalPages: 3,
				firstResult: 10,
				lastResult: 18,
				totalResults: 24,
				onPageChange: vi.fn()
			}
		});

		expect(getByText('Showing 10–18 of 24 projects')).toBeInTheDocument();
		expect(getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
		expect(getByRole('button', { name: 'Page 1' })).toBeInTheDocument();
		expect(getByRole('button', { name: 'Page 3' })).toBeInTheDocument();
	});

	it('disables previous and next controls at the boundaries', () => {
		const { getByRole, rerender } = render(ProjectPagination, {
			props: {
				currentPage: 1,
				totalPages: 2,
				firstResult: 1,
				lastResult: 9,
				totalResults: 10,
				onPageChange: vi.fn()
			}
		});

		expect(getByRole('button', { name: 'Previous page' })).toBeDisabled();
		expect(getByRole('button', { name: 'Next page' })).toBeEnabled();

		rerender({
			currentPage: 2,
			totalPages: 2,
			firstResult: 10,
			lastResult: 10,
			totalResults: 10,
			onPageChange: vi.fn()
		});

		expect(getByRole('button', { name: 'Previous page' })).toBeEnabled();
		expect(getByRole('button', { name: 'Next page' })).toBeDisabled();
	});

	it('calls the page change callback when a page is selected', async () => {
		const onPageChange = vi.fn();
		const { getByRole } = render(ProjectPagination, {
			props: {
				currentPage: 1,
				totalPages: 3,
				firstResult: 1,
				lastResult: 9,
				totalResults: 24,
				onPageChange
			}
		});

		await fireEvent.click(getByRole('button', { name: 'Page 3' }));
		expect(onPageChange).toHaveBeenCalledWith(3);
		await fireEvent.click(getByRole('button', { name: 'Next page' }));
		expect(onPageChange).toHaveBeenLastCalledWith(2);
	});

	it('does not render when pagination is unnecessary', () => {
		const { queryByRole } = render(ProjectPagination, {
			props: {
				currentPage: 1,
				totalPages: 1,
				firstResult: 1,
				lastResult: 5,
				totalResults: 5,
				onPageChange: vi.fn()
			}
		});

		expect(queryByRole('navigation', { name: 'Project pagination' })).not.toBeInTheDocument();
	});
});

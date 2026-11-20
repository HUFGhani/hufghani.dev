import { fireEvent, render } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import ProjectSearch from './ProjectSearch.svelte';

describe('ProjectSearch', () => {
	it('renders an accessible search input with its current value', () => {
		const { getByRole } = render(ProjectSearch, {
			props: { value: 'typescript', onChange: vi.fn() }
		});

		expect(getByRole('textbox', { name: 'Search projects' })).toHaveValue('typescript');
	});

	it('passes the updated search value to the change callback', async () => {
		const onChange = vi.fn();
		const { getByRole } = render(ProjectSearch, {
			props: { value: '', onChange }
		});

		await fireEvent.input(getByRole('textbox', { name: 'Search projects' }), {
			target: { value: 'svelte' }
		});

		expect(onChange).toHaveBeenCalledWith('svelte');
	});
});

import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ProjectEmptyState from './ProjectEmptyState.svelte';

describe('ProjectEmptyState', () => {
	it('explains that no projects match and suggests another search', () => {
		const { getByText } = render(ProjectEmptyState);

		expect(getByText('No projects found')).toBeInTheDocument();
		expect(getByText('Try another search term.')).toBeInTheDocument();
	});
});

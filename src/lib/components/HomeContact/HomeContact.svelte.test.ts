import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import HomeContact from './HomeContact.svelte';

describe('HomeContact', () => {
	it('renders the contact message and LinkedIn link', () => {
		const { getByRole, getByText } = render(HomeContact);

		expect(getByText('Have something in mind?')).toBeInTheDocument();
		expect(getByRole('link', { name: /Connect on LinkedIn/ })).toHaveAttribute(
			'href',
			'https://www.linkedin.com/in/hamza-u-f-ghani/'
		);
	});
});

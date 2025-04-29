import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	test('should render h1', () => {
		const {getByRole}=render(Page);
		expect(getByRole('heading', { level: 1 })).toBeInTheDocument();
	});
});

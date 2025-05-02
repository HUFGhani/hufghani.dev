import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import MetaTags from './MetaTags.svelte';

describe('MetaTags.svelte', () => {
	it('renders with required props', () => {
		const { container } = render(MetaTags, {
			props: {
				pageTitle: 'Test Page',
				pageDescription: 'This is a test description.',
				ogType: 'website'
			}
		});

		expect(container).toBeTruthy();
	});

	it('renders OpenGraph article data when provided', () => {
		const { container } = render(MetaTags, {
			props: {
				pageTitle: 'Test Article',
				pageDescription: 'This is a test article description.',
				ogType: 'article',
				OpenGraphArticle: {
					publishedTime: '2023-01-01T00:00:00Z',
					section: 'Technology',
					tags: ['Svelte', 'Testing']
				}
			}
		});

		expect(container).toBeTruthy();
	});
});

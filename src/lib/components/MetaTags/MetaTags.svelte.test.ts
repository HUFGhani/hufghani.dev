import { render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import MetaTags from './MetaTags.svelte';

describe('MetaTags', () => {
	afterEach(() => {
		document.head.innerHTML = '';
	});

	it('renders the page title, description and canonical URL', () => {
		render(MetaTags, {
			props: {
				pageTitle: 'Test Page',
				pageDescription: 'This is a test description.',
				ogType: 'website'
			}
		});

		expect(document.title).toBe('Test Page - Hamza U. F. Ghani');
		expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
			'content',
			'This is a test description.'
		);
		expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://hufghani.dev/'
		);
	});

	it('uses the supplied page path for canonical and Open Graph URLs', () => {
		render(MetaTags, {
			props: {
				pageTitle: 'Projects',
				pageDescription: 'Selected projects.',
				pagePath: '/project/',
				ogType: 'website'
			}
		});

		expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://hufghani.dev/project/'
		);
		expect(document.head.querySelector('meta[property="og:url"]')).toHaveAttribute(
			'content',
			'https://hufghani.dev/project/'
		);
		expect(document.head.querySelector('meta[property="og:title"]')).toHaveAttribute(
			'content',
			'Projects - Hamza U. F. Ghani'
		);
	});

	it('renders article metadata when article details are provided', () => {
		render(MetaTags, {
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

		expect(document.head.querySelector('meta[property="og:type"]')).toHaveAttribute(
			'content',
			'article'
		);
		expect(document.head.querySelector('meta[property="article:published_time"]')).toHaveAttribute(
			'content',
			'2023-01-01T00:00:00Z'
		);
		expect(document.head.querySelector('meta[property="article:section"]')).toHaveAttribute(
			'content',
			'Technology'
		);
		expect(
			Array.from(document.head.querySelectorAll('meta[property="article:tag"]')).map((meta) =>
				meta.getAttribute('content')
			)
		).toEqual(['Svelte', 'Testing']);
	});
});

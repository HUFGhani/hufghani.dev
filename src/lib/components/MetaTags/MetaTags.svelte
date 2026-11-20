<script lang="ts">
	import { AUTHORNAME, WEBSITE } from '$lib/config';
	import { MetaTags } from 'svelte-meta-tags';

	type ogTypes = 'article' | 'website';
	interface ogArticle {
		publishedTime: string;
		modifiedTime?: string;
		section: string;
		tags: string[];
	}

	export let pageTitle: string;
	export let pageDescription: string;
	export let ogType: ogTypes;
	export let pagePath = '/';
	export let OpenGraphArticle: ogArticle | undefined = undefined;

	$: canonicalUrl = `https://${WEBSITE}${pagePath}`;
</script>

<MetaTags
	title={pageTitle}
	titleTemplate={`%s - ${AUTHORNAME}`}
	description={pageDescription}
	canonical={canonicalUrl}
	openGraph={{
		url: canonicalUrl,
		title: `${pageTitle} - ${AUTHORNAME}`,
		description: pageDescription,
		images: [
			{
				url: `https://og.${WEBSITE}?title=${encodeURIComponent(pageTitle)}&description=${encodeURIComponent(pageDescription)}`,
				width: 900,
				height: 800,
				alt: `Open Graph image for ${pageTitle}`
			}
		],
		locale: 'en-gb',
		siteName: WEBSITE,
		type: ogType,
		article: {
			...OpenGraphArticle,
			authors: [AUTHORNAME]
		}
	}}
/>

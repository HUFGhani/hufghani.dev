<script lang="ts">
	import { AUTHORNAME, META_DATA, WEBSITE } from '$lib/info'

	import { MetaTags } from 'svelte-meta-tags'
	export let pageTitle: string
	export let pageDescription: any
</script>

<MetaTags
	title={pageTitle}
	titleTemplate="%s - {AUTHORNAME}"
	description={pageDescription}
	canonical="https://{WEBSITE}/"
	openGraph={{
		url: ` https://${WEBSITE}/`,
		title: `${pageTitle} - ${AUTHORNAME}`,
		description: pageDescription,
		// images: [
		// 	{
		// 		url: 'https://www.example.ie/og-image-01.jpg',
		// 		width: 800,
		// 		height: 600,
		// 		alt: 'Og Image Alt',
		// 	},
		// 	{
		// 		url: 'https://www.example.ie/og-image-02.jpg',
		// 		width: 900,
		// 		height: 800,
		// 		alt: 'Og Image Alt Second',
		// 	},
		// 	{ url: 'https://www.example.ie/og-image-03.jpg' },
		// 	{ url: 'https://www.example.ie/og-image-04.jpg' },
		// ],
		site_name: `https://${WEBSITE}/`,
	}}
	twitter={{
		handle: META_DATA.twitter,
		site: `https://${WEBSITE}/`,
		cardType: 'summary_large_image',
		title: `${pageTitle} - ${AUTHORNAME}`,
		description: pageDescription,
		// image: 'https://www.example.ie/twitter-image.jpg',
		// imageAlt: 'Twitter image alt',
	}}
/>

<script lang="ts">
	import { AUTHORNAME, WEBSITE } from '$lib/info'
	import { MetaTags } from 'svelte-meta-tags'


 	type ogTypes = "article" | "website"
	interface ogArticle {
		publishedTime: string,
		modifiedTime?: string,
		section: string,
		tags: [string],
	}

	export let pageTitle: string
	export let pageDescription: string
	export let ogType: ogTypes
	export let OpenGraphArticle: ogArticle | undefined = undefined

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
		// 		url: 'https://www.example.ie/og-image-02.jpg',
		// 		width: 900,
		// 		height: 800,
		// 		alt: 'Og Image Alt Second',
		// 	},
		// ],
		locale:"en-gb",
		siteName: `https://${WEBSITE}/`,
		type: ogType,
		article:{
			...OpenGraphArticle,
			authors: [AUTHORNAME],
		}
	}}
	
/>

<script lang="ts">
	import { getContext } from 'svelte';
	import { MetaTags } from '$lib/components/MetaTags';
	import { HomeContact } from '$lib/components/HomeContact';
	import { HomeHero } from '$lib/components/HomeHero';
	import { HomeOverview } from '$lib/components/HomeOverview';

	const featureFlags = getContext<Record<string, boolean>>('featureFlags');
</script>

<MetaTags
	pageTitle="Hamza Ghani — Software Engineer"
	pageDescription="Hamza Ghani is a software engineer based in Manchester, building thoughtful digital experiences and sharing what he learns along the way."
	ogType="website"
/>

<HomeHero />
<HomeOverview showBlog={featureFlags?.showBlog === true} />
<HomeContact />

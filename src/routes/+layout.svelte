<script lang="ts">
	import { FeatureFlagsProvider } from '$lib/components/FeatureFlagsProvider';
	import { Footer } from '$lib/components/Footer';
	import { NavBar } from '$lib/components/NavBar';
	import { FeatureFlagsList } from '$lib/config';
	import '../app.css';

	let { children } = $props();
</script>

<FeatureFlagsProvider flags={FeatureFlagsList}>
	<div class="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 sm:px-8 lg:px-12">
		<NavBar />
		<main class="w-full flex-1 pb-24 pt-12 sm:pt-16 lg:pt-20">
			{@render children()}
		</main>
		<Footer />
	</div>
</FeatureFlagsProvider>

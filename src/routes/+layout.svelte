<script lang="ts">
	import { page } from '$app/state';
	import { FeatureFlagsProvider } from '$lib/components/FeatureFlagsProvider';
	import { Footer } from '$lib/components/Footer';
	import { NavBar } from '$lib/components/NavBar';
	import { FeatureFlagsList } from '$lib/config';
	import '../app.css';

	let { children } = $props();

	function pageTransition(_node: Element, { duration = 280 }: { duration?: number } = {}) {
		const reduceMotion =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		return {
			duration: reduceMotion ? 0 : duration,
			css: (t: number) =>
				`opacity: ${t}; transform: translate3d(0, ${(1 - t) * 10}px, 0);`
		};
	}

</script>

<FeatureFlagsProvider flags={FeatureFlagsList}>
	<a href="#main-content" class="btn btn-sm btn-primary fixed left-4 top-4 z-50 -translate-y-24 focus:translate-y-0">Skip to content</a>
	<div class="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 sm:px-8 lg:px-12">
		<NavBar />
		<main id="main-content" tabindex="-1" class="w-full flex-1 pb-24 pt-12 sm:pt-16 lg:pt-20">
			{#key $page.url.pathname}
				<div transition:pageTransition={{ duration: 280 }}>
					{@render children()}
				</div>
			{/key}
		</main>
		<Footer />
	</div>
</FeatureFlagsProvider>

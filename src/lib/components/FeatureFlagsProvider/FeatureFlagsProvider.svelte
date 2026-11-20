<script lang="ts">
	import { setContext, type Snippet } from 'svelte';

	type FeatureFlags = Record<string, boolean>;

	let { children, flags }: { children: Snippet; flags: FeatureFlags } = $props();
	const featureFlags = $state(flags);

	setContext('featureFlags', featureFlags);
</script>

{@render children()}

<script lang="ts">
	import { setContext, type Snippet } from 'svelte';

	type FeatureFlags = Record<string, boolean>;

	let { children, flags }: { children: Snippet; flags: FeatureFlags } = $props();

	setContext('featureFlags', flags);
</script>

{@render children()}

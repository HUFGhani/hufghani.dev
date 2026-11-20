<script lang="ts">
	import { setContext, type Snippet } from 'svelte';

	type FeatureFlags = Record<string, boolean>;

	let { children, flags }: { children: Snippet; flags: FeatureFlags } = $props();
	const featureFlags = $state<FeatureFlags>({});

	$effect(() => {
		for (const [name, enabled] of Object.entries(flags)) {
			featureFlags[name] = enabled;
		}
	});

	setContext('featureFlags', featureFlags);
</script>

{@render children()}

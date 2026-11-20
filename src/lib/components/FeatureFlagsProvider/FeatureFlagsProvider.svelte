<script lang="ts">
	import { setContext, type Snippet } from 'svelte';

	type FeatureFlags = Record<string, boolean>;

	let { children, flags }: { children: Snippet; flags: FeatureFlags } = $props();
	const featureFlags = $state<FeatureFlags>({});

	$effect(() => {
		for (const name of Object.keys(featureFlags)) {
			if (!(name in flags)) delete featureFlags[name];
		}

		Object.assign(featureFlags, flags);
	});

	setContext('featureFlags', featureFlags);
</script>

{@render children()}

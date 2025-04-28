<script lang="ts">
	import { setContext } from 'svelte';

	type FeatureFlags = {
		[key: string]: boolean;
	};

	let { children, flags }: { children: any; flags: FeatureFlags } = $props();

	setContext('featureFlags', flags);
</script>

{@render children()}

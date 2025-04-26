<script lang="ts">
	import { FeatureFlagsList } from '$lib/config';

	let { flag, children } = $props();

	const IsFeatureFlag = (flag: string): boolean => {
		return FeatureFlagsList[flag] === true;
	};
</script>

{#if IsFeatureFlag(flag)}
	{@render children()}
{/if}

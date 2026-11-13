<script lang="ts">
	import { getContext } from 'svelte';

	const flags = getContext<Record<string, boolean>>('featureFlags');
</script>

<output>{JSON.stringify(flags)}</output>

<script lang="ts">
	import MockChild from '../../mocks/MockChild.svelte';
	import FeatureFlagsConsumer from './FeatureFlagsConsumer.svelte';
	import FeatureFlagsProvider from './FeatureFlagsProvider.svelte';

	let { flags }: { flags: Record<string, boolean> } = $props();
</script>

<FeatureFlagsProvider {flags}>
	<MockChild />
	<FeatureFlagsConsumer />
</FeatureFlagsProvider>

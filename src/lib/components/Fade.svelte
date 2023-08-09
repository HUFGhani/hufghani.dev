<script lang="ts">
	import { fly } from 'svelte/transition'
	export let visible: boolean = false
</script>

{#if import.meta.env.Vitest}
	{#if visible}
		<div in:fly={{ y: 200, duration: 2000 }}>
			<slot />
		</div>
	{/if}
{:else}
	<slot />
{/if}

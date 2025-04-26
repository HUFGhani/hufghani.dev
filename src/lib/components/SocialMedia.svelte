<script lang="ts">
	import Github from '../icon/Github.svelte';
	import Instagram from '../icon/Instagram.svelte';
	import Linkedin from '../icon/Linkedin.svelte';
	import { SOCIAL_LINKS } from '$lib/config';
</script>

<div class="flex flex-row items-center justify-center pt-4 pb-4">
	{#each SOCIAL_LINKS as { title, link }}
		<div class="mr-2">
			<a
				href={link}
				class="no-underline focus:outline-none"
				aria-label={title}
				target="_blank"
				rel="noreferrer"
			>
				{#if title === 'Github'}
					<Github cssClasses="w-7 h-7" />
				{:else if title === 'Linkedin'}
					<Linkedin cssClasses="w-7 h-7" />
				{:else}
					<Instagram cssClasses="w-7 h-7" />
				{/if}
			</a>
		</div>
	{/each}
</div>

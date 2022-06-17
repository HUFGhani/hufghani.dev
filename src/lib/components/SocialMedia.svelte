<script lang="ts">
	import { SOCIAL_LINKS } from '$lib/info'
	import Github from '$lib/icon/Github.svelte'
	import Instagram from '$lib/icon/Instagram.svelte'
	import Linkedin from '$lib/icon/Linkedin.svelte'
	import Twitter from '$lib/icon/Twitter.svelte'
</script>

<div class="items-center flex flex-row justify-center pt-4 pb-4">
	{#each SOCIAL_LINKS as { id, title, link }}
		<div class="mr-2">
			<a href={link} class="no-underline focus:outline-none" aria-label={title} target="_blank">
				{#if title === 'Github'}
					<Github cssClasses="w-7 h-7" />
				{:else if title === 'Linkedin'}
					<Linkedin cssClasses="w-7 h-7" />
				{:else if title === 'Twitter'}
					<Twitter cssClasses="w-7 h-7" />
				{:else}
					<Instagram cssClasses="w-7 h-7" />
				{/if}
			</a>
		</div>
	{/each}
</div>

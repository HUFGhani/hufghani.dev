<script lang="ts">
	import Github from '$lib/icon/Github.svelte'
	import Instagram from '$lib/icon/Instagram.svelte'
	import Linkedin from '$lib/icon/Linkedin.svelte'
	import Twitter from '$lib/icon/Twitter.svelte'
	import { AUTHORNAME, SOCIAL_LINKS } from '../info'
</script>

<footer
	class="mt-4 text-lg text-center w-full flex flex-col align-middle justify-center items-center content-center"
>
	<p
		class="text-sm"
		aria-label="© 2017 - {new Date().getFullYear()}, All right reserved {AUTHORNAME}"
		data-testid="copyRight-year"
	>
		© 2017 - {new Date().getFullYear()}, All right reserved {AUTHORNAME}
	</p>
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

	<p class="text-sm pb-4">Built with SvelteKit · Hosted on S3 and distributed by CloudFront</p>
</footer>

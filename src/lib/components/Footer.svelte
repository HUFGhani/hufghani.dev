<script lang="ts">
	import {
		faGithubSquare,
		faInstagramSquare,
		faLinkedin,
		faTwitterSquare
	} from '@fortawesome/free-brands-svg-icons';
	import Icon from 'svelte-awesome';
	import { AUTHORNAME, SOCIAL_LINKS } from '../info';
</script>

<footer class="mt-4 text-lg text-center w-full">
	<p class="text-sm" aria-label="© 2017 - {new Date().getFullYear()}, {AUTHORNAME}">
		© 2017 - {new Date().getFullYear()}, All right reserved {AUTHORNAME}
	</p>
	<div class="items-center flex flex-row justify-center pt-4 pb-4">
		{#each SOCIAL_LINKS as { id, title, link }}
			<div class="mr-2">
				<a href={link} class="no-underline focus:outline-none" aria-label={title} target="_blank">
					{#if title === 'Github'}
						<Icon data={faGithubSquare} class="w-7 h-7" />
					{:else if title === 'Linkedin'}
						<Icon data={faLinkedin} class="w-7 h-7" />
					{:else if title === 'Twitter'}
						<Icon data={faTwitterSquare} class="w-7 h-7" />
					{:else}
						<Icon data={faInstagramSquare} class="w-7 h-7" />
					{/if}
				</a>
			</div>
		{/each}
	</div>

	<p class="text-sm pb-4">Built with SvelteKit · Hosted on S3 and distributed by CloudFront</p>
</footer>

<script lang="ts">
	import Icon from 'svelte-awesome';
	import githubSquare from 'svelte-awesome/icons/githubSquare';
	import instagram from 'svelte-awesome/icons/instagram';
	import linkedinSquare from 'svelte-awesome/icons/linkedinSquare';
	import twitterSquare from 'svelte-awesome/icons/twitterSquare';
		</script>

<footer class="mt-4 text-lg text-center w-full">
	<p class="text-sm" aria-label="© 2017 - ${new Date().getFullYear()}, Hamza U. F. Ghani">
		© 2017 - {new Date().getFullYear()}, Hamza U. F. Ghani
	</p>
	<div class="items-center flex flex-row justify-center pt-4 pb-4">
		<div class="mr-2">
			<a
				href="https://github.com/HUFGhani"
				class="no-underline focus:outline-none"
				aria-label="github"
				target="_blank"
			>
				<Icon data={githubSquare} class="w-7 h-7" />
			</a>
		</div>
		<div class="mr-2">
			<a
				href="https://www.linkedin.com/in/hamza-u-f-ghani/"
				class="no-underline focus:outline-none"
				aria-label="linkedin"
				target="_blank"
			>
				<Icon data={linkedinSquare} class="w-7 h-7" />
			</a>
		</div>
		<div class="mr-2">
			<a
				href="https://twitter.com/the_ghani"
				class="no-underline focus:outline-none"
				aria-label="twitter"
				target="_blank"
			>
				<Icon data={twitterSquare} class="w-7 h-7" />
			</a>
		</div>
		<div class="mr-2">
			<a
				href="https://www.instagram.com/the.ghani/"
				class="no-underline focus:outline-none"
				aria-label="linkedin"
				target="_blank"
			>
				<Icon data={instagram} class="w-7 h-7" />
			</a>
		</div>
	</div>

	<p class="text-sm pb-4">Built with SvelteKit · Hosted on S3 and distributed by CloudFront</p>
</footer>
